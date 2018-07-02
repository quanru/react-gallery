import React from 'react'
import classnames from 'classnames'

const renderMedia = (mediaUrl, title) => {
  if (!mediaUrl) {
    return null
  }

  return mediaUrl.includes('.mp4')
    ? (
      <video
        controls
        type='video/mp4'
        src={mediaUrl}
      />
    ) : (
      <img
        src={mediaUrl}
        alt={title}
      />
    )
}
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
        style={this.props.arrange.rotate ? {
          transform: `rotate(${this.props.arrange.rotate}deg)`,
          ...this.props.arrange.pos
        } : this.props.arrange.pos}
        onClick={this.handleClick}
      >
        {
          renderMedia(this.props.data.imageURL, this.props.data.title)
        }
        <figcaption>
          <h2 className='img-title'>{this.props.data.title}</h2>
          <div
            className='img-back'
            onClick={this.handleClick}
          >
            {
              renderMedia(this.props.data.imageURL2, this.props.data.title)
            }
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    )
  }
}
export default ImgFigure
