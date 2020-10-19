<template>
    <el-dialog :visible.sync="show" width="790px" center class="city-picker-box">
        <div class="city-picker">
            <div class="title t-c">
                <h2 class="text">全部地区（{{tips}}）</h2>
            </div>
            <!-- 已选 -->
            <div class="selected clear" v-show="selectedVal.length">
                <div class="f-l num t-r">已选：</div>
                <div class="f-l list">
                    <a class="cont" v-for="(item, index) in selectedVal" :key="item" href="javascript:void(0);">
                        <span>{{dataRepeat[item].name}}</span>
                        <i class="el-icon-close" @click="remove(index, item)"></i>
                    </a>
                </div>
            </div>
            <div class="city-count relative">
                <div v-if="checkbox.isShow" class="f12" style="position:absolute; right: 10px; z-index: 100"><el-checkbox v-model="checkbox.active">{{checkbox.text}}</el-checkbox></div>
                <!-- 导航 -->
                <ul class="city-nav clear">
                    <li class="item f-l" v-for="(item, index) in tab" :key="item.code">
                        <a class="text" @click="tabChange(index)" href="javascript:void(0);">
                            <span class="name">{{item.name}}</span>
                            <i class="icon el-icon-arrow-down gray3"></i>
                        </a>
                    </li>
                </ul>
                <div class="tab-count">
                    <!-- 全部 -->
                    <div class="city-all f14" v-show="tab.length == 1">
                        <!-- 热门城市 -->
                        <div class="heat-city">
                            <div class="title">
                                <h3 class="orange text">热门城市</h3>
                            </div>
                            <div class="list f12">
                                <ul class="clear">
                                    <li class="f-l item" :class="{ active: dataRepeat[item.code].selected }" v-for="(item, index) in dataHot" :key="item.code">
                                        <a class="text" @click="selected(item.code)" href="javascript:void(0);">{{dataRepeat[item.code].name}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- 全部省份 -->
                        <div class="all-province">
                            <div class="title">
                                <h3 class="orange text">全国省份</h3>
                            </div>
                            <div class="list f12">
                                <ul class="clear">
                                    <li class="f-l item" :class="{ active: dataRepeat[item.code].selected }" v-for="(item, index) in data" :key="item.code">
                                        <a class="text" @click="level(item)" href="javascript:void(0);">
                                            <span>{{dataRepeat[item.code].name}}</span>
                                            <span class="num bg-orange white t-c" v-show="!dataRepeat[item.code].selected && dataRepeat[item.code].total">{{dataRepeat[item.code].total}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 具体省份 -->
                    <div class="city-province" v-if="tab.length == 2">
                        <div class="heat-city">
                            <div class="title ">
                                <h3 class="orange text c-p" :class="{ active: dataRepeat[tab[1].code].selected }" @click="selectedParent(dataRepeat[tab[1].code].code)">{{dataRepeat[tab[1].code].name}}</h3>
                                <span class="num bg-orange white t-c" v-show="dataRepeat[tab[1].code].total">{{dataRepeat[tab[1].code].total}}</span>
                            </div>
                            <div class="list f12">
                                <ul class="clear">
                                    <li class="f-l item" :class="{ active: dataRepeat[item.code].selected }" v-for="(item, index) in tab[1].children" :key="item.code">
                                        <a class="text" @click="selected(item.code)"  href="javascript:void(0);">
                                            <span>{{dataRepeat[item.code].name}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save">确定</el-button>
                <el-button @click="close">取消</el-button>
            </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'city',
    data() {
        return {
            max: 4,
            show: true,
            tab: [{name: '全部', code: 1}],
            data: this.$utils.deepClone(this.$local.getObject('locations')),
            dataRepeat: this.$utils.deepClone(this.$local.getObject('locationsObj')),
            dataHot: this.$utils.deepClone(this.$local.getObject('hotLocations')),
            selectedVal: [],
            callback: function(){},
            checkbox: {},
            // check: true,
        }
    },
    computed: {
        tips() {
            return this.max == 1 ? '单选' : '最多选择' + this.max + '个';
        }
    },
    methods: {
        // 等级
        level(data){
            this.tab.push(data);
        },
        tabChange(index){
            this.tab.splice(index + 1);
        },
        selected(code) {
            // 过滤已选的父级
            this.selectedVal = this.selectedVal.filter(item => {
                if(this.dataRepeat[code].parentCode == item){
                    this.dataRepeat[this.dataRepeat[code].parentCode].selected = false;
                    this.dataRepeat[this.dataRepeat[code].parentCode].total = 0;
                }
                return this.dataRepeat[code].parentCode != item;
            })
            if (!this.dataRepeat[code].selected && this.selectedVal.length >= this.max) {
                this.$toast({ tips: '最多选择' + this.max + '个', iconClass: 'el-icon-error' })
                return false;
            }
            let parent = this.dataRepeat[this.dataRepeat[code].parentCode];
            if(!parent.total){
                parent.total = 0;
            }
            if (this.dataRepeat[code].selected) {
                parent.total -= 1; 
                this.dataRepeat[code].selected = false;
                this.selectedVal.splice(this.selectedVal.indexOf(code), 1);
            } else {
                parent.total += 1; 
                this.dataRepeat[code].selected = true;
                this.selectedVal.push(code);
            }
        },
        selectedParent(code){
            // 过滤已选的父级code是否跟当前选中的一致
            this.selectedVal = this.selectedVal.filter(item => {
                if(this.dataRepeat[item].parentCode == code){
                    this.dataRepeat[item].selected = false;
                    this.dataRepeat[code].total -= 1;
                }
                return this.dataRepeat[item].parentCode != code;
            })

            
            if (!this.dataRepeat[code].selected && this.selectedVal.length >= this.max) {
                this.$toast({ tips: '最多选择' + this.max + '个', iconClass: 'el-icon-error' })
                return false;
            }
            if (this.dataRepeat[code].selected) {
                this.dataRepeat[code].selected = false;
                this.selectedVal.splice(this.selectedVal.indexOf(code), 1);
            } else {
                this.dataRepeat[code].selected = true;
                this.selectedVal.push(code);
            }
        },
        remove(index, code) {
            let parent = this.dataRepeat[this.dataRepeat[code].parentCode];
            parent.total -= 1; 
            this.dataRepeat[code].selected = false;
            this.selectedVal.splice(index, 1);
        },
        close() {
            this.show = false;
        },
        save() {
            if (this.selectedVal.length){
                this.checkbox.isShow ? this.callback(this.selectedVal, this.checkbox) : this.callback(this.selectedVal);
                this.show = false;
            } else {
                this.$toast({tips:'请至少选择1个', iconClass: 'el-icon-error'});
            }
             
        },
        dafaultSelect(data){

            this.selectedVal = [];
            this.dataRepeat = this.$utils.deepClone(this.$local.getObject('locationsObj'));
            this.tab = [{name: '全部', code: 1}];
            data && data.length && data.forEach(item => {
                if(this.dataRepeat[item].parentCode){
                    let parent = this.dataRepeat[this.dataRepeat[item].parentCode];
                    if(!parent.total){
                        parent.total = 0;
                    }
                    parent.total += 1;    
                }
                
                this.dataRepeat[item].selected = true;
                this.selectedVal.push(item);
            });
        },
        init(opt) {
            console.log('opt', opt)
            this.show = true;
            this.max = opt.max ? opt.max : this.max;
            this.callback = opt.callback ? opt.callback : this.callback;
            this.checkbox = opt.checkbox ? opt.checkbox : {};            

            this.dafaultSelect(opt.defaultVal);
        }
    }
}

</script>
<style scoped lang="scss">
.city-picker {
    width: 730px;
    .title {
        color: #333;
        margin-bottom: 30px;
        .text {
            font-weight: 100;
            font-size: 20px;
        }
    }
    .selected {
        border-bottom: 1px solid #EDEDED;
        .num {
            margin-right: 10px;
            width: 80px;
            line-height: 24px;
        }
        .list {
            width: 512px;
            .cont {
                margin: 0 10px 10px 0;
                @include btn($height: 24px, $font: 12px, $padding: 10px);
                .i-delete {
                    font-size: 10px;
                    margin-left: 4px;
                }
            }
        }
    }
    .city-count {
        width: 660px;
        margin: 16px auto 0;
        .city-nav {
            position: relative;
            z-index: 99;
            .item {
                line-height: 36px;
                padding: 0 6px 0 16px;
                border: 1px solid #eee;
                border-left: 0;
                border-bottom: 0;
                margin: 0;
                &:first-child {
                    border-left: 1px solid #eee;
                }
                &:last-child {
                    background: #fafafa;
                    border-bottom: 1px solid #fafafa;
                }
                .text {
                    display: inline-block;
                    width: 100%;
                    .name {
                        margin-right: 8px;
                    }
                    .icon{
                        font-weight: 600;
                    }
                }

            }
        }
        .tab-count {
            position: relative;
            top: -1px;
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid #eee;
            background: #fafafa;
            padding: 20px;
            .city-all {
                .heat-city {
                    margin-bottom: 14px;
                    .title {
                        margin-bottom: 12px;
                        .text {
                            font-size: 14px;
                        }
                    }
                    .list {
                        .item {
                            position: relative;
                            line-height: 24px;
                            padding: 0 10px;
                            margin: 0 20px 4px 0;
                            &.active {
                                background: #ff6b00;
                                .text {
                                    color: #fff;
                                }
                            }
                            .text {
                                display: inline-block;
                                width: 100%;
                            }
                        }
                    }
                }
                .all-province {
                    @extend .heat-city;
                    .num {
                        position: absolute;
                        display: inline-block;
                        width: 12px;
                        line-height: 12px;
                        border-radius: 50%;
                        right: -3px;
                        top: 6.5px;
                    }
                }
            }
            .city-province {
                @extend .city-all;
                .heat-city {
                    .title {
                        .text {
                            padding: 6px 0 6px 10px;
                            &.active{
                                padding: 6px 10px 6px 10px;
                                color: #fff !important;
                                background: #ff6b00;
                            }
                        }
                        .text {
                            display: inline-block;
                        }
                        .num {
                            display: inline-block;
                            width: 12px;
                            line-height: 12px;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }
}

.city-picker-box /deep/ .el-dialog--center .el-dialog__header{
    background: #fff;
    border-bottom: 0;
}

</style>
