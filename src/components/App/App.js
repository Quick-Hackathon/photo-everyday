import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Camera from "../Camera/Camera";
import fse from "fs-extra";
import path from "path";
import getUserPath from "../../modules/getUserPath";

class App extends Component {
    handleCapturedImage = async dataUri => {
        const base64Data = dataUri.replace(
            /^data:image\/[A-z0-9]+;base64,/,
            ""
        );

        const saveDirPath = path.join(getUserPath(), "photos");
        const saveFilePath = path.join(saveDirPath, `${Date.now()}.jpg`);

        await fse.ensureDir(saveDirPath);
        await fse.writeFile(saveFilePath, base64Data, "base64");

        console.log(`Photo saved to "${saveFilePath}"`);
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
