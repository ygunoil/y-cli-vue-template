import Functions from './main.vue'

/**
 * 每个插件都有的install方法，用于安装插件
 * @param {Object} Vue - Vue类
 * @param {Object} [pluginOptions] - 插件安装配置
 */
Functions.install = function(Vue, pluginOptions = {}) {

        // 创建"子类"方便挂载
        const VueFunctions = Vue.extend(Functions)
        let functions = null

        /**
         * 初始化并显示
         * @returns {Promise} Promise实例
         */
        function $functions(opt) {
            // 第一次调用
            if (!functions) {
              functions = new VueFunctions()
              // 手动创建一个未挂载的实例
              functions.$mount()
              // 挂载
              document.querySelector(pluginOptions.container || 'body').appendChild(functions.$el)
            }
            // 显示industry
            functions.init(opt);
        }


        // Vue.component(Industry.name, Industry)



        Vue.prototype.$functions = $functions;

    
};

export default Functions;


