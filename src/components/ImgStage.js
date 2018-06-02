import 'normalize.css/normalize.css'
import 'styles/App.scss'
import imageDatas from '../data/imageData.json'
import Utils from '../utils'
import React from 'react'
import ReactDOM from 'react-dom'
import ImgFigure from './ImgFigure'
import ControllerUnit from './ControllerUnit'

let imageUrls = Utils.getImageUrl(imageDatas)

//图片舞台组件
class ImgStage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imgsArrangeArr: [
        //图片位置状态数组
      ]
    }
    this.Constant = {
      //图片位置常数
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    }
  }

  inverse(index) {
    return () => {
      var imgsArrangeArr = this.state.imgsArrangeArr
      imgsArrangeArr[index].inverse = !imgsArrangeArr[index].inverse
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      })
    }
  }

  center(index) {
    return () => {
      this.initImgPos(index)
    }
  }

  //初始化图片位置
  initImgPos(center) {
    let imgsArrangeArr = this.state.imgsArrangeArr
    let isInit = (center === undefined)
    let centerIndex = isInit
        ? Math.floor(Math.random() * imgsArrangeArr.length) //中心位置图片随机选取
        : center
    let {
      hPosRange,
      vPosRange
    } = this.Constant
    let hPosRangeLeftSecX = hPosRange.leftSecX
    let hPosRangeRightSecX = hPosRange.rightSecX
    let hPosRangeY = hPosRange.y
    let vPosRangeTopY = vPosRange.topY
    let vPosRangeX = vPosRange.x

    //取出居中图片，并使其居中
    let imgsArrangeArrCenterArr = imgsArrangeArr.splice(centerIndex, 1)
    let {
      width: stageW,
      height: stageH
    } = this.getDomSize(ReactDOM.findDOMNode(this.refs.stage))
    let {
      width: imgW,
      height: imgH
    } = this.getDomSize(ReactDOM.findDOMNode(this.refs[`imgFigure${centerIndex}`]))

    imgsArrangeArrCenterArr[0] = {
      pos: {
        left: stageW / 2 - imgW / 2,
        top: stageH / 2 - imgH / 2
      },
      rotate: 0,
      center: true
    }

    //顶部正中位置图片
    let imgsArrangeTopArr = [],
      topImgNum = Math.floor(Math.random() * 2),
      topImgSpliceIndex = Math.floor(Math.random() * imgsArrangeArr.length)

    //取出放置在顶部的图片
    topImgSpliceIndex = Math.ceil(
      Math.random() * (imgsArrangeArr.length - topImgNum)
    )
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum)

    //布局位于顶部的图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: Utils.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: Utils.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: Utils.getRangeRandom(-30, 30),
        center: false
      }
    })

    //布局两侧的图片
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX
      } else {
        hPosRangeLORX = hPosRangeRightSecX
      }
      imgsArrangeArr[i] = {
        pos: {
          top: Utils.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: Utils.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: Utils.getRangeRandom(-30, 30),
        center: false
      }
    }

    //插入顶部图片位置状态
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
    }

    //插入中间图片位置状态
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeArrCenterArr[0])

    //更新状态
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })
  }

  getDomSize (dom) {
    const {
      scrollWidth: width,
      scrollHeight: height
    } = dom

    return {
      width,
      height
    }
  }

  componentDidMount() {
    let {
      width: stageW,
      height: stageH
    } = this.getDomSize(ReactDOM.findDOMNode(this.refs.stage))
    let halfStageW = stageW / 2
    let halfStageH = stageH / 2

    let {
      width: imgW,
      height: imgH
    } = this.getDomSize(ReactDOM.findDOMNode(this.refs.imgFigure0))
    let halfImgW = imgW / 2
    let halfImgH = imgH / 2

    //图片水平方向范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW
    this.Constant.hPosRange.y[0] = -halfImgH
    this.Constant.hPosRange.y[1] = stageH - halfImgH
    //图片竖直方向范围
    this.Constant.vPosRange.topY[0] = -halfImgH
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3
    this.Constant.vPosRange.x[0] = halfStageW - imgW
    this.Constant.vPosRange.x[1] = halfStageW

    //初始化图片位置
    this.initImgPos()
  }

  render() {
    let controllerUnits = [],
      ImgFigures = []

    imageUrls.forEach((value, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          inverse: false,
          center: false
        }
      }
      ImgFigures.push(
        <ImgFigure
          key={index}
          data={value}
          ref={'imgFigure' + index}
          arrange={this.state.imgsArrangeArr[index]}
          center={this.center(index)}
          inverse={this.inverse(index)}
        />
      )
      controllerUnits.push(
        <ControllerUnit
          key={index}
          arrange={this.state.imgsArrangeArr[index]}
          center={this.center(index)}
          inverse={this.inverse(index)}
        />
      )
    })

    return (
      <section
        className='stage'
        ref='stage'
      >
        <section className='img-sec'>{ImgFigures}</section>
        <nav className='controller-nav'>{controllerUnits}</nav>
      </section>
    )
  }
}

ImgStage.defaultProps = {}

export default ImgStage
