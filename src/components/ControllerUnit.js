import React from 'react'
import classnames from 'classnames'

class ControllerUnit extends React.Component {
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

    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    return (
      <span
        className={classnames('controller-unit', {
          'is-center': this.props.arrange.center,
          'is-inverse': this.props.arrange.inverse
        })}
        onClick={this.handleClick}
      />
    )
  }
}

export default ControllerUnit
