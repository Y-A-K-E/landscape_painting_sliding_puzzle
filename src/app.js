import { game, prepare } from './scenes'
console.log("begin_获取参数进入")


if (wx.getLaunchOptionsSync().query.scene !==undefined){
	console.log("有参数")
	console.log(wx.getLaunchOptionsSync().query.scene);
}else{
	console.log("无参数")
}
console.log("end") 



		wx.checkSession({
		  success () {
			//session_key 未过期，并且在本生命周期一直有效
			console.log("checkSession: 有效");
		  },
		  fail () {
			// session_key 已经失效，需要重新执行登录流程
			console.log("checkSession: 失效,重新登录");
			//need_relogin = true;
			wx.login({
			  success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				console.log("获取code:",res.code);
				//getApp().globalData.code = res.code
				wx.setStorageSync('code', res.code);
				//t_code = res.code;
				//resolve(2);
			  }
			})
		  }
		})

prepare().then(() => {
  game.start()
})
