import Group from './main.vue'

/**
 * 每个插件都有的install方法，用于安装插件
 * @param {Object} Vue - Vue类
 * @param {Object} [pluginOptions] - 插件安装配置
 */
Group.install = function(Vue, pluginOptions = {}) {

        // 创建"子类"方便挂载
        const VueGroup = Vue.extend(Group)
        let group = null

        /**
         * 初始化并显示
         * @returns {Promise} Promise实例
         */
        function $group(opt) {
            // 第一次调用
            if (!group) {
              group = new VueGroup()
              // 手动创建一个未挂载的实例
              group.$mount()
              // 挂载
              document.querySelector(pluginOptions.container || 'body').appendChild(group.$el)
            }
            // 显示industry
            group.init(opt);
        }


        // Vue.component(Industry.name, Industry)



        Vue.prototype.$resumeGroups = $group;

    
};

export default Group;


