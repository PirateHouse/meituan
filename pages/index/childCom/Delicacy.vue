<template>
	<view>
<view class="prefer-posi">
		<!-- 筛选区 -->
		<view class="delica-view">
			<view class="delica-list delica-grow" @click="multiple()">
				<text>{{synthesize}}</text>
				<image src="../../../static/coen/paixu.png" mode="widthFix" class="delica-img"></image>
			</view>
			<view class="delica-grow" @click="saLes()">销量高</view>
			<view class="delica-grow" @click="saLes()" >速度快</view>
			<view class="delica-grow" @click="saLes()">津贴联盟</view>
			<view class="delica-list delica-right" @click="scReen()">
				<text>筛选</text>
				<image src="../../../static/coen/shaixuan.png" mode="widthFix" class="delica-img"></image>
			</view>
		</view>
		<box-positon v-show="sortmen">
			<merchant-search v-if="drop" @sortClick="sortClick"></merchant-search>
			<screen-search v-if="flag" @screenchoIce="screenchoIce" @emPty="emPty"></screen-search>
		</box-positon>
		</view>	
		<!-- 透明背景 -->
		<view class="yin" v-if="ying" @click="backClic()"></view>
</view>
</template>

<script>
	import MerchantSearch from '../../components/MerchantScreening/index.vue'
	import BoxPosition from '../../components/BoxPosition/index.vue'
	import ScreenSearch from '../../components/screenSearch/index.vue'
	import {getShopStart,postMultiple} from '../../api/home.js'
	export default{
		components:{
			MerchantSearch,
			BoxPosition,
			ScreenSearch
		},
		data(){
			return {
					flag:false,
					synthesize:"综合排序",
					drop:false,
					sortmen:false,
					ying:false,
					num:0,
					scrnum:-1,
					// 接收筛选的对象
					multiobj:{},
					
				}
			
		},
		methods:{
			multiple(){
				this.backClic()
				this.sortmen=!this.sortmen
				this.drop=!this.drop
				this.ying=!this.ying
				
			},
			scReen(){
				this.backClic()
				this.sortmen=!this.sortmen
				this.ying=!this.ying
				this.flag=!this.flag
			},
			screenchoIce(info){
				this.backClic()
				console.log(info)
				postMultiple(info).then(res=>{
					this.$store.commit('screenmuta',res.data)
				})
			},
			emPty(){
					this.backClic()
			},
			sortClick(value){
				this.synthesize=value.name
				this.backClic()
				let Data = {
					screen:value.screen,
					nums:value.nums
				}
				getShopStart(Data).then(res=>{
					this.$store.commit('screenmuta',res.data)
				})
			},
			backClic(){
					this.ying=this.flag=this.sortmen=this.drop=false

			},
			saLes(){
				this.backClic()
			},
		}
	}
</script>

<style scoped>
	.prefer-posi{
		position: relative;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 99;
	}
	.delica-view{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30upx;
		color: #666666;
		height: 70upx;
		padding: 0 15upx;
		background: #FFFFFF;
	}
	
	.delica-list{
		display: flex; 
		align-items: center;
	}
	.delica-img{
		width:30upx;
		height:30upx;
	}
	.Choice{
	font-size: 28upx; 
	background: #f8f8f8;
	height: 55upx;
	line-height: 55upx;
	color: #666666;
	width: calc((100% / 3) - 15px) !important;
	margin: 7.5px;
	text-align: center;
	display: block;
	border-radius: 5upx;
	}
	.sortlist-view{
	height: 700upx; 
	overflow: hidden;
	overflow-y: scroll;
	position: relative;
	}

	.yin{background: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0;}
</style>
