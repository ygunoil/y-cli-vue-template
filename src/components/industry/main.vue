<template>
    <el-dialog :visible="show" width="720px" :before-close="close" center class="industry-picker-box">
        <div class="industry-picker">
            <div class="title t-c">
                <h2 class="text">选择行业分类（{{tips}}）</h2></div>
            <div class="selected clear" v-if="selectedVal.length">
                <div class="f-l num t-r">已选：</div>
                <div class="f-l list">
                    <a class="cont" v-for="(item, index) in selectedVal" :key="item" href="javascript:void(0);">
                        <span>{{dataRepeat[item].name}}</span>
                        <i class="el-icon-close" @click="remove(index, item)"></i>
                    </a>
                </div>
            </div>
            <div class="industry-list">
                <el-row class="row" v-for="(item, index) in data" :key="item.code">
                    <el-col :span="4">
                        <div class="one-level t-r">
                            <label class="text">{{item.name}}：</label>
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <div class="two-level">
                            <a class="text" :class="{active: dataRepeat[val.code].selected }" v-for="(val, index) in item.children" :key="val.code" href="javascript:void(0);" @click="selected(val.code)">{{val.name}}</a>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save()">确定</el-button>
            <el-button @click="close">取消</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'industry',
    data() {
        return {
            
            max: 4,
            show: true,
            data: this.$utils.deepClone(this.$local.getObject('industrys')),
            dataRepeat: this.$utils.deepClone(this.$local.getObject('industrysObj')),
            selectedVal: [],
            callback: function(){}
        }
    },
    computed: {
        tips() {
            return this.max == 1 ? '单选' : '最多选择' + this.max + '个';
        }
    },
    methods: {
        selected(code) {
            if (!this.dataRepeat[code].selected && this.selectedVal.length >= this.max) {
                this.$toast({ tips: '最多选择' + this.max + '个' , iconClass: 'el-icon-error'})
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
            this.dataRepeat[code].selected = false;
            this.selectedVal.splice(index, 1);
        },
        close() {
            this.show = false;
        },
        save() {
            if (this.selectedVal.length){
                this.callback(this.$utils.deepClone(this.selectedVal));
                this.show = false;
            } else {
                this.$toast({tips:'请至少选择1个', iconClass: 'el-icon-error'});
            }
             
        },
        dafaultSelect(data){
            this.selectedVal = [];
            this.dataRepeat = this.$utils.deepClone(this.$local.getObject('industrysObj'));
            data && data.length && data.forEach(item => {
                this.dataRepeat[item].selected = true;
                this.selectedVal.push(item);
            });
        },
        init(opt) {
            this.show = true;
            this.max = opt.max ? opt.max : this.max;
            this.callback = opt.callback ? opt.callback : this.callback;

            this.dafaultSelect(opt.defaultVal);
        }
    }
}

</script>
<style scoped lang="scss">
.industry-picker {
    width: 630px;
    margin: 0 auto;
    .title {
        margin-bottom: 30px;
        color: #333;
        .text {
            font-size: 20px;
            font-weight: 200;
        }
    }
    .selected {
        .num {
            margin-right: 10px;
            width: 105px;
            font-weight: bold;
            line-height: 22px;
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
    .industry-list {
        max-height: 360px;
        overflow-y: auto;
        border-top: 1px solid #DBDBDB;
        .row {
            padding: 8px 0;
            border-bottom: 1px dashed #DBDBDB;
            .one-level {
                .text {
                    font-weight: bold;
                    line-height: 26px;
                }
            }
            .two-level {
                line-height: 26px;
                .text {
                    display: inline-block;
                    height: 24px;
                    line-height: 22px;
                    padding: 0 8px;
                    margin: 0 10px; // &:hover{
                    //     background: #ff6b00;
                    //     color: #fff;
                    // }
                    &.active {
                        background: #ff6b00;
                        color: #fff;
                    }
                }
            }
        }
    }
}
.industry-picker-box /deep/ .el-dialog--center .el-dialog__header{
    background: #fff;
    border-bottom: 0;
}

</style>
