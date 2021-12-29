export function request(config){
	return new Promise((resolve,reject)=>{
		uni.request({
			...config,
			url:'https://meituan.thexxdd.cn/api'+config.url,
			success(res) {
				resolve(res)
			},
			fail(err){
				uni.showToast({
					icon:'error',
					title:'服务器错误，请稍后再试~'
				})
				reject(err)
			}
		})
	})
}