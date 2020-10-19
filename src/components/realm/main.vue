<template>
    <el-dialog :visible="show" width="720px" :before-close="close" center class="industry-picker-box">
        <div class="realm-picker">
            <div class="title t-c">
                <h2 class="text">选择公司领域</h2></div>
            <div class="selected clear" v-if="selectedVal.length">
                <div class="f-l num t-r">已选：</div>
                <div class="f-l list">
                    <a class="cont" v-for="(item, index) in selectedVal" :key="item" href="javascript:void(0);">
                        <span>{{item}}</span>
                        <i class="el-icon-close" @click="remove(index)"></i>
                    </a>
                </div>
            </div>
            <div class="industry-list">
                <div class="title">领域标签：</div>
                <el-row>
                    <el-col :span="24" class="row m-b-20">
                        <div class="one-level c-p" v-for="(val, key) in data" :key="key" @click="selected(key)" :class="{'active': selectedVal.indexOf(val) != -1}">
                            {{val}}
                        </div>
                    </el-col>
                    <el-col :span="24" class="add-box">
                        <el-input :maxlength=20 v-model="newAdd" placeholder="请填写领域名称"></el-input>
                        <a href="javascript:void(0);" class="add-btn" @click="add">添加领域</a>
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
            newAdd: '',
            max: 20,
            show: true,
            data: ['区块链', 'O2O', 'P2P', '移动互联网', '电子商务', '互联网金融', '手机游戏', '在线教育', '在线招聘', '企业服务', '信息安全', '广告营销', '分类信息', '生活服务', '在线旅游', '大数据', '社交网络', '互联网+', '智能医疗', '智能穿戴', '智能硬件', '云计算', '跨境电商', '互联网农业', '移动支付', '物联网', '传媒娱乐', '虚拟现实', '阿里系', '腾讯系', '百度系', '平安系', '知名创投', '新三板'],
            selectedVal: [],
            callback: function(){}
        }
    },
    computed: {
        // tips() {
        //     return this.max == 1 ? '单选' : '最多选择' + this.max + '个';
        // }
    },
    methods: {
        selected(key) {
            if(this.selectedVal.length >= this.max){
                this.$toast({ tips: '最多选择' + this.max + '个' , iconClass: 'el-icon-error'})
                return false;
            }
            if(this.selectedVal.indexOf(this.data[key]) != -1){
                this.$toast({ tips: '已添加该领域，无法再次添加' , iconClass: 'el-icon-error'})
                return false; 
            }
            this.selectedVal.push(this.data[key]);        
        },
        remove(key) {
            this.selectedVal.splice(key, 1); 
        },
        close() {
            this.show = false;
        },
        add(){

            if(!this.newAdd){
                this.$toast({ tips: '请输入领域名称' , iconClass: 'el-icon-error'})
                return false; 
            }
            if(this.selectedVal.length >= this.max){
                this.$toast({ tips: '最多选择' + this.max + '个' , iconClass: 'el-icon-error'})
                return false;
            }
            if(this.selectedVal.indexOf(this.newAdd) != -1){
                this.$toast({ tips: '已添加该领域，无法再次添加' , iconClass: 'el-icon-error'})
                return false; 
            }
            this.selectedVal.push(this.newAdd);
            this.newAdd = ''; 
        },
        save() {
            if(!this.selectedVal.length){
                this.$toast({tips:'请至少选择1个', iconClass: 'el-icon-error'});
                return false;
            }
            if (this.selectedVal.length && this.selectedVal.length <= this.max){
                this.callback(this.selectedVal);
                this.show = false;
            } else {
                this.$toast({ tips: '最多选择' + this.max + '个' , iconClass: 'el-icon-error'})
            }  
        },
        dafaultSelect(data){
            this.selectedVal = [];
            this.selectedVal = data;
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
.realm-picker {
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
            width: 70px;
            font-weight: bold;
            line-height: 22px;
        }
        .list {
            width: 532px;
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
        .title{
           margin: 10px 0 0;
           font-weight: 600;
        }
        max-height: 360px;
        overflow-y: auto;
        border-top: 1px solid #DBDBDB;
        .row {
            padding: 8px 0;
            border-bottom: 1px dashed #DBDBDB;
            .one-level {
                display: inline-block;
                background: #F0F0F0;
                border-radius: 6px;
                padding: 0 8px;
                margin: 0 10px 10px 0;             
            }
            .active{
                background: #ff6b00;
                color: #fff;
            }
        }
        .add-box{
            /deep/ .el-input{
                display: inline-block;
                width: 70%;
                height: 40px;
            }
            /deep/ .el-input__inner{
                height: 40px;
            } 
            .add-btn{
                @include btn($height: 40px, $font: 14px, $padding: 16px, $radius: 0);
                position: relative;
                left: -4px;
            }
        }
    }
}
.industry-picker-box /deep/ .el-dialog--center .el-dialog__header{
    background: #fff;
    border-bottom: 0;
}

</style>
