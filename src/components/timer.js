import * as PIXI from 'pixi.js'
import {
  Constants
} from '../utils'

const TIMER_RATIO = 0.6

class Info extends PIXI.Container {
  constructor() {
    super()
    this.timer_string = new PIXI.Text('00:00');
  }
  setTime(currentTime) {
    let timeS = currentTime / 1000;
    let minute = Math.floor(timeS / 60)
    if (minute < 10) {
      minute = '0' + minute
    }
    let second = Math.floor(timeS % 60)
    if (second < 10) {
      second = '0' + second
    }
    this.timer_string.text = minute + ':' + second
  }
  getText() {
    return this.timer_string.text
  }
}
export default Info