import {request} from './request.js'

export function getprefer(){
	return request({
		url:'/forshop/getprefer',
		method:'GET'
	})
}

export function getShopList(){
	return request({
		url:'/forshop/wxshop',
		method:'GET'
	})
}
export function getShopStart(data){
	return request({
		url:'/forshop/starting',
		method:'POST',
		data
	})
}

export function postMultiple(data){
	return request({
		url:'/forshop/multiple',
		method:'POST',
		data
	})
}

export function postSearch(data){
	return request({
		url:'/forshop/search',
		method:'POST',
		data
	})
}

export function getShopInfo(data){
	return request({
		url:'/forshop/shop',
		method:'POST',
		data
	})
}

export function getDishes(data){
	return request({
		url:'/forshop/getdishes',
		method:'POST',
		data
	})
}

export function getMessage(data){
	return request({
		url:'/message/discuss',
		method:'POST',
		data
	})
}


export function postLogin (data){
	return request({
		url:"/wxuser/wxlogin",
		method:'POST',
		data
	})
}

export function getwxPay(data){
	return request({
		url:'/wxpay/wxpaying',
		method:'POST',
		data
	})
}

export function publicing(data){
	return request({
		url:'/wxpay/wxpaying',
		method:'POST',
		data
	})
}

