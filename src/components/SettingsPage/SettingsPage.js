import React, { Component } from "react";
import "./SettingsPage.scss";
import { setSettings } from "../../store/settings";
import connect from "react-redux/es/connect/connect";
import Electron from "../../modules/Electron";
import { defaultSettings } from "../../store/defaultState";
import getSettingsPath from "../../modules/getSettingsPath";
import fse from "fs-extra";

class SettingsPage extends Component {
    saveSettings = settings => {
        const newSettings = {
            ...this.props.settings,
            ...settings,
        };

        fse.writeJson(getSettingsPath(), newSettings, {
            spaces: 2,
        }).catch(error => console.error("Error while saving settings", error));
        this.props.setSettings(newSettings);
    };

    changeSaveDirPath = () => {
        Electron.dialog.showOpenDialog(
            {
                properties: ["openDirectory"],
            },
            filePaths => {
                if (!filePaths || filePaths.length === 0) {
                    // cancelled
                    return;
                }

                this.saveSettings({ saveDirPath: filePaths[0] });
            }
        );
    };

    toggleShowGuide = () => {
        this.saveSettings({
            guidePath: this.props.settings.guidePath
                ? null
                : defaultSettings.guidePath,
        });
    };

    render() {
        return (
            <div className="SettingsPage">
                <h2>Settings</h2>

                <div className="SettingsPage__row">
                    <div className="SettingsPage__label">Save Path:</div>
                    <div className="SettingsPage__value">
                        {this.props.settings.saveDirPath}
                    </div>
                    <button
                        className="SettingsPage__button"
                        onClick={this.changeSaveDirPath}
                    >
                        Change
                    </button>
                </div>

                <div className="SettingsPage__row">
                    <div className="SettingsPage__label">Show guide</div>
                    <div className="SettingsPage__value">
                        {this.props.settings.guidePath ? "Enabled" : "Disabled"}
                    </div>
                    <button
                        className="SettingsPage__button"
                        onClick={this.toggleShowGuide}
                    >
                        {this.props.settings.guidePath ? "Disable" : "Enable"}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ settings }) => ({ settings });
const mapDispatchToProps = dispatch => ({
    setSettings: settings => dispatch(setSettings(settings)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsPage);
