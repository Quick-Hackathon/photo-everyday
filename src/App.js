import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";

class App extends Component {
    render() {
        return <h1>App {JSON.stringify(this.props.config)}</h1>;
    }
}

const mapStateToProps = ({ config }) => ({ config });

export default connect(mapStateToProps)(App);
