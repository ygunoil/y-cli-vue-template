<template>
    <el-dialog :title="title" :visible="show" :before-close="close" width="700px" :close-on-click-modal="false" class="set-group" center>
        <div class="block">
        	<div class="all clear">所有组 <el-button type="text" size="mini" @click="appendTop()" class="f-r">添加组</el-button></div>
        	<div class="groups">
	            <el-tree ref="tree"
                         :data="data" 
	            		 :props="defaultProps" 
	            		 :expand-on-click-node="false"
	            		 :accordion="true"
	            		 :default-expanded-keys="keys"
	            		 node-key="id"
	            		 @node-click="selected"
	            		 :indent="30">
	            	
	                <span class="custom-tree-node clear" :class="{active: data.active}" slot-scope="{ node, data }">
	                    <span class="f-l title" v-if="!data.isAdd"><span class="custom-tree-border"></span>{{ node.label ? node.label : '默认分组' }}</span>
	                	<span v-if="!data.isAdd && !!data.id" class="f-r btn">
	                        <el-button v-if="!data.parentId" type="text" size="mini" @click="append(data)">添加子组</el-button>
	                        <el-button type="text" size="mini" @click="edit(data)"> 修改组名</el-button>
	                        <el-button v-if="!type" type="text" size="mini" @click="remove(node, data)">删除组</el-button>
	                    </span>
		                <div v-if="data.isAdd" class="edit-group">
		                	<span class="custom-tree-border"></span>
		                    <el-input v-model="data.name" :maxlength="30"></el-input>
		                    <el-button type="primary" size="mini" @click="add(data)">确定</el-button>
		                    <el-button size="mini" @click="cancel(node, data)">取消</el-button>
		                </div>
	                </span>
	            </el-tree>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save()">确 定</el-button>
            <el-button @click="close">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'groups',
    data() {

        return {
            show: true,
            title: '添加/修改组',
            type: false,
            data: [],
            dataShow: {},
            defaultProps: {
            	label: 'name',
            	children: 'children'
            },            
            keys: [],
            prev: null,
            callback: function(){}
        }
    },
    computed: {
        
    },
    created (){
    	// this.query();
    	// console.info(this.$store.state.locationsObj['310100']);
    },
    methods: {
    	query(id){
            this.keys = [];
            this.$http.get('/api/resume/collection/v1/group/list').then(res => {
                if (res.data.success) {
                    this.data = res.data.data.list;
                    this.dataShow = this.$utils.repeat(this.data);

                    if(this.type && !id){
                        this.$set(this.data[0], 'active', true);
                        this.prev = this.data[0];    
                    }
                    id && this.$nextTick(function(){
                        this.$refs.tree.setCurrentKey(id); 
                        this.prev = this.$refs.tree.getCurrentNode(); 
                        this.keys = [this.prev.parentId];
                        this.$set(this.prev, 'active', true);

                    });
                    
                }
            });
        },
        appendTop(){
        	if(this.data[1] && !this.data[1].id){
	        	this.$toast({tips: '请添加完再继续添加'});
        	}else{
        		this.data.splice(1, 0,{
                        id: null,
		            	isAdd: true, 
		            	parentId: 0,
		            	name: '',
                        children: []
		        });	
        	}
        },
        append(data) {
        	if(data.children[0] && !data.children[0].id){
        		this.$toast({tips: '请添加完再继续添加'});
        	}else{
        		data.children.unshift({
	            	isAdd: true, 
	            	parentId: data.id,
	            	name: '',
	            });	
        	}
            this.keys.push(data.id);
        },
        edit(data) {
            this.dataShow[data.id] = this.$utils.copy(data);
            this.$set(data, 'active', false);
            this.$set(data, 'isAdd', true);
        },
        cancel(node, data){
        	if(data.id){
                let children;
                if(data.parentId){
                    children = node.parent.data.children;
                }else{
                    children = node.parent.data;
                }
		        const index = children.findIndex(d => d.id === data.id);
		        children.splice(index, 1, this.dataShow[data.id]);
        	}else{
                if(data.parentId){
                    node.parent.data.children.shift();    
                }else{
                    node.parent.data.splice(1,1)
                }
        	}
        },
        remove(node, data){
        	this.$http.post('/api/resume/collection/v1/group/delete', {groupId: data.id}).then(res => {
                if (res.data.success) {
                    this.$toast({tips: '删除成功'});
                    const children = node.parent.data.children || node.parent.data;
			        const index = children.findIndex(d => d.id === data.id);
			        children.splice(index, 1);
                    this.dataShow[data.id] = null;
                }
            });

        },
        add(data){
        	if(data.id){
        		this.$http.post('/api/resume/collection/v1/group/modify', {groupName: data.name, groupId: data.id}).then(res => {
	                if (res.data.success) {
	                    this.$toast({tips: '修改成功'});
	                    data.isAdd = false;
	                    this.dataShow[data.id] = this.$utils.copy(data);
	                }
	            });
        	}else{
        		this.$http.post('/api/resume/collection/v1/group/create', {groupName: data.name, parentId: data.parentId}).then(res => {
	                if (res.data.success) {
	                    this.$toast({tips: '添加成功'});
                        data.id = res.data.data.id;
	                    data.isAdd = false;
                        this.data = this.$utils.copy(this.data);
	                }
	            });
        	}
        },
        selected(data, node) {
            if(data.isAdd){ return false; };

            if(this.type){
                if(this.prev){
                    this.$set(this.prev, 'active', false);
                }
                this.$set(data, 'active', true);
                this.prev = data;    
            }
        	
        	
        },
        
        close() {
            this.show = false;
        },

        save() {
            if(!this.prev && this.type){
                this.$toast({tips:'请选择', iconClass: 'el-icon-error'});
                return false;
            }
            
            this.callback(this.$utils.copy(this.prev));
            
            this.show = false;
        },
        init(opt) {
            this.query(opt.defaultVal.id);
            this.prev = null;

            this.title = opt.defaultVal.title || '添加/修改组';
            this.type = opt.defaultVal.type;

            this.show = true;
            this.callback = opt.callback ? opt.callback : this.callback;



            
        }
    }
}

