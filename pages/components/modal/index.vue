<template>
	<view class="modal-box" v-if="isShow">
		<view class="modal-view">
			<view class="modal-text">请登陆后再操作</view>
			<view class="modal-btn">
				<button plain="true"  class="modal-btn1" @click="cancel">取消</button>
				<button plain="true"  class="modal-btn1" @click="login">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	
		import {postLogin} from '../../api/home.js'
		import {getCodeId,getAvatar} from '../../../login/index.js'
	export default{
		data(){
			return {
				isShow:false,
				userInfo:{
					avatarUrl:'',
					nickName:"",
					code:'',
					appid:'wx7b5b0cb172c4a0c8',
					secret:'85d18fef7d537c389571c7ea0a39816f',
				}
			}
		},
		methods:{
			cancel(){
				this.isShow=!this.isShow
			},
			async login(){
				this.isShow=!this.isShow
				const avatarInfo =await getAvatar()
				const codeId =await getCodeId()
				this.userInfo.avatarUrl=avatarInfo.avatarUrl
				this.userInfo.nickName=avatarInfo.nickName
				this.userInfo.code=codeId.code
				const loginInfo =await  postLogin(this.userInfo)
				// 本地存储
				if(loginInfo.data.msg==='success'){
					wx.setStorageSync('userInfo',loginInfo.data.datas)
					wx.showToast({
						 title: '登录成功',
						  icon: 'success',
					})
				}else{
					wx.showToast({
						 title: '登录失败',
						  icon: 'error',
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	.modal-box{
		position:fixed;
		left:0;
		right:0;
		top:0;
		bottom: 0;
		background-color: rgba(0,0,0,0.6);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-view{
		width: 500upx;
		height: 200upx;
		background: #FFFFFF;
		text-align: center;
		border-radius: 8upx;
		overflow: hidden;
	}
	.modal-text{
		margin-top: 30upx;
		font-size: 34upx;
		color: #666666;
	}
	.modal-btn{
		display: flex;
		justify-content: space-between;
		border-top: 1upx solid #EEEEEE;
		height:80upx;
		line-height: 80upx;
		margin-top:50upx;
	}
	.modal-btn1{
		border: none;
		font-size: 30upx;
	}
</style>
