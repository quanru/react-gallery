import React from 'react';

class ControllerUnit extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if(this.props.arrange.center)
            this.props.inverse();
        else
            this.props.center();
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        var controllerUnitClassName = 'controller-unit';

        if(this.props.arrange.center) {
            controllerUnitClassName += ' is-center';

            if(this.props.arrange.inverse) {
                controllerUnitClassName += ' is-inverse';
            }
        }
        return (
                <span
                    className={controllerUnitClassName}
                    onClick={this.handleClick}
                >
                </span>
            );
    }
}

export default ControllerUnit;