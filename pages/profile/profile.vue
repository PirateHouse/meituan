<template>
	<view>
		<view class="myhome">
			<!-- 已登录 -->
			<view class="wx-name" v-if="wxlogin">
				<view>
					<image :src="usering.avatarUrl"></image>	
				</view>
				<view class="wx-text">
					<text>{{usering.nickName}}</text>
				</view>
			</view>
			<!-- </block> -->
			<!-- 未登录 -->
			<view class="wx-button" v-if="!wxlogin">
				<view class="wx-button-view">登录美团外卖，开启吃货旅程</view>
				<view>
					<button  open-type="getUserInfo" @click="getUserInfo()">去登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {postLogin} from '../api/home.js'
	import {getCodeId,getAvatar} from '../../login/index.js'
	var {log} = console
	export default{
		data() {
			return {
				usering:{},
				wxlogin:true,
				userInfo:{
					avatarUrl:'',
					nickName:"",
					code:'',
					appid:'wx7b5b0cb172c4a0c8',
					secret:'85d18fef7d537c389571c7ea0a39816f',
				}
			}
		},
		onShow() {
			this.isLogin()
		},
		
		methods:{
			// 获取头像昵称
			async getUserInfo(){
				
				const avatarInfo =await getAvatar()
				const codeId =await getCodeId()
				this.userInfo.avatarUrl=avatarInfo.avatarUrl
				this.userInfo.nickName=avatarInfo.nickName
				this.userInfo.code=codeId.code
				const loginInfo =await  postLogin(this.userInfo)
				// 本地存储
				if(loginInfo.data.msg==='success'){
					wx.setStorageSync('userInfo',loginInfo.data.datas)
				}
				this.isLogin()
			},
			isLogin(){
				let userList=wx.getStorageSync('userInfo')
				if(!userList){
					this.wxlogin =false
				}else{
					this.wxlogin =true
					this.usering=userList
				}
			}
	},
	
}
</script>

<style scoped>
	.myhome{background: linear-gradient(to top, #ffe566 10%, #ffd300 100%); height: 350upx; display: flex; align-items: center;}
	.wx-name image{width: 120upx !important; height: 120upx !important; border-radius: 50%; margin-right: 20upx;
					border: 10rpx solid #999999;}
	text{display: block; margin: 10upx 0; color: #999999;}
	.wx-name{display: flex; align-items: center; padding: 0 30upx; align-content: center;
			height: 200upx;}
	.wx-text text{font-size: 35upx;}
	/* 登录 */
	.wx-button button{border: none;font-size: 30upx; background: linear-gradient(to right, #28a6f1 10%, #0e8dd7 80%);
	 border-radius: 50upx;
	color: #FFFFFF;}							
	.wx-button-view{font-size: 35upx; color: #FFFFFF; margin-bottom: 25upx;}
	.wx-button{margin: 0 auto;}
	
</style>
