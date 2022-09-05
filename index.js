const fs = require('fs')
const images = require('images')
const TextToSVG = require('text-to-svg')
const svg2png = require('svg2png')
const Promise = require('bluebird')

Promise.promisifyAll(fs)

const textToSVG = TextToSVG.loadSync()

const sourceImg = images('./bg.png')
const sWidth = sourceImg.width()

const generateImg = async i => {
  const svg1 = textToSVG.getSVG(i + '', {
    x: 0,
    y: 0,
    fontSize: 86,
    anchor: 'top',
  })

  const targetImg1Path = './bg2.png'
  const buffer1 = await svg2png(svg1)

  await fs.writeFileAsync(targetImg1Path, buffer1)

  const target1Img = images(targetImg1Path)
  const t1Width = target1Img.width()
  const offsetX1 = (sWidth - t1Width) / 2
  const offsetY1 = 32

  images(sourceImg).draw(target1Img, offsetX1, offsetY1).save(`./dist/${i}.png`, { quality: 90 })
}

;(async () => {
  for (let i = 1; i < 101; i++) {
    await generateImg(i)
  }
})()
