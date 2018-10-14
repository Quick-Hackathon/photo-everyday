import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Camera from "../Camera/Camera";
import fse from "fs-extra";
import path from "path";
import { PAGE__SETTINGS } from "../../store/page";
import Toolbar from "../Toolbar/Toolbar";

class App extends Component {
    handleCapturedImage = async dataUri => {
        const base64Data = dataUri.replace(
            /^data:image\/[A-z0-9]+;base64,/,
            ""
        );

        const saveFilePath = path.join(
            this.props.settings.saveDirPath,
            `${Date.now()}.jpg`
        );

        await fse.ensureDir(this.props.settings.saveDirPath);
        await fse.writeFile(saveFilePath, base64Data, "base64");

        console.log(`Photo saved to "${saveFilePath}"`);
    };

    renderPage() {
        if (this.props.page === PAGE__SETTINGS) {
            return <div>Settings</div>;
        } else {
            return <Camera handleCapturedImage={this.handleCapturedImage} />;
        }
    }

    render() {
        return (
            <div className="App">
                <Toolbar />
                {this.renderPage()}
            </div>
        );
    }
}

const mapStateToProps = ({ settings }) => ({ settings });

export default connect(mapStateToProps)(App);
