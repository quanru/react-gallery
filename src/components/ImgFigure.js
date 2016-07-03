import React from 'react';

//图片组件
class ImgFigure extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if(this.props.arrange.center)
            this.props.inverse();
        else
            this.props.center();
        e.stopPropagation();
        e.preventDefault();
    }
    render() {
        let styleObj = {};

        if(this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        if(this.props.arrange.rotate) {
            (['MozT', 'msT', 'WebkitT', 't']).forEach(function (value) {
                styleObj[value + 'ransform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }
        if(this.props.arrange.center) {
            styleObj.zIndex = 11;
        }
        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.inverse ? ' is-inverse' : '';
        return (
            <figure className = {imgFigureClassName} style = {styleObj} onClick={this.handleClick}>
                <img
                    src = {this.props.data.imageURL}
                    alt = {this.props.data.title}
                    />
                <figcaption>
                    <h2 className = "img-title">{this.props.data.title}</h2>
                    <div
                        className="img-back"
                        onClick={this.handleClick}
                    >
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
            );
    }
}
export default ImgFigure;