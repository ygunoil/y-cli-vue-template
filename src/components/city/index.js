import City from './main.vue'

/**
 * 每个插件都有的install方法，用于安装插件
 * @param {Object} Vue - Vue类
 * @param {Object} [pluginOptions] - 插件安装配置
 */
City.install = function(Vue, pluginOptions = {}) {

    // 创建"子类"方便挂载
    const VueCity = Vue.extend(City)
    let city = null

    /**
     * 初始化并显示
     * @returns {Promise} Promise实例
     */
    function $city(opt) {
        //!!!!!!!!!!!!!!!! 这边是重点 !!!!!!!!!!!!!!!!
        // 第一次调用
        if (!city) {
            
            city = new VueCity()
            // 手动创建一个未挂载的实例
            city.$mount()
            // 挂载
            document.querySelector(pluginOptions.container || 'body').appendChild(city.$el)
        }

        city.init(opt);
    }


    // Vue.component(City.name, City)



    Vue.prototype.$city = $city;


};

export default City;
