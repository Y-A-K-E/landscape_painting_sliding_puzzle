import * as PIXI from 'pixi.js'
//import core from '../core'
import core, { sound } from '../core'
import {
  Puzzle,
  Menu,
  Info,
  //Hint,
  //Help,
  Timer
} from '../components'

import {
  Constants,
  swipeListener,
  Functions,
  wxhttp,
} from '../utils'




// 边框宽度为20像素
const BG_BORDER_RATIO = 1.02
const MENU_RATIO = 0.7
const BTN_RATIO = 0.12
const HINT_RATIO = 0.6
const {
  width,
  height
} = core.screen

export default {

  init () {
	  
	  
	var _this = this;
	  
    this.container = new PIXI.Container()

    // 拼图大小是屏幕宽度的 85%
    this.contentWidth = width * 0.85

	if (wx.getLaunchOptionsSync().query.scene !==undefined){
		console.log("有参数222",wx.getLaunchOptionsSync().query.scene)

		var scene =  wx.getLaunchOptionsSync().query.scene;
		
		var t_code = wx.getStorageSync('code') || "";
		
		console.log("获取之前缓存的CODE:");
		console.log(t_code);
		    //如果code空,那么还得触发login一次.
		if (!t_code) {
			wx.login({
			  success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				console.log("获取code:",res.code);
				//getApp().globalData.code = res.code
				wx.setStorageSync('code', res.code);
				t_code = res.code;
				//resolve(2);
			  }
			})
		}
		
		
		//测试session有效期

		
		var iv = wx.getStorageSync('iv') || ""; 
		var rawData = wx.getStorageSync('rawData') || ""; 
		var signature = wx.getStorageSync('signature') || ""; 
		var encryptedData = wx.getStorageSync('encryptedData') || ""; 
		var user_pic = wx.getStorageSync('user_pic') || ""; 
		var user_nick = wx.getStorageSync('user_nick') || ""; 
		
		//iv为空就表示没有登录过.
		if (!iv ){
			const button = wx.createUserInfoButton({
			  type: 'text',
			  text: '授权登录Getce.Cn',
			  style: {
          
          width: 200,
          height: 40,
          left: (wx.getSystemInfoSync().windowWidth - 200)/2 ,
          top: (wx.getSystemInfoSync().windowHeight-40-40)/2,
          lineHeight: 40,
          backgroundColor: '#ff0000',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 16,
          borderRadius: 4
			  }
			})
			//button.style.left = 500;
			button.onTap((res) => {
			  // 此处可以获取到用户信息
			  console.log("成功获取到用户",res);
			  wx.setStorageSync('iv', res.iv);
			  wx.setStorageSync('rawData', res.rawData);
			  wx.setStorageSync('signature', res.signature);
			  wx.setStorageSync('encryptedData', res.encryptedData);
			  wx.setStorageSync('user_pic', res.userInfo.avatarUrl);
			  wx.setStorageSync('user_nick', res.userInfo.nickName);
			  
			  iv = res.iv;
			  rawData = res.rawData;
			  signature = res.signature;
			  encryptedData = res.encryptedData;
			  user_pic = res.userInfo.avatarUrl;
			  user_nick = res.userInfo.nickName;

			  console.log("开始登录...");
				var cc = {
				  'code': t_code,
				  'scene': scene,
				  'iv': iv,
				  'encryptedData': encryptedData,
				}
				_this.postLogin(cc);
			  
			});			
		}else{
			console.log("已经登录过的.");

			var cc = {
			  'code': t_code,
			  'scene': scene,
			  'iv': iv,
			  'encryptedData': encryptedData,
			}
			
			_this.postLogin(cc);

		}

		


	
		
	}else{
		//console.log("无参数222")
    // 画背景图
    this.bg = PIXI.Sprite.from('bg.jpg')
    this.bg.scale.set(width / this.bg.width)
    this.bg.y = height * 0.04
    this.container.addChild(this.bg)
	
	//sound.bgm.start();


    // 画边框
    this.border = PIXI.Sprite.from('border.png')
    this.border.width = width - 20
    this.border.height =  height-20
    this.border.x = 10
    this.border.y = 10
	  console.log("画边框背景-",this.border.width,this.border.height)
    this.container.addChild(this.border)


		

    // 计时器
    this.timer = new Timer()
    this.timer.visible = false


    // 遮罩层
    this.mask = new PIXI.Graphics()
    this.mask.beginFill(0x000000, 0.6)
    this.mask.drawRect(0, 0, width, height)
    this.mask.endFill()
    this.container.addChild(this.mask)

    // 开始菜单
    this.bgMenu = new Menu(btnType => {
      this.newPuzzle(btnType)
    })
    this.bgMenu.scale.set((width * MENU_RATIO) / this.bgMenu.width)
    this.bgMenu.x = (width - this.bgMenu.width) / 2
    this.bgMenu.y = (height - this.bgMenu.height) / 2
    this.container.addChild(this.bgMenu)

    // 游戏时间戳
    this.timeStamp = 0		
	} 


  },

  initWX () {
	// 打开调试
	//wx.setEnableDebug({
	//  enableDebug: false
	//})	  
    wx.showShareMenu()
    wx.onShareAppMessage(() => {
      // 用户点击了“转发”按钮
      return {
        title: '99%的人拼不出来！你敢试试吗？',
        imageUrl: `static/puzzle/${this.puzzleUrl || 'easy/0.jpg'}`,
        query: encodeURI(`puzzleUrl=${this.puzzleUrl || 'easy/0.jpg'}&gameType=${this.gameType || Constants.EASY}`)
      }
    })

    wx.onShow((res = {}) => {
      if (!res.query.puzzleUrl || !res.query.gameType) {
        return
      }

      if (res.scene === 1007 || res.scene === 1008) {
        if (this.puzzle) {
          this.destroyPuzzle()
        }
        const btnType = Number(res.query.gameType)
        this.newPuzzle(btnType, res.query.puzzleUrl)
      }
    })

    const res = wx.getLaunchOptionsSync()

    if (res.query.puzzleUrl && res.query.gameType) {
      const btnType = Number(res.query.gameType)
      this.newPuzzle(btnType, res.query.puzzleUrl)
    }
  },

  newPuzzle (btnType, puzzleUrl) {
    // 画主要的puzzle
    this.gameType = btnType
    let typeUrl
    switch (btnType) {
      case Constants.EASY:
        typeUrl = 'easy'
        break
      case Constants.MIDDLE:
        typeUrl = 'middle'
        break
      case Constants.HARD:
        typeUrl = 'hard'
        break
      default:
        typeUrl = 'easy'
        break
    }
      if (this.puzzle) {
        this.destroyPuzzle()
      }
    this.puzzleUrl = puzzleUrl || `easy/${Functions.getRandomInt(5)}.jpg`
    
    this.puzzle = new Puzzle(this.puzzleUrl, btnType)
    this.info = new Info(this.puzzleUrl)

    this.puzzle.width = width - 20
    this.puzzle.height = height - 40
    this.puzzle.x = (width - this.puzzle.width) / 2
    //this.puzzle.y = (height - this.puzzle.width - this.puzzle.x)/2
	  this.puzzle.y = 20
	  //this.puzzle.scale.set(width / this.bg.width)
    swipeListener(this.puzzle, event => {
      this.puzzle.movePieces(event)
      if (!this.puzzle.gameOn ) {
        this.info.visible = true
        this.info.setText(`恭喜！您用 ${this.timer.getText()} 完成了拼图！全球排名155!`)
		
		this.bgMenu.visible = true
        //this.puzzleHelp.visible = false
        this.timer.visible = false
      }
    })
    this.container.addChildAt(this.puzzle, 3)

    this.info.width = this.contentWidth
    this.info.height = this.contentWidth
    this.info.x = this.puzzle.x
    this.info.y = this.puzzle.y
    this.info.visible = false
    this.container.addChild(this.info)

    this.timeStamp = 0
    this.bgMenu.visible = false
    this.mask.visible = false
  },

  destroyPuzzle () {
    this.container.removeChild(this.puzzle)
    this.container.removeChild(this.info)
    this.puzzle.destroy()
    this.info.destroy()
  },

  isTimeGoing () {
    if (this.puzzle.gameOn) {
      return true
    }
    return false
  },

  listen () {
    this.container.once('added', () => {
      core.translate(this.bg)
    })
  },

  update (dt) {
    if (this.puzzle && this.puzzle.update) {
      this.puzzle.update()
      if (this.isTimeGoing()) {
        // 在后台的时候 elapsedMS 也在计数，所以不能直接相加
        if (core.ticker.elapsedMS <= 500) {
          this.timeStamp += core.ticker.elapsedMS
          this.timer.setTime(this.timeStamp)
        }
      }
    }
  },
  postLogin: function (cc) {
	  console.log("cc:",cc);
    //var pushcodeurl = app.globalData.host + '/v1/login/pushcode.html';

	  let url =  'https://api.getce.cn/v1/login/pushcode.html';

 
    wxhttp.post(url,cc).then((res)=>{
      if (res.data.code == 1) {
      console.log("登录ok");
      wx.showModal({
        title: '提示',
        content: "登录ok",
        success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.restartMiniProgram();
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.restartMiniProgram();
        }
        }
      })
      } else {
      console.log("登录失败");

      
      wx.showModal({
        title: '提示',
        content: "登录失败:"+res.data.msg,
        success (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.restartMiniProgram();
        } else if (res.cancel) {
          console.log('用户点击取消');
          wx.restartMiniProgram();
        }
        }
      })


      //console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
      }    
    });
	  
  }, 		
  start () {
    this.init()
    this.initWX()
    // this.listen()
    core.stage.addChild(this.container)
    core.ticker.add(this.update.bind(this))
  }
}
