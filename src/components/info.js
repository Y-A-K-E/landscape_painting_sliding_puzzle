import * as PIXI from 'pixi.js'
import {
  Constants
} from '../utils'

const BANNER_RATIO = 0.4

class Info extends PIXI.Container {
  constructor(resourece = 'easy/0.jpg') {
    super()
    this.image = new PIXI.Sprite.from(resourece)
    //this.addChild(this.image);

    this.banner = new PIXI.Graphics();
    this.banner.beginFill(0x000000, 0.1);
    this.banner.drawRect(0, 0, this.image.width, this.image.width * BANNER_RATIO);
    this.banner.endFill();
    this.addChild(this.banner);

    let style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
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
    this.message.y = this.banner.height / 2 - this.message.height / 2
    this.message.x = this.message.y
	console.log(this.message.x,this.message.y,style)
    this.addChild(this.message);
  }

  setText(text = '') {
    this.message.text = text
  }
}
export default Info