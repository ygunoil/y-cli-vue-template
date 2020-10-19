import Industry from './main.vue'

/**
 * 每个插件都有的install方法，用于安装插件
 * @param {Object} Vue - Vue类
 * @param {Object} [pluginOptions] - 插件安装配置
 */
Industry.install = function(Vue, pluginOptions = {}) {

        // 创建"子类"方便挂载
        const VueIndustry = Vue.extend(Industry)
        let industry = null

        /**
         * 初始化并显示
         * @returns {Promise} Promise实例
         */
        function $industry(opt) {
            // 第一次调用
            if (!industry) {
              industry = new VueIndustry()
              // 手动创建一个未挂载的实例
              industry.$mount()
              // 挂载
              document.querySelector(pluginOptions.container || 'body').appendChild(industry.$el)
            }
            // 显示industry
            industry.init(opt);
        }


        // Vue.component(Industry.name, Industry)



        Vue.prototype.$industry = $industry;

    
};

export default Industry;


