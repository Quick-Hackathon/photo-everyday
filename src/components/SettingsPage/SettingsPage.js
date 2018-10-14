import React, { Component } from "react";
import "./SettingsPage.scss";
import { setSaveDirPath } from "../../store/settings";
import connect from "react-redux/es/connect/connect";
import Electron from "../../modules/Electron";

class SettingsPage extends Component {
    changeSaveDirPath = () => {
        Electron.dialog.showOpenDialog(
            {
                properties: ["openDirectory"]
            },
            filePaths => {
                if (!filePaths || filePaths.length === 0) {
                    // cancelled
                    return;
                }

                this.props.setSaveDirPath(filePaths[0]);
            }
        );
    };

    render() {
        return (
            <div className="SettingsPage">
                <h2>Settings</h2>

                <div className="SettingsPage__row">
                    <div className="SettingsPage__value">
                        {this.props.settings.saveDirPath}
                    </div>
                    <button
                        className="SettingsPage__value"
                        onClick={this.changeSaveDirPath}
                    >
                        Change
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ settings }) => ({ settings });
const mapDispatchToProps = dispatch => ({
    setSaveDirPath: dirPath => dispatch(setSaveDirPath(dirPath))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsPage);
