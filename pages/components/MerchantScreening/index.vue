<template>
	<!-- 综合排序筛选 -->
	<view class="sortlist sortliteltle" >
		<block v-for="(item,index) in sortlist" :key="index">
		<text :class="{activeb: index == num}" class="sort-text"  @click="sortClick(item,index)">{{item.name}}</text>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				num:0,
				sortlist: [
					{
						"name":"综合排序",
						"screen":"_id",
						"nums":1
					},
					{
						"name":"起送价最低",
						"screen":"delivering",
						"nums":1
					},
					{
						"name":"配送费最低",
						"screen":"physical",
						"nums":1
					},
					{
						"name":"人均高到低",
						"screen":"capita",
						"nums":-1
					},
					{
						"name":"人均低到高",
						"screen":"capita",
						"nums":1
					}
				],
			}
		},
		methods:{
			sortClick(item,index){
				this.num=index
				this.$emit('sortClick',item)
			}
		}
	}
</script>

<style scoped>
	.sortlist{
		background: #ffffff;
	}
	.sort-text{
		padding: 0 15upx;
		display: block;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		border-top: 1rpx solid #ededed;
	}
	.activeb{
		color: #f89903 ;
	}
</style>