</script>
<style scoped lang="scss">
.set-group {

	.all{
		margin-right: 10px;
	}
    /deep/ .el-dialog--center .el-dialog__body {
        padding: 30px;
        max-height: 400px;
        overflow-y: auto;
    }
    /deep/ .el-dialog__footer {
        margin-bottom: 20px;
        padding-bottom: 20px;
    }
    /deep/ .custom-tree-node {
    	height:32px;
        line-height: 32px;
        width: 100%;
        padding-left: 10px;
        margin-left: -5px;

        border: 1px solid #fff;
		
		.btn{
			display: none;
			padding-right: 10px;
		}
        &:hover .btn{
        	display: block;
        }
    }
    /deep/ .el-tree-node__children .custom-tree-border{
    	float: left;
    	display: block;
    	margin: -1px 0 0 -10px;
		width: 10px;
		height:34px;
		border-left: 1px solid #d0d0d0;
    }
    /deep/ .el-tree-node__content {
        height: 34px;
        line-height: 34px;
        padding-left: 0;
        margin-left: 20px;
        margin-right: 0px;
        border-left: 1px solid #d0d0d0;
    }
    /deep/ .el-tree-node__content:hover {
        background: #fff;
    }
    /deep/ .el-tree-node__content:hover>.custom-tree-node {
        background-color: #f5f5f5;
    }
    /deep/ .el-tree-node:focus > .el-tree-node__content {
        background-color: #fff; 
    }
    /deep/ .el-tree-node .active {
    	box-sizing: border-box;
        background-color: #f5f5f5;
        border: 1px solid #ff6b00;
		line-height: 30px;
        border-radius: 2px;
    }
  //   /deep/ .el-tree-node:focus > .el-tree-node__content > .custom-tree-node {
  //   	box-sizing: border-box;
  //       background-color: #f5f5f5;
  //       border: 1px solid #ff6b00;
		// line-height: 30px;
  //       border-radius: 2px;
  //   }
    
    /deep/ .el-input {
        width: auto;
        margin-right: 10px;
    }
    .edit-group {
        /deep/ .el-input__inner {
            height: 26px;
            width: 120px;
            margin-left: 10px;
        }
        /deep/ .el-button {
            height: 26px;
        }
    }
    .title {

        i {
            margin-right: 10px;
        }
    }
}

</style>
