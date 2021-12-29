
export function getAvatar(){
	return new Promise((resolve,reject)=>{
		wx.getUserProfile({
		      desc: '登录', 
		      success: (res) => {
				resolve(res)
		      },fail: (err) => {
		      	reject(err)
		      }
		    })
	})
}

export function getCodeId(){
	return new Promise((resolve,reject)=>{
		wx.login({
			success:(res)=>{
				resolve(res)
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}

