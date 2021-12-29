<template>
	<view class="basiness">
		<image :src="shopItem.logo" class="basiness_img"></image>
		<view>
			<text class="basiness_text">{{shopItem.shop}}</text>
				<view class="text-view">
					<image src="../../../static/coen/shijian.svg" mode="widthFix" class="text-img"></image>
					<text >配送约{{shopItem.capita}}分钟</text>
				</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			shopItem:{
				type:Object,
				default:()=>({})
			}
		}
	}
</script>

<style scoped>
	.basiness{
		background: linear-gradient(to top, #ffe566 10%, #ffd300 100%);
		padding: 20upx 10upx;
		display: flex;
		align-items: center;
		font-size: 27upx;
	}
	.basiness_img{
		width: 150upx;
		height:120upx;
		border-radius: 10upx;
	}
	.basiness_text{
		padding:20upx;
		display: block;
		font-size: 37upx;
	}
	.text-view{
		padding-left: 20upx;
		display: flex;
		align-items: center;
	}
	.text-img{
		margin-top: ;
		height:37upx;
		width: 37upx;
	}
</style>
