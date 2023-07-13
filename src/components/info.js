import * as PIXI from 'pixi.js'
import {
  Constants
} from '../utils'

const BANNER_RATIO = 0.4

class Info extends PIXI.Container {
  constructor(resourece = 'easy/0.jpg') {
    super()
    let style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 26,
      fill: "white",
      stroke: '#ff3300',
      strokeThickness: 4,
      dropShadow: true,
      dropShadowColor: "#000000",
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });
    this.message = new PIXI.Text("恭喜！您完成了拼图", style);
    this.message.height = 1
    this.message.width = 100
    this.message.y = this.message.height * 5
    this.message.x = 8
    this.message.scale.set(BANNER_RATIO)
    this.addChild(this.message);
  }

  setText(text = '') {
    this.message.text = text
  }
}
export default Info