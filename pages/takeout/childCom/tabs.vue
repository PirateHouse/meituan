<template>
	<view class="tabs">
		<block v-for="(item,index) in tabsList" :key="index">
			<view class="tab-item" :class="{active:index==tabNum}" @click="tabClick(index)">{{item}}</view>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				tabNum:0,
				tabsList:['点菜','评价','商家']
			}
		},
		methods:{
			tabClick(index){
				this.tabNum=index
				this.$emit('tabClick',index)
			}
		}
	}
</script>

<style scoped>
	.tabs{
		margin: 20upx;
		display: flex;
	}
	.tab-item{
	margin-right: 60upx;
	display: block;
	height: 60upx;
	line-height: 60upx;
	font-size: 33upx;
	color: #666666;
	}
	.active{
		color: #333333 !important;
		font-weight: bold !important;
		border-bottom: 1upx solid #ffd161;
	}
</style>
