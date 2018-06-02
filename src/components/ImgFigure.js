import React from 'react'
import classnames from 'classnames'

//图片组件
class ImgFigure extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (this.props.arrange.center) {
      this.props.inverse()
    } else {
      this.props.center()
    }

    e.stopPropagation()
    e.preventDefault()
  }

  render() {
    return (
      <figure
        className={classnames('img-figure', {
          'is-inverse': this.props.arrange.inverse,
          'is-center': this.props.arrange.center
        })}
        style={{
          transform: `rotate(${this.props.arrange.rotate}deg)`,
          ...this.props.arrange.pos
        }}
        onClick={this.handleClick}
      >
        <img
          src={this.props.data.imageURL}
          alt={this.props.data.title}
        />
        <figcaption>
          <h2 className='img-title'>{this.props.data.title}</h2>
          <div
            className='img-back'
            onClick={this.handleClick}
          >
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    )
  }
}
export default ImgFigure
