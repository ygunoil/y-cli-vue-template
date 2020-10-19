import {mapState} from 'vuex'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import Seal from "y-seal";
import vueCodeDiff from 'vue-code-diff'
export default {
  components: {vueCodeDiff},
  data(){
    return {
       msg: 'Welcome to Your Vue.js App',
       num:1,
       oldStr: `{
  "name": "7fish",
  "version": "1.0.0",
  "description": "七鱼网",
  "author": "ygunoil",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --open --inline --progress --config build/webpack.dev.conf.js",
    "build": "node build/build.js"
  },
  "dependencies": {
    "axios": "^0.18.0",
    "crypto-js": "^3.1.9-1",
    "echarts": "^4.1.0",
    "element-ui": "^2.2.1",
    "vue": "^2.5.2",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "bootstrap": "^4.1.3",
    "chalk": "^2.0.1",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "element-theme-chalk": "^2.3.3",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "jquery": "^3.3.1",
    "node-notifier": "^5.1.2",
    "node-sass": "^4.7.2",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "portfinder": "^1.0.13",
    "postcss-import": "^11.0.0",
    "postcss-loader": "^2.0.8",
    "postcss-url": "^7.2.1",
    "rimraf": "^2.6.0",
    "sass-loader": "^6.0.7",
    "sass-resources-loader": "^1.3.3",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "swiper": "^4.3.5",
    "three": "^0.95.0",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.5.8",
    "vue-code-diff": "^0.0.4",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0",
    "y-seal": "^1.0.2"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
`,
       newStr: 'new code'
    }
  },
  mounted(){
    var seal = new Seal("#seal", {
                    radius: 75,// 默认半径75px
                    color: "red",// 默认颜色红色
                    companyName: "上海妙一生物科技有限公司", // 默认 上海妙一生物科技有限公司
                    fontFamily: "宋体", // 默认宋体
                    typeName: "", // 印章类型 默认为空
                    hasInnerLine: false ,// 内边框 默认false
                    securityCode: "", // 防伪码 只能为13位 默认空
                })
    // seal.saveSealImg(); // 保存成图片
  	// this.drawLine();
   //  var mySwiper = new Swiper('.swiper-container', {
   //        autoplay:true,
   //        loop:true,
   //        effect:'cube',
   //        cubeEffect: {
			//     slideShadows: true,
			//     shadow: true,
			//     shadowOffset: 100,
			//     shadowScale: 0.6
			//   },
   //      })
  },
  methods:{
  	 add(){
    	console.log(111)
    },
     drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  },
//computed:mapState([
//  "classList"
//]),
  computed:{
   reverseMsg(){
		      return this.msg.split("").reverse().join("")
		    },
		     aPlus: {
      get: function () {
        return this.num + 1
      },
      set: function () {
      	console.log(v)
        return this.num = v - 1
      }
    }
  },
  watch:{

  }
}
