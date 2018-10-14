import React, { Component } from "react";
import "./Toolbar.scss";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { PAGE__SETTINGS, setPage } from "../../store/page";

class Toolbar extends Component {
    render() {
        return (
            <div className="Toolbar">
                <div className="Toolbar__left">
                    <button onClick={() => this.props.setPage(PAGE__SETTINGS)}>
                        Settings
                    </button>
                </div>
                <div className="Toolbar__right">
                    <button onClick={() => this.props.setPage(PAGE__SETTINGS)}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}

Toolbar.propTypes = {
    page: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired
};

const mapStateToProps = ({ page }) => ({ page });
const mapDispatchToProps = dispatch => ({
    setPage: page => dispatch(setPage(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);
