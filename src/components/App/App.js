import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Camera from "../Camera/Camera";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Camera />
            </div>
        );
    }
}

const mapStateToProps = ({ config }) => ({ config });

export default connect(mapStateToProps)(App);
