<template>
	<!-- 多个筛选区 -->
	<view class="sortlist sortlist-view">
		<!-- 多选：商家特色 -->
		<block v-for="(item,index) in screendata" :key="index">
		<view>
			<view class="sortlist-title">{{item.title}}</view>
			<view class="sortlist-flex">
				<block v-for="(itemdata,indexs) in item.datas" :key="indexs">
					<text class="Choice" :class="{scractive: itemdata.id === 2}" @click="screenchoIce(indexs,itemdata.sign)">{{itemdata.name}}</text>
				</block>
			</view>
		</view>
		</block>
		<!-- 单选：人均价 -->
		<block v-for="(item,index) in person" :key="index">
		<view>
			<view class="sortlist-title">{{item.title}}</view>
			<view class="sortlist-flex">
				<block v-for="(itemdata,indexs) in item.datas" :key="indexs">
				<text class="Choice"  :class="{scractive: indexs == scrnum}"@click="personchoIce(indexs,itemdata.per)" >{{itemdata.name}}</text>
				</block>
			</view>
		</view>
		</block>
		<!-- 置顶 -->
		<view class="sortlist-bottom">
			<button type="warn" size="mini" @click="emPty()" class="bottom_text">清空</button>
			<button type="primary" size="mini" @click="compLete()" class="bottom_text">完成</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				scrnum:0,
				// 接收筛选的对象
				multiobj:{},				// 多选
			screendata:[
				{
					"title":"商家特色(可多选)",
					"datas":[
						{
							"id":1,
							"sign":'duration',
							"name":'配送最快'
						},
						{
							"id":1,
							"sign":'deliver',
							"name":'0元起送'
						},
						{
							"id":1,
							"sign":'physi',
							"name":'免配送费'
						}
					],
				}		
			],
			// 人均价筛选
			person:[
				{
					"title":"人均价",
					"datas":[
						{
						"name":"20元以下",
						"per":{
							"$lt":20
							},
						},
						{
						"name":"20-40元",
						"per":{
							"$lte":40,
							"$gte":20
							},
						},
						{
						"name":"40元以上",
						"per":{
							"$gt":40
							},
						},
					]
				}
			],
		
			}
		},
		methods:{
			// 商家特色（多选）
			screenchoIce(indexs,sign){
				if(this.screendata[0].datas[indexs].id == 1){
					// 选中
					this.screendata[0].datas[indexs].id = 2
					// console.log('选中')
					this.$set(this.multiobj,sign,sign)
					// this.$set给对象添加一个属性
					console.log(this.multiobj)
				}else{
					// 未选中
					this.screendata[0].datas[indexs].id = 1
					// console.log('未选中')
					this.$delete(this.multiobj,sign)
				}
				
			},
			emPty(){
				this.$emit('emPty')
			},
			compLete(){
				this.$emit('screenchoIce',this.multiobj)
			},
			// 人均价（单选）
			personchoIce(index,name){
				if(this.scrnum == index){
					// 未选中
					this.scrnum = -1
					this.$delete(this.multiobj,'capita')
					console.log(this.multiobj)
				}else{
					// 选中
					this.scrnum = index
					this.$set(this.multiobj,'capita',name)
					console.log(this.multiobj)
				}
			},
			
		}
	}
</script>

<style scoped>
	.sortlist-title{
		padding: 0 15upx;
		font-size: 30upx;
		height: 60upx;
		line-height: 60upx;
	}
	.sortlist-flex{
		font-size:30upx;
		display: flex; 
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30upx;
	}
	.sortlist{
		background: #ffffff;
		padding:0 20upx;
	}
	.scractive{
		
		background: #fef6df !important;
		color: #f29909 !important;
	}
	.sortlist-bottom{
		display: flex;
		justify-content: space-between;
		text-align: center;
		align-items: center;
		
	}
	.bottom_text{
		height: 80upx;
		line-height: 80upx;
		flex:1;
	}
	.Choice{font-size: 28upx; background: #f8f8f8;
	height: 55upx;
	line-height: 55upx;
	color: #666666;
	width: calc((100% / 3) - 15px) !important;
	margin: 7.5px;
	text-align: center;
	display: block;
	border-radius: 5upx;
	}
</style>
