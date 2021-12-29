<template>
	<view>
		<!-- 定位 -->
		<view class="search-view">
			<image class="search-view-img" src="../../../static/coen/dingwei.svg" mode="widthFix"></image>
			<text class="search-text">天津市南开区</text>
			<text>></text>
		</view>
		<!-- 搜索框 -->
			<view class="search"  @click="search()">
				<image src="../../../static/coen/sousuo.svg" mode="widthFix" class="search-img"></image>
				<input type="text" placeholder="米线" class="search-inp" disabled ></input>
			</view>
			<!-- 轮播图 -->
			<view>
				<swiper class="box-swiper" :autoplay="false" :interval="2000" :duration="1000" @change="bannerfun">
					<block v-for="(item,index) in lable" :key="index" >
						<swiper-item   >
							<view class="swiper-item">
							<block v-for="(listdata,index) in item" :key="index">
								<view class="conteng-img">
									<image :src="listdata.img" mode="widthFix" class="uploadimg"></image>
									<view class="swiper-text">{{listdata.title}}</view>
								</view>
							</block>
							</view>
						</swiper-item>
					</block>
				</swiper>
				<!-- 指示点 -->
				<view class="instruct-view">
					<block v-for="(item1,index) in lable" :key="index">
						<view class="instruct" :class="{active:index===currentIndex}"></view>
					</block>
				</view>
			</view>
	
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				currentIndex:0,
				// 轮播数组
				lable: [
					[
						{
							'img':'../../../static/inster/meishi.png',
							'title':'美食'
						},
						{
							'img':'../../../static/inster/chaoshi.png',
							'title':'超市便利'
						},
						{
							'img':'../../../static/inster/shuiguo.png',
							'title':'蔬菜水果'
						},
						{
							'img':'../../../static/inster/meituan.png',
							'title':'美团专送'
						},
						{
							'img':'../../../static/inster/paotui.png',
							'title':'跑腿代购'
						},
						{
							'img':'../../../static/inster/yexiao.png',
							'title':'夜宵'
						},
						{
							'img':'../../../static/inster/jintie.png',
							'title':'津贴联盟'
						},
						{
							'img':'../../../static/inster/pinping.png',
							'title':'甜点饮品'
						},
						{
							'img':'../../../static/inster/shaokao.png',
							'title':'龙虾烧烤'
						},
						{
							'img':'../../../static/inster/dangao.png',
							'title':'甜蜜蛋糕'
						}
					],
					[
						{
							'img':'../../../static/inster/hanbao.png',
							'title':'汉堡披萨'
						},
						{
							'img':'../../../static/inster/liaoli.png',
							'title':'日韩料理'
						},
						{
							'img':'../../../static/inster/malatang.png',
							'title':'麻辣烫'
						},
						{
							'img':'../../../static/inster/kuaican.png',
							'title':'快食简餐'
						},
						{
							'img':'../../../static/inster/xianhua.png',
							'title':'浪漫鲜花'
						},
						{
							'img':'../../../static/inster/lazi.png',
							'title':'无辣不欢'
						},
						{
							'img':'../../../static/inster/jiaozi.png',
							'title':'饺子馆'
						},
						{
							'img':'../../../static/inster/xiaochi.png',
							'title':'小吃馆'
						},
						{
							'img':'../../../static/inster/baofan.png',
							'title':'煲仔饭'
						},
						{
							'img':'../../../static/inster/qita.png',
							'title':'其他'
						}
					]
				]
			}
		},
		methods:{
			bannerfun(e){
				this.currentIndex=e.detail.current
			},
			search(){
				console.log(11)
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>

<style scoped>
	.search-view{
		font-size:30upx;
		font-weight: bold;
		display: flex;
		align-items: center;
		height:80upx;
	}
	.search-view-img{
		width:35upx;height:35upx;
	}
	.search-text{
		padding:0 10upx;
	}
	.search-cont{
		display: flex;
		justify-content: space-between;
		height:70upx;
		align-items: center;
	}
	.search{
		height:70upx;
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: flex;
		background-color: #eff3f4;
		border-radius: 10rpx;
		
	}
	.search-img{
		width:40upx;
		height:40upx;
	}
	.search-inp{
		height:70upx;
		width: 100%;
		font-size: 25upx;
		color:#666666;
	}
	.box-swiper{
		height:320upx;
	}
	
	.swiper-item{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		height: 320upx;
	}
	.conteng-img{
		text-align: center;
		width: 20%;
	}
	.swiper-text{
		font-size: 25upx;
	}
	.uploadimg{
		width: 70upx;
		height:70upx;
		border-radius: 50%;
	}
	.instruct-view{
		display: flex;
		justify-content: center; 
		padding-top: 10upx;
	}
	.instruct{
		background: #e6e6e6;
		height: 10upx;
		width: 30upx;
		border-radius: 50upx;
		margin: 0 10upx;
	}
	.active{
		background-color: #fbae22 !important;
	}
</style>
