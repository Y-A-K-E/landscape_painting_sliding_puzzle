export default async function () {
  // 单图片示例
  // 添加缓存
  // PIXI.Texture.addToCache(await loadTexture('static/textures/misc.png'), 'misc.png')
  // 使用
  // PIXI.Sprite.fromFrame('misc.png')
  // require('../../dist/static/textures/misc.json') 可以删掉项目根目录下的static文件夹
  await new Promise(async resolve => {
    new PIXI.Spritesheet(
      await loadBaseTexture('static/textures/misc-0.png'),
      require('../../dist/static/textures/misc-0.json')
    ).parse(resolve)
  })

  PIXI.BaseTexture.addToCache(await loadBaseTexture('static/textures/border.png'), 'border.png')
  await new Promise(async resolve => {
    new PIXI.Spritesheet(
      await loadBaseTexture('static/textures/misc-1.jpg'),
      require('../../dist/static/textures/misc-1.json')
    ).parse(resolve)
  })

  await new Promise(async resolve => {
    new PIXI.Spritesheet(
      await loadBaseTexture('static/textures/misc-2.jpg'),
      require('../../dist/static/textures/misc-2.json')
    ).parse(resolve)
  })
  await new Promise(async resolve => {
    new PIXI.Spritesheet(
      await loadBaseTexture('static/textures/misc-3.jpg'),
      require('../../dist/static/textures/misc-3.json')
    ).parse(resolve)
  })
  await new Promise(async resolve => {
    new PIXI.Spritesheet(
      await loadBaseTexture('static/textures/misc-4.jpg'),
      require('../../dist/static/textures/misc-4.json')
    ).parse(resolve)
  })
}

function loadTexture(url) {
  return new Promise(resolve => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(PIXI.Texture.from(img))
  })
}

function loadBaseTexture(url) {
  return new Promise(resolve => {
    const img = wx.createImage()
    img.src = url
    img.onload = () => resolve(new PIXI.BaseTexture(img))
  })
}