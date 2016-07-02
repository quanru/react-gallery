require('normalize.css/normalize.css');
require('styles/App.scss');
let imageDatas = require('../data/imageData.json');
import React from 'react';
import ReactDOM from 'react-dom';

//拼凑图片URL
imageDatas = (function getImageUrl (imageDatasArr) {
    for(let i = 0, length1 = imageDatasArr.length; i < length1; i++){
        let singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);

//随机获取指定范围的值
function getRangeRandom (low, high) {
    return Math.ceil(Math.random()*(high - low) + low);
}

//图片组件
class ImgFigure extends React.Component {
    render() {
        let styleObj = {};

        if(this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        return (
            <figure className = "img-figure" style = {styleObj}>
                <img
                    src = {this.props.data.imageURL}
                    alt = {this.props.data.title}
                    />
                <figcaption>
                    <h2 className = "img-title"></h2>
                </figcaption>
            </figure>
            );
    }
}

//图片舞台组件
class ImgStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        imgsArrangeArr: [//图片位置状态数组
        ]
    };
    this.Constant = {//图片位置常数
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: {
                leftSecX: [0,0],
                rightSecX: [0,0],
                y: [0,0]
            },
            vPosRange: {
                x: [0,0],
                topY: [0,0]
            }
      };
  }
  //初始化图片位置
  initImgPos() {
    let imgsArrangeArr = this.state.imgsArrangeArr,
            centerIndex = Math.floor(Math.random()*imgsArrangeArr.length),//中心位置图片随机选取
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            //取出居中图片，并使其居中
            imgsArrangeArrCenterArr = imgsArrangeArr.splice(centerIndex, 1);
            imgsArrangeArrCenterArr[0].pos = centerPos;

            //顶部正中位置图片
            let imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random()*2),
            topImgSpliceIndex = Math.floor(Math.random()*imgsArrangeArr.length);

            //取出放置在顶部的图片
            topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));
            imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
            
            //布局位于顶部的图片
            imgsArrangeTopArr.forEach((value, index)=> {
                imgsArrangeTopArr[index].pos = {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                }
            });

            //布局两侧的图片
            for( let i = 0, j = imgsArrangeArr.length, k = j/2; i < j; i++) {
                let hPosRangeLORX = null;
                if(i < k) {
                    hPosRangeLORX = hPosRangeLeftSecX;
                } else {
                    hPosRangeLORX = hPosRangeRightSecX;
                }
                imgsArrangeArr[i].pos = {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                }
            }

            //插入顶部图片位置状态
            if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
                imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
            }

            //插入中间图片位置状态
            imgsArrangeArr.splice(centerIndex, 0, imgsArrangeArrCenterArr[0]);

            //更新状态
            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
  }
  componentDidMount() {
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

    //中心图片位置
    this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
    }

    //图片水平方向范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    //图片竖直方向范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    
    //初始化图片位置
    this.initImgPos();
  }
  render() {
    let controllerUnits = [],
            ImgFigures = [];

    imageDatas.forEach(function (value, index) {
        if(!this.state.imgsArrangeArr[index]) {
            this.state.imgsArrangeArr[index] = {
                pos: {
                    left: 0,
                    top: 0
                }
            }
        }
        ImgFigures.push(<ImgFigure key={index} data = {value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} />);
    }.bind(this));
    return (
        <section className = "stage" ref="stage">
            <section className = "img-sec">
                {ImgFigures}
            </section>
            <nav className = "controller-nav">
                {controllerUnits}
            </nav>
        </section>
    );
  }
}

ImgStage.defaultProps = {
};

export default ImgStage;
