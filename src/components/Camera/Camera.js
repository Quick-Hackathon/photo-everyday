import React, { Component } from "react";
import "./Camera.scss";

class Camera extends Component {
    async componentDidMount() {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        this.videoRef.srcObject = cameraStream;
    }

    render() {
        return (
            <div className="Camera">
                <video
                    className="Camera__video"
                    autoPlay={true}
                    ref={videoRef => (this.videoRef = videoRef)}
                />
            </div>
        );
    }
}

export default Camera;
