<template>
	<view>
		<view class="prefer_title">为你推荐</view>
		<scroll-view scroll-x class="scroll">
			<view class="prefer-dis">
			<block v-for="item in preferList" :key="item.id">
				<view class="scroll-item">
					<image :src="item.image" class="scroll-img"></image>
					<view class="scroll-title">{{item.title}}</view>
					
					<view class="scroll-lable">{{item.lable}}</view>
				</view>
			</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
		
export default{
	props:{
		preferList:{
			type:Array,
			default:()=>[]
		}
	},
	created(){
	}
		
}

</script>

<style scoped>
	.prefer_title{
		margin:30upx 0;
	}
	.scroll-item{
		
	}
	.prefer-dis{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.scroll-img{
		width: 300upx;
		height: 200upx;
		border-radius: 8upx;
		border:5upx solid #FFFFFF;
	}
	.scroll-title{
		height: 45upx;
		line-height: 45upx;
		padding-left: 20upx;
		font-size:30upx;
	}
	.scroll-lable{
		padding-left: 20upx;
		font-size: 27upx;
		color: #9c9c9c
	}
</style>
