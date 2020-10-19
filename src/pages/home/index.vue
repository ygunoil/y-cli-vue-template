<template>
	<div class="content">
		<p class="iconfont icon-home">首页</p>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" style="background: red;height: 200px;">
					1
				</div>
				<div class="swiper-slide" style="background: yellow;height: 200px;">
					2
				</div>
				<div class="swiper-slide" style="background: orange;height: 200px;">
					3
				</div>
			</div>
		</div>
		<div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    <vue-code-diff :old-string="oldStr" :new-string="newStr" :context="10" outputFormat="side-by-side"/>
    <canvas id="seal"></canvas>
		<a href="http://www.baidu.com">百度</a>

		<span @click="add">{{msg}}</span>
		<span @click="add">{{reverseMsg}}</span>{{num}}{{aPlus}}
	</div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss" scoped></style>
