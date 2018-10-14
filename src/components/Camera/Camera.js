import React, { Component } from "react";
import "./Camera.scss";
import PropTypes from "prop-types";

class Camera extends Component {
    state = {
        capturedImage: null,
        cameraStream: null
    };

    /**
     * @return {Promise<void>}
     */
    async componentDidMount() {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        this.setState({ cameraStream }, () => {
            this.videoElement.srcObject = cameraStream;
        });
    }

    capture = () => {
        const w = this.videoElement.videoWidth;
        const h = this.videoElement.videoHeight;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this.videoElement, 0, 0, w, h);

        this.setState({
            capturedImage: canvas.toDataURL("image/jpeg")
        });
    };

    retake = () => this.setState({ capturedImage: null });

    done = () => {
        this.props.handleCapturedImage(this.state.capturedImage);
        this.setState({ capturedImage: null }, () => {
            this.videoElement.srcObject = this.state.cameraStream;
        });
    };

    renderButtons() {
        if (this.state.capturedImage) {
            return (
                <React.Fragment>
                    <button className="Camera__button" onClick={this.retake}>
                        Retake
                    </button>
                    <button className="Camera__button" onClick={this.done}>
                        Done
                    </button>
                </React.Fragment>
            );
        }

        return (
            <button className="Camera__button" onClick={this.capture}>
                Capture
            </button>
        );
    }

    render() {
        return (
            <div className="Camera">
                <img
                    src={this.state.capturedImage}
                    className={`Camera__image ${
                        this.state.capturedImage ? "Camera__image--show" : ""
                    }`}
                    alt=""
                />
                <video
                    className={`Camera__video ${
                        this.state.cameraStream && !this.state.capturedImage
                            ? "Camera__video--show"
                            : ""
                    }`}
                    autoPlay={true}
                    ref={ref => (this.videoElement = ref)}
                />
                <div
                    className={`Camera__loading ${
                        !this.state.cameraStream ? "Camera__loading--show" : ""
                    }`}
                >
                    Loading Camera...
                </div>
                ;
                <div className="Camera__button-wrapper">
                    {this.renderButtons()}
                </div>
            </div>
        );
    }
}

Camera.propTypes = {
    handleCapturedImage: PropTypes.func.isRequired
};

export default Camera;
