<template>
<view>
	<view class="order-flex">
		<view class="order_left">
			<block v-for="(item,index) in newOrderLeft" :key="index">
				<view class="order_view" :class="{active:index==orderIndex}" @click="orderLeft(item,index)">{{item}}</view>
			</block>
		</view>
		<view class="order-right">
			<view>{{ordertitle}}</view>
			<block v-for="(item,index) in newOrderRight" :key="index">
				<view class="order-box">
					<image class="order-img" :src="item.objdis.image"></image>
					<view class="order-title-info">
						<view class="title-info">{{item.objdis.input}}</view>
						<view v-if="item.objdis.tags.length!==0" >
							<block v-for="(tagsItem,tagsIndex) in item.objdis.tags" :key="tagsIndex">
								<text class="tag-item">{{tagsItem}}</text>
							</block>
						</view>
						<view class="title-price">
							<text class='price-new'>￥{{item.objdis.Discount}}</text>
							<text class="price-old">￥{{item.objdis.Price}}</text>
							<image class="count-img" src="../../../static/coen/jianhao.png" mode="widthFix" @click="decrement(item)"></image>
							<text class="amounting">{{item.amount}}</text>
							<image class="count-img"  src="../../../static/coen/jiahao.png" mode="widthFix" @click="increment(item)"></image>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 加入购物 -->
		<view class="Shopping">
			<!-- 骑手 -->
			<view class="qishou">
				<image v-if="!isActive" src="../../../static/coen/weigou.png" mode="widthFix" class="qishou_img"></image>
				<image v-if="isActive" src="../../../static/coen/yigou.png" mode="widthFix" class="qishou_img"></image>
			</view>
			<!-- 多少量 -->
			<view class="Numbering" v-if="isActive">{{Takeleng.length}}</view>
			<!-- 金额 -->
			<view class="Shopping-dis">
				<view class="Shopping-left">
					<view class="Cost-mony">
						<text class="Total-price">¥{{Takeawayprice}}</text>
						<text class="Delivery">另需配送费{{physicalList.physical}}元</text>
					</view> 
				</view>
				<view  class="Shopping-right" :class="{shoppactive: isActive}" @click=" isActive && toShop()">
					<text v-if="!isActive">{{physicalList.delivering}}元起送</text>
					<text v-if="isActive">{{difference}}</text>
				</view>
			</view>
		</view>
		
	</view>
	<orderDist ref="orderRef"></orderDist>
</view>
</template>

<script>
	import orderDist from '../../components/modal/index.vue'
	export default{
		components:{
			orderDist
		},
		props:{
			orderingdata:{
				type:Array,
				default:()=>[]
			},
			physicalList:{
				type:Object,
					default:()=>({})	
			}
		},
		data(){
			return{
				orderIndex:0,
				newOrderLeft:[],
				newOrderRight:[],
				ordertitle:'',
				oldOrderDate:[],
				Takeleng:[],
				takeList:[],
				// flag:false
			}
		},
		watch:{
			// 拿到左边不重复的title
			orderingdata(newVal){
				let newArr=[]
				newVal.forEach(item=>{
					if(newArr.indexOf(item.optidata)===-1){
						newArr.push(item.optidata)
					}
				})
				// 获取第一个title
				this.ordertitle=newArr[0]
				this.newOrderLeft=newArr
				// 给每个对象添加一个amount 属性
				newVal.forEach(item=>{
					Object.defineProperty(item,'amount',{
						writable:true,
						enumerable:true,
						configurable:true,
						value:0
					})
				})
				// 遍历数组，找到同一个左边title的数据
				this.newOrderRight=newVal.filter(item=>{
					return item.optidata===this.ordertitle
				})
				this.oldOrderDate=newVal
			}
				
		},
		computed:{
			Takeawayprice(){
					return this.Takeleng.reduce((proVal,newVal)=>{
						console.log(Number(proVal),Number(newVal.idCount))
						return  (Number(proVal)+Number(newVal.idCount)).toFixed(2)
					},0)
			},
			isActive(){
				return this.physicalList.delivering<= Number(this.Takeawayprice)
			},
			difference(){
				if(!this.isActive){
					return '去下单'
				}
			},
			
		},
		methods:{
			orderLeft(value,index){
				this.ordertitle=value
				this.orderIndex=index
				let info =this.oldOrderDate.filter(item1=>{
					return  item1.optidata===value	
				})
				this.newOrderRight=info
			},
			decrement(value){
				console.log(value)
				if(value.amount!==0){
					let id=value._id
					value.amount--
					let info=this.Takeleng.find(item=>item._id===id)
					info.amount--
					info.idCount=(Number(info.amount)*Number(info.price)).toFixed(2)
					this.$forceUpdate()
				}
				return 
			},
			increment(value){
				value.amount++
				let obj={}
				obj.image=value.objdis.image
				obj.input=value.objdis.input
				obj.optidata=value.objdis.optidata
				obj.amount=value.amount
				obj._id=value._id
				obj.price=value.objdis.Discount
				obj.idCount=obj.amount*obj.price
				if(this.Takeleng.length===0){
					this.Takeleng.push(obj)
				}else{
				const info=	this.Takeleng.find(item=>item._id===obj._id)
					if(info){
						info.amount++
						info.idCount=(Number(info.amount)*Number(info.price)).toFixed(2)
					}else{
						this.Takeleng.push(obj)
					}
				}
				console.log(this.Takeleng)
				// 渲染太多层，视图层无法立刻更新数据
				this.$forceUpdate()
			},
			toShop(){
				const info =wx.getStorageSync('userInfo')
				if(info.length==0){
				return 	this.$refs.orderRef.isShow=true
				}
				let obj={
					arrinfo: this.Takeleng,
					merchantid:this.physicalList._id,
					ide:this.physicalList._id.slice(0,7),
					commod:this.physicalList.shop,
					logo:this.physicalList.logo,
					useropenid:info.openid,
					payment:this.Takeawayprice,
					physical:this.physicalList.physical
				}
				const objString =JSON.stringify(obj)
				wx.navigateTo({
					url:'/pages/placeorder/placeorder?id='+objString
				})
			}
			
		}
	}
