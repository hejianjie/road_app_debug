import Vue from 'vue'
import App from './App.vue'
import router from './router'
import IonicVue from '@ionic/vue'
import '@ionic/core/css/core.css'
import VueAMap from 'vue-amap'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(VueAMap)
Vue.use(IonicVue)
Vue.config.productionTip = false
Vue.use(Viewer);

Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

VueAMap.initAMapApiLoader({
  key: 'd76bc47b1514ccae248ba4b261024926',
  plugin: ['Autocomplete', 'Geolocation', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor']
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// // app后台不退出，打包时需要放开以下代码。
// let main = plus.android.runtimeMainActivity();
// //为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
// plus.runtime.quit = function () {
//   main.moveTaskToBack(false);
// };
// //重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast 
// plus.nativeUI.toast = (function (str) {
//   if (str == '再次返回退出应用') {
//     plus.runtime.quit();
//   } else {
//     uni.showToast({
//       title: '再次返回退出应用',
//       icon: 'none'
//     })
//   }
// });