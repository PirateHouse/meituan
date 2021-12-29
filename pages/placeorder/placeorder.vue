<template>
<view>
	<view class="place-view">
		<view class="place-addres" @click="addRess()"  v-if="isShow">
			+ 新增收货地址
		</view>
		<!-- 已选中收货地址 -->
		<view class="goods-address"  v-if="!isShow" @click="addRess()">
			<view class="goods-address-left">
				<image src="../../static/coen/address.png" mode="widthFix"></image>
			</view>
			<view class="goods-address-in">
				<view>{{adresslist.detailInfo}}</view>
				<view class="goods-address-name">
					<text>{{adresslist.userName}}</text>
					<text>{{adresslist.telNumber}}</text>
				</view>
			</view>
			<view class="goods-address-right">
				<image src="../../static/coen/jiantou.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="place-time">
			<image src="../../static/coen/times.png" mode="widthFix"></image>
			<text>立即送出</text>
		</view>
	</view>
	<!-- 菜单 -->
	<view class="place-view">
		<view>
			<block v-for="(item,index) in allorder" :key="index">
				<view class="order-view">
					<view class="order-img">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="order-title">
						<text>{{item.input}}</text>
						<text>x{{item.amount}}</text>
					</view>
					<view class="order-price">
						单价:¥{{item.price}}
					</view>
				</view>
			</block>
		</view>
	</view>
	<!-- 配送费 -->
	<view class="place-view">
		<view class="Delivery">配送费：¥{{adressInfo.physical}}</view>
	</view>
	<!-- 高度 -->
	<view style="height: 140upx;"></view>
	<!-- 支付 -->
	<view class="payment">
		<view class="payment-left">
			<text>合计</text>
			<text>¥{{payment}}</text>
		</view>
		<view class="payment-right" @click="toPay()">
			去支付
		</view>
	</view>
</view>
</template>

<script>
	import {getwxPay} from'../api/home.js'
	export default{
		data(){
			return {
			isShow:true,
			 adressInfo:{},
			 allorder:[],
			 adresslist:{}
			}
		},
		computed:{
			payment(){
				return (Number(this.adressInfo.payment)+Number(this.adressInfo.physical)).toFixed(2)
			}
		},
		onLoad(e) {
			const info =JSON.parse(e.id)
			this.adressInfo=info
			console.log(this.adressInfo)
			this.allorder=info.arrinfo
		},
		methods:{
			addRess(){
				wx.chooseAddress({
					success:(res)=>{
						this.adresslist = res
						console.log(res)
						console.log(this.adresslist)
						this.isShow = !this.isShow 
					}
				})
			},
			toPay(){
				if(Object.keys(this.adresslist).length===0){
					wx.showToast({
						title:'请选择收货地址',
						icon:'error'
					})
				}else{
					this.adressInfo.type="placeOrder"
					this.adressInfo.peopleobj={
						name:this.adresslist.userName,
						iphone:this.adresslist.telNumber,
						address:this.adresslist.detailInfo
						}
					getwxPay(this.adressInfo).then(res=>{
						if(res.data.meg==='SUCCESS'){
							wx.showToast({
								title:'支付成功',
								icon:"success"
							})
						}else{
							wx.showToast({
								title:'支付失败',
								icon:'error'
							})
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	page{background: #F4f4f4;}
	.place-view{background: #FFFFFF;
	margin: 20upx;
	border-radius: 9upx;
	padding: 35upx 15upx;}
	.place-addres{
	border: 1rpx solid #ffb000;
	width: 400upx;
	height: 80upx;
	line-height: 80upx;
	border-radius: 50upx;
	text-align: center;
	color: #ffb000;
	margin: 0 auto;
	font-size: 30upx;
	}
	.place-time image{width: 40upx; height: 40upx; padding-right: 20upx;}
	.place-time{display: flex; align-items: center; font-size: 30upx;
	border-top: 1rpx solid #F4f4f4;
	padding-top: 35upx;
	margin-top: 35upx;
	}
	/* 菜单 */
	.order-view{display: flex;
	height: 150upx !important; overflow: hidden;
	margin-bottom: 15upx;
	font-size: 30upx;
	}
	.order-view text{display: block;}
	.order-img{width: 200upx !important; height: 150upx !important;
	padding-right: 15upx;
	}
	.order-img image{width: 100%; height: 100%;
	}
	.order-title{flex-grow: 1;}
	.order-title text:nth-child(2){color: #999999; font-size: 25upx;}
	.Delivery{
	display: flex;
	justify-content: flex-end;
	font-size: 30upx;}
	/* 支付 */
	.payment{background: #FFFFFF;
	height: 120upx;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30upx;}
	.payment-left{display: flex; align-items: center;
	font-size: 30upx;}
	.payment-left text:nth-child(2){font-weight: bold; font-size: 32upx;}
	.payment-right{background: #07c160; color: #FFFFFF;
	padding: 20upx 60upx;
	font-size: 30upx;
	border-radius: 7upx;}
	/* 收货地址 */
	.goods-address-left{width: 40upx; height: 40upx; padding-right: 20upx;}
	.goods-address-left image{width: 40upx; height: 40upx;}
	.goods-address-name{display: flex; align-items: center; font-size: 28upx;
	padding-top: 10upx;
	}
	.goods-address-right{width: 40upx; height: 40upx;}
	.goods-address-right image{width: 40upx; height: 40upx;}
	.goods-address{display: flex; align-items: center;}
	.goods-address-in{flex-grow: 1; font-size: 30upx;}
	.goods-address-name text:nth-child(1){padding-right: 10upx;}
	
</style>
