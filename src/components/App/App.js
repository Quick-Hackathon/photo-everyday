import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Camera from "../Camera/Camera";

class App extends Component {
    handleCapturedImage = base64Image => {
        console.log("handleCapturedImage", base64Image);
    };

    render() {
        return (
            <div className="App">
                <Camera handleCapturedImage={this.handleCapturedImage} />
            </div>
        );
    }
}

const mapStateToProps = ({ config }) => ({ config });

export default connect(mapStateToProps)(App);
