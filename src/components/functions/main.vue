<template>
    <el-dialog :visible="show" width="800px" :before-close="close" center>
        <div class="functions-picker">
            <div class="title">
                <h2 class="text">选择职位职能（{{tips}}）</h2>
            </div>
            <el-row class="selected">
			  	<el-col :span="2">已选：</el-col>
			  	<el-col :span="22">
			  		<div class="selected-list">
			  			<el-tag v-for="(item, index) in selectedVal" size="small" :key="index" closable @close="remove(item)">{{dataRepeat[item].name}}</el-tag>
			  		</div>
			  	</el-col>
			</el-row>
            <div class="functions-main">
                <div class="left">
                    <div class="left-fixed">
                        <div :class="{active: dataRepeat[item.id].active}" @click="tab(item, 'one')" v-for="(item, index) in data" :key="item.id" class="item" >{{item.name}}</div>
                    </div>
                </div>
                <div class="right">
                    <div class="two clear">
                        <a :class="{active: dataRepeat[item.id].active}" @click="tab(item, 'two')" v-for="(item, index) in two" :key="item.id" href="javascript:void(0)">{{item.name}}</a>
                    </div>
                    <div class="three clear">
                        <a :class="{active: dataRepeat[item.id].active}" @click="selected(item)" v-for="(item, index) in three" :key="item.id" href="javascript:void(0)">{{item.name}}</a>
                    </div>
                </div>
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
    name: 'functions',
    data() {
        return {
            max: 4,
            show: true,
            data: this.$utils.deepClone(this.$local.getObject('functions')),
            dataRepeat: this.$utils.deepClone(this.$local.getObject('functionsObj')),
            selectedVal: [],
            two: [],
            three: [],
            current: {
                one : 1,
                two : 0,
            },
            callback: function(){}
        }
    },
    computed: {
        tips() {
            return this.max == 1 ? '单选' : '最多选择' + this.max + '个';
        }
    },
    methods: {
        tab(data, type) {
            this.current[type] && this.$set(this.dataRepeat[this.current[type]], 'active', false);
            this.$set(this.dataRepeat[data.id], 'active', true);
            this.current[type] = data.id;
            if(type == 'one'){
                this.two = this.$utils.copy(data.children);
                this.three = [];
            }else{
                this.three = this.$utils.copy(data.children);
            }
        },
        selected(data) {

            if(this.max != 1){
                if (!this.dataRepeat[data.id].active && this.selectedVal.length >= this.max) {
                    this.$toast({ tips: '最多选择' + this.max + '个' , iconClass: 'el-icon-error'})
                    return false;
                }   
                if (this.dataRepeat[data.id].active) {
                    this.$set(this.dataRepeat[data.id], 'active', false);
                    this.selectedVal.splice(this.selectedVal.indexOf(data.id), 1);
                } else {
                    this.$set(this.dataRepeat[data.id], 'active', true);
                    this.selectedVal.push(data.id);
                } 
            }else{
                this.selectedVal[0] && this.$set(this.dataRepeat[this.selectedVal[0]], 'active', false);
                this.selectedVal = [data.id];
                this.$set(this.dataRepeat[data.id], 'active', true);
            }
            
            
            
        },
        remove(index) {
            this.$set(this.dataRepeat[index], 'active', false);
            this.selectedVal.splice(this.selectedVal.indexOf(index), 1);
        },
        close() {
            this.show = false;
        },
        save() {
            if (this.selectedVal.length){
                this.callback(this.$utils.deepClone(this.selectedVal));
                this.show = false;
            } else {
                this.$toast({tips:'请选择第三级', iconClass: 'el-icon-error'});
            }
             
        },
        dafaultSelect(data){
            this.selectedVal = [];
            this.dataRepeat = this.$utils.deepClone(this.$local.getObject('functionsObj'));
            // 重置二级
            this.two = this.data[0].children;
            this.three = [];
            this.current = {
                one : 1,
                two : 0
            };
            // 设置默认
            this.$set(this.dataRepeat[this.data[0].id], 'active', true);

            data && data.length && data.forEach(item => {
                this.dataRepeat[item].active = true;
                this.selectedVal.push(item);
            });

            

        },
        init(opt) {
            this.dafaultSelect(opt.defaultVal);

            this.show = true;
            this.max = opt.max ? opt.max : this.max;
            this.callback = opt.callback ? opt.callback : this.callback;

            
        }
    }
}

</script>
<style scoped lang="scss">
.functions-picker {
    .title {
        margin-bottom: 30px;
        color: #333;
        text-align: center;
        .text {
            font-size: 20px;
            font-weight: 200;
        }
    }
    .selected {
    	border-bottom: 2px solid #ededed;
        padding-bottom: 10px;
        .selected-list {
            .el-tag {
                margin: 0 5px 5px 0;
                
            }
        }
    }
    .functions-main {
        height: 360px;
        overflow-y: auto;
        border: 1px solid #DBDBDB;
        margin-top: 10px;

        .left{
            float: left;
            width: 200px;
            line-height: 36px;
            .left-fixed{
                height: 358px;
                overflow-y: auto; 
                .item{
                    padding-left: 15px;
                    background: #FAFAFA;
                    border-right: 1px solid #EEE;
                    cursor: pointer;
                }
                .active{
                    background: #fff;
                    border-right: 0;
                    border-left: 2px solid #ff6b00;
                    padding-left: 13px;

                }    
            }
        }
        .right{
            float: left;
            width: 526px;
            padding: 10px 20px 0 20px;

            .two{
                padding-bottom: 4px;
                border-bottom: 2px dashed #E7E7E7;
        
                a{
                    float: left;
                    padding: 0 10px;
                    line-height: 20px;
                    display: block;
                    margin: 0 10px 12px 0;

                    &.active{
                        background: #E7E7E7;
                        border-radius: 2px;
                        color: #ff6b00;
                    }
                }

            }

            .three{
                padding-top: 16px;

                a{
                    float: left;
                    padding: 0 10px;
                    line-height: 20px;
                    display: inline-block;
                    margin: 0 10px 12px 0;
                    color: #666666;

                    &.active{
                        background: #FF6B00;
                        border-radius: 2px;
                        color: #fff;
                    }
                }
            }

        }
    }
}
/deep/ .el-dialog__header{
    background: #fff;
    border-bottom: 0;
}
/deep/ .el-dialog__body{
    padding-top: 0;
}

</style>
