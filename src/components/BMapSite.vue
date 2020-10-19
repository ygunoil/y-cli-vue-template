<template>
	<!--<div id="allmap" style="width: 100%; height: {{mapHeight}}px"></div>-->
	<!--<div id="allmap":style="{width: '100%', height: mapHeight + 'px'}"></div>-->
	<div>
		<div id="allmap" ></div>
		    {{location}}
	</div>
	
</template>
<script>
	export default {
		data() {
			return {
				location:''
			}
		},
		props: {
			
		},
		mounted() {
			// 百度地图API功能
			var map = new BMap.Map("allmap");
//			var geolocation = new BMap.Geolocation(); //实例化浏览器定位对象。
//			geolocation.getCurrentPosition(function(r) { //定位结果对象会传递给r变量
//				if(this.getStatus() == BMAP_STATUS_SUCCESS) { //通过Geolocation类的getStatus()可以判断是否成功定位。
//					// 创建地理编码实例      
//					var myGeo = new BMap.Geocoder();      
//					// 根据坐标得到地址描述    
//					myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){      
//					    if (result){      
//					    console.log(result);      
//					    }      
//					});
//				} else {
//					alert('failed' + this.getStatus());
//				}
//			}, {
//				enableHighAccuracy: true
//			})
				var myCity = new BMap.LocalCity();
				myCity.get((result)=>{
					this.location = result.name
				});
			
		}
	}
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>