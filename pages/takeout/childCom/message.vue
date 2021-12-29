<template>
	<view>
			<view class="cate_title">
				<block v-for="(item,index) in cateTitle" :key="index">
					<text class="title_info" :class="{activetext: index == num}" @click="menubtn(index,item)">{{item}}</text>
				</block>
			</view>
			<view >
				<block v-for="(item,index) in cateList" :key="index">
					<view class="avatar">
						<view class="avatar_box">
							<view class="avatar-info">
								<image :src="item.messagedata.avatarUrl" mode="widthFix" class="avatar_img"></image>
								<text class="avatar_text">{{item.messagedata.nickName}}</text>
							</view>
							<view class="avatar_timer">{{item.messagedata.time}}</view>
						</view>
						<view class="cate-info">
							{{item.messagedata.usermess}}
						</view>
					</view>
				</block>	
			</view>
	</view>
</template>

<script>
	export default{
		props:{
			cateList:{
				type:Array,
				default:()=>[]
			},
			cateTitle:{
				type:Array,
				default:()=>[]
			}
		},
		data(){
			return{
				num:0,
				enptylist:false
			}
		},
		
		methods:{
			menubtn(index,value){
				this.num =index
				this.$emit('menubtn',value)
			}
		}
	}
</script>

<style scoped>
	
	.cate_title{
		padding:10upx;
		display: flex;
		flex-wrap: wrap;
	}
	.title_info{
		background: #ffffff;
		border: 1px solid #c2c5cc;
		border-radius: 6upx;
		font-size: 25upx;
		color: #292c33;
		font-weight: bold;
		text-align: center;
		padding: 15upx;
		margin: 10upx 15upx 5upx 0;
	}
	.activetext{
		color: #4CD964; 
		background: #ffdd00 ; 
		border: 1px solid #ffdd00 ;
	}
	.avatar{
		margin-top: 30upx;
		border-bottom: 1rpx solid #f8f8f8;
		padding: 0 20upx 25upx 20upx;
	}
	.avatar_box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size:27upx;
	}
	.avatar-info{
		display: flex;
		align-items: center;
	}
	.avatar_img{
		width:80upx;
		height:80upx;
		border-radius: 50%;
		margin-right:10upx;
	}
	.cate-info{
		font-size: 30upx;
	}
</style>
