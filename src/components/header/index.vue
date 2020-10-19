<template>
  <div class="content" >
       头部
      <!--<router-link to="login" tag="a">login</router-link>-->
      <li @click="go('/index')">
						<router-link to="/index" tag="a"  >
							核心产品
						</router-link>
					</li>
					<li >
						<router-link to="/login" tag="a" >
							客户服务
						</router-link>
					</li>
					<li >
						<router-link to="/register" tag="a" >
							解决方案
						</router-link>
					</li>
					<li  >
						<router-link to="/news" tag="a">
							新闻资讯
						</router-link>
					</li>
					<li >
						<router-link to="/about" tag="a" >
							关于大图 
						</router-link>
					</li>
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss" scoped></style>