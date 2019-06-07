import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as animationData from '../../assets/animations/empty-state-animation'
import ReactLottie from 'react-lottie'
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};
export default class EmptyState extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                <Lottie options={defaultOptions}
                    height={400}
                    width={400}
                    isStopped={this.props.isStopped}
                    isPaused={this.props.isPaused} />
            </div>
        )
    }
}