</script>

<style scoped>
.order-flex{
	display: flex;
}
.order_left{
	height:100%;
	width: 190upx;
	background: #fafafa;
	overflow-y: auto;
}
.order-right{
	flex:1;
	height:100%;
}
.order_view{
	color: #a8a8a8;
	display: block;
	font-size: 28upx;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
}
.active{
	background: #FFFFFF ; 
	font-weight: bold ;
}
.order-img{
	width:180upx;
	height:200upx;
}
.order-box{
	display: flex;
	padding-left: 10upx;
	font-size: 24upx;
	margin-top:10upx;
}
.order-title-info{
	height:200upx;
	padding-left: 20upx;
}


.title-info,.tag-item,.title-price{
	margin-top: 20upx;
	height: 50upx; 
	line-height: 50upx;
}
.title-price{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.title-info{
	font-size: 33upx;
	font-weight: bold;
}
.tag-item{
	background: #f1f1f1;
	margin-right: 9upx;
	padding: 4upx 13upx;
	border-radius: 7upx;
}
.price-new{
	color: #fb4e44;
	font-size: 33upx;
	width: 80upx;
	overflow: hidden;
}
.price-old{

	text-decoration: line-through;
}
.count-img{
	width: 60upx;
	height:60upx;
}
.price-old,.amounting{
	margin: 0 20upx;
}
	/* 购物车 */
	.Shopping{position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	}
	.Shopping-left{
	height: 130upx;
	background: #000000; flex-grow: 2;
	border-top-left-radius: 50upx;
	border-bottom-left-radius: 50upx;
	}
	.Shopping-right{
	height: 130upx;
	line-height: 130upx;
	font-size: 30upx;
	color: #7f7f7f;
	text-align: center;
	background: #000000; flex-grow: 1;
	border-top-right-radius: 50upx;
	border-bottom-right-radius: 50upx;}
	.Shopping-dis{display: flex;
	height: 130upx;
	margin: 0 20upx;
	}
	.qishou{width: 120upx; height: 150upx;
	position: fixed;
	bottom: 0upx;
	left: 50upx;
	}
	.qishou image{width: 120upx; height: 150upx !important;}
	/* 定位 */
	.Delivery{color: #999999;
	font-size: 28upx;
	height: 65upx;}
	.Shopping-left text{display: block;}
	.Total-price{font-size: 40upx; color: #FFFFFF;
	height: 65upx;
	line-height: 65upx;
	}
	.Cost-mony{padding-left: 170upx; color: #4CD964;
	height: 130upx;
	}
	/* 数量 */
	.Numbering{
	background: red;
	width: 40upx;
	height: 40upx;
	border-radius: 50%;
	font-size: 20upx;
	color: #FFFFFF;
	text-align: center;
	line-height: 40upx;
	position: fixed;
	bottom: 50upx;
	left: 130upx;}
	/* 选中菜品 */
	.shoppactive{background: #ffd300 !important;
	color: #000000 !important;}
</style>
