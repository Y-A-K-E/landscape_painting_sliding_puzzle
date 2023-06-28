import config from '../config'

const bgm = {
  i: 0,
  queue: [],
  is_play : false,	
  start() {
    const next = () => {
      this.i === 2 ? this.i = 0 : this.i++
      this.queue[this.i].play()
	  this.is_play=true	  
    }

    this.queue = Array.from({length: 3}).map((item, i) => {
      const bgm = wx.createInnerAudioContext()
      bgm.src = `${config.cdn}/static/sounds/bgm.${i + 1}.mp3`
      bgm.autoplay =  false
      bgm.onEnded(next)
      return bgm
    })
	
    wx.onShow(next)
  },
  play(){
	    this.is_play=true
		this.queue[this.i].play();	  
  },
  stop() {
	    this.is_play=false
		this.queue[this.i].pause();
  },
  sound_is_play(){
	  console.log("播放状态,",this.is_play)
	  return this.is_play;
  }
}

export default {
  bgm
}