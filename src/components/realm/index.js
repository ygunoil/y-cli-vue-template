import Realm from './main.vue'

/**
 * 每个插件都有的install方法，用于安装插件
 * @param {Object} Vue - Vue类
 * @param {Object} [pluginOptions] - 插件安装配置
 */
Realm.install = function(Vue, pluginOptions = {}) {

        // 创建"子类"方便挂载
        const VueRealm= Vue.extend(Realm)
        let realm = null

        /**
         * 初始化并显示
         * @returns {Promise} Promise实例
         */
        function $realm(opt) {
            // 第一次调用
            if (!realm) {
              realm = new VueRealm()
              // 手动创建一个未挂载的实例
              realm.$mount()
              // 挂载
              document.querySelector(pluginOptions.container || 'body').appendChild(realm.$el)
            }
            // 显示realm
            realm.init(opt);
        }


        // Vue.component(realm.name, realm)



        Vue.prototype.$realm = $realm;

    
};

export default Realm;


