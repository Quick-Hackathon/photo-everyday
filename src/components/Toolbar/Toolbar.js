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

    render() {
        return (
            <div className="Toolbar">
                <i
                    className={`Toolbar__settings-button fa fa-${
                        this.props.page === PAGE__MAIN
                            ? "cog"
                            : "caret-square-o-left"
                    }`}
                    onClick={this.toggleSettings}
                />
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
