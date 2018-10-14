import React, { Component } from "react";
import "./Toolbar.scss";
import connect from "react-redux/es/connect/connect";
import { PAGE__MAIN, PAGE__SETTINGS, setPage } from "../../store/page";

class Toolbar extends Component {
    toggleSettings = () => {
        let nextPage;
        if (this.props.page === PAGE__SETTINGS) {
            nextPage = PAGE__MAIN;
        } else {
            nextPage = PAGE__SETTINGS;
        }
        this.props.setPage(nextPage);
    };

    closeApp = () => {
        window.close();
    };

    render() {
        return (
            <div className="Toolbar">
                <div className="Toolbar__left">
                    <button onClick={this.toggleSettings}>
                        {this.props.page === PAGE__MAIN ? "Settings" : "Camera"}
                    </button>
                </div>
                <div className="Toolbar__right">
                    <button onClick={this.closeApp}>Close</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ page }) => ({ page });
const mapDispatchToProps = dispatch => ({
    setPage: page => dispatch(setPage(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);
