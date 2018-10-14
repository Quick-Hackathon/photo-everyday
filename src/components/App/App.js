import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Camera from "../Camera/Camera";
import fse from "fs-extra";
import path from "path";
import { PAGE__SETTINGS } from "../../store/page";
import Toolbar from "../Toolbar/Toolbar";
import { format } from "date-fns/esm";

class App extends Component {
    handleCapturedImage = async dataUri => {
        const base64Data = dataUri.replace(
            /^data:image\/[A-z0-9]+;base64,/,
            ""
        );

        const date = format(Date.now(), "yyyy-MM-dd");

        const saveFilePath = path.join(
            this.props.settings.saveDirPath,
            `${date}.jpg`
        );

        await fse.ensureDir(this.props.settings.saveDirPath);

        const pathExists = await fse.pathExists(saveFilePath);

        if (
            pathExists &&
            !window.confirm(
                "You already took a picture today. Are you sure you want to overwrite it?"
            )
        ) {
            return false;
        }

        await fse.writeFile(saveFilePath, base64Data, "base64");

        console.log(`Photo saved to "${saveFilePath}"`);
        return true;
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
