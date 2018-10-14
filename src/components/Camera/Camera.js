import React, { Component } from "react";
import "./Camera.scss";
import PropTypes from "prop-types";
import { classes } from "../../modules/classes";

class Camera extends Component {
    state = {
        capturedImage: null,
        cameraStream: null,
        error: null
    };

    /**
     * @return {Promise<void>}
     */
    async componentDidMount() {
        try {
            const cameraStream = await navigator.mediaDevices.getUserMedia({
                video: true
            });

            this.setState({ cameraStream }, () => {
                this.videoElement.srcObject = cameraStream;
            });
        } catch (error) {
            this.setState({
                error: `Couldn't access camera. Please make sure that no other application use it, then restart.`
            });
        }
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

    done = async () => {
        const processed = await Promise.resolve(
            this.props.handleCapturedImage(this.state.capturedImage)
        );

        if (processed) {
            this.setState({ capturedImage: null }, () => {
                this.videoElement.srcObject = this.state.cameraStream;
            });
        }
    };

    renderButtons() {
        if (this.state.error) {
            return null;
        }

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

    shouldShowImage = () =>
        !this.state.error && Boolean(this.state.capturedImage);

    shouldShowVideo = () =>
        !this.state.error &&
        this.state.cameraStream &&
        !this.state.capturedImage;

    shouldShowText = () => this.state.error || !this.state.cameraStream;

    render() {
        return (
            <div className="Camera">
                <img
                    src={this.state.capturedImage}
                    className={classes([
                        "Camera__image",
                        [this.shouldShowImage(), "Camera__image--show"]
                    ])}
                    alt=""
                />
                <video
                    className={classes([
                        "Camera__video",
                        [this.shouldShowVideo(), "Camera__video--show"]
                    ])}
                    autoPlay={true}
                    ref={ref => (this.videoElement = ref)}
                />
                <div
                    className={classes([
                        "Camera__text",
                        [this.shouldShowText(), "Camera__text--show"],
                        [this.state.error, "Camera__text--error"]
                    ])}
                >
                    {this.state.error || "Loading Camera..."}
                </div>
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
