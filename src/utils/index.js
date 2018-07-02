var utils = {}

//拼凑图片URL
utils.getImageUrl = function(imageDatasArr) {
  for (let i = 0, length1 = imageDatasArr.length; i < length1; i++) {
    let singleImageData = imageDatasArr[i]
    singleImageData.imageURL = singleImageData.fileName ? require('../images/' + singleImageData.fileName) : ''
    singleImageData.imageURL2 = singleImageData.fileName2 ? require('../images/' + singleImageData.fileName2) : ''
    imageDatasArr[i] = singleImageData
  }

  return imageDatasArr
}

//随机获取指定范围的值
utils.getRangeRandom = function(low, high) {
  return Math.ceil(Math.random() * (high - low) + low)
}

export default utils
