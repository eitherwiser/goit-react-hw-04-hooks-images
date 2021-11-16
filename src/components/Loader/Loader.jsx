import React, { Component } from 'react'

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends Component {

  render() {
    return (
      <Loader
        type="ThreeDots"
        color="#3f51b5a4"
        height={60}
        width={160}
        timeout={20000}
      />
    );
  }
}