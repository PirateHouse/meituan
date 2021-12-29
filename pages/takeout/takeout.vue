<template>
	<view>
		<Business :shopItem="shopItem"></Business>
		<tabs @tabClick="tabClick"></tabs>
		<Ordering
		 :orderingdata="disheslist"
		 :physicalList='shopItem'
		 :class="[currentIndex === 0 ? 'actineclass' : 'errorclass']" ></Ordering>
		<Message
		:cateList="messageList"
		:cateTitle="cateTitle"
		@menubtn="menubtn"
		 :class="[currentIndex === 1 ? 'actineclass' : 'errorclass']"></Message>
		<Introduce
		:busidata="shopItem"
		 :class="[currentIndex === 2 ? 'actineclass' : 'errorclass']"></Introduce>
	</view>
</template>

<script>
	import Business from './childCom/basiness.vue'
	import Tabs from './childCom/tabs.vue'
	import Ordering from './childCom/ordering.vue'
	import Message from './childCom/message.vue'
	import Introduce from './childCom/Introduce.vue'
	import {getDishes,getShopInfo,getMessage} from '../api/home.js'
	export default {
		components:{
			Business,
			Tabs,
			Ordering,
			Message,
			Introduce
		},
		data(){
			return {
				id:'',
				disheslist:[],
				shopItem:{},
				messageList:[],
				currentIndex:0,
				cateTitle:[]
			}
		},
		onLoad(e){
			this.id =e.id
			this.getShopList()
			this._getMessage()
		},
		
		methods:{
			getShopList(){
				let obj={openid:this.id}
				Promise.all([getDishes(obj),getShopInfo(obj)]).then(res=>{
					const [disheslist,shopItem]=res
					this.disheslist=disheslist.data
					this.shopItem=shopItem.data[0]
					console.log(this.shopItem)
				})
			},
			_getMessage(){
				let obj={merchantid:this.id}
				getMessage(obj).then(res=>{
					this.messageList=res.data
					let newArr=[]
					this.messageList.filter(item=>{
						if(newArr.indexOf(item.classmessage)==-1){
							newArr.push(item.classmessage)
						}
					})
					newArr.unshift('全部')
					this.cateTitle=newArr.filter(item=>item)
				
					
				})
			},
			tabClick(index){
				this.currentIndex =index
			},
			menubtn(value){
				let obj={}
				if(value=='全部'){
					obj={merchantid:this.id}
				}else{
					obj={merchantid:this.id,classmessage:value}
				}
				getMessage(obj).then(res=>{
					this.messageList=res.data
				})
			}
		}
	}
</script>

<style scoped>
	.hidden{
		display: block;
		overflow-y: auto; 
		height: 100%;
	}
	.errorclass{
		display: none;
	}
	.ordering-sceate{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 230upx;
	}
</style>
