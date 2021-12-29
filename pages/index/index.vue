<template>
	<view class="content">
		<search></search>
		<preference :preferList="preferList"></preference>
		<title ></title>
		<view @click="pool" :catchtouchmove="true">
		<delicacy id="delicacyId"  :class="{isFixed:isFixed}"></delicacy>
		</view>
		<takeout :takeshop="shopList"></takeout>
	</view>
</template>

<script>
	import Search from './childCom/Search.vue'
	import Preference from './childCom/Preference.vue'
	import Title from './childCom/Title.vue'
	import Delicacy from './childCom/Delicacy.vue'
	import Takeout from './childCom/Takeout.vue'
	
	import {getprefer,getShopList} from '../api/home.js'
	
	import {mapState} from 'vuex'
	export default {
		components:{
			Search,
			Preference,
			Title,
			Delicacy,
			Takeout
		},
		data() {
			return {
				title: 'Hello',
				preferList:[],
				menutop:'',
				rect:'',
				isFixed:'',
				topdata:'',
				shopList:[],
				storeList:[]
			}
		},
		onLoad() {
			// 监听筛选组件距离顶部的距离
			const query = wx.createSelectorQuery()
			query.select('#delicacyId').boundingClientRect()
			query.exec((res)=>{
				this.menutop = res[0].top+100
				this.topdata = res[0].top+100
			})
			this._getprefer()
			this._getShopList()
		},
	
		computed:{
			...mapState(['screendata']),
			namePage(){
				if(this.rect>this.menutop){
					this.isFixed=true
				}else{
					this.isFixed=false
				}
			},
			count(){
				this.storeList=this.screendata.screenarr
				console.log(this.storeList)
			}
		},
		watch:{
			storeList(newVal){
				this.shopList=newVal
			}
		},
		methods: {
			_getprefer(){
				getprefer().then(res=>{
				this.preferList=res.data
				})
			},
			pool(){
				wx.pageScrollTo({
					scrollTop:this.topdata,
					duration:300
				})
			},
			_getShopList(){
				getShopList().then(res=>{
					this.shopList=res.data
				})
			}
		},
		onPageScroll(e){
		this.rect = e.scrollTop
		}
		
	}
</script>

<style scoped>
	.content{
			margin:0 15upx;
			position :relative;
	}
	.isFixed{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
	}
</style>
