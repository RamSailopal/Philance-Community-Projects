import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as animationData from '../../assets/animations/empty-state-animation'
import Lottie from 'react-lottie'
import {
    container,
    cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";
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
            <div style={{ ...container }}>
                <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                    <Lottie options={defaultOptions}
                        isStopped={this.props.isStopped}
                        width={400}
                        height={400}
                        isPaused={this.props.isPaused} />
                </div>
            </div>
        )
    }
}
