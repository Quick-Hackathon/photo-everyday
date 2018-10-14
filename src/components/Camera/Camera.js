import React, { Component } from "react";
import "./Camera.scss";
import PropTypes from "prop-types";

class Camera extends Component {
    state = {};

    /**
     * todo deal with errors getting the stream, and show a loader
     * @return {Promise<void>}
     */
    async componentDidMount() {
        this.cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        this.videoElement.srcObject = this.cameraStream;
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

    reset = () => {
        this.setState({ capturedImage: null }, () => {
            this.videoElement.srcObject = this.cameraStream;
        });
    };

    done = () => {
        this.props.handleCapturedImage(this.state.capturedImage);
        this.reset();
    };

    renderPreview() {
        if (this.state.capturedImage) {
            return (
                <img src={this.state.capturedImage} className="Camera__image" />
            );
        }

        return (
            <video
                className="Camera__video"
                autoPlay={true}
                ref={ref => (this.videoElement = ref)}
            />
        );
    }

    renderButtons() {
        if (this.state.capturedImage) {
            return (
                <React.Fragment>
                    <button className="Camera__button" onClick={this.reset}>
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
                {this.renderPreview()}
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
