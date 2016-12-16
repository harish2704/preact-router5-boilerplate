import React, { Component } from 'react';
const tmpl = {
  __html: require("raw-loader!./Nav.html")
};

export default class Nav extends Component {

  render() {
    return (
      <div className="container" dangerouslySetInnerHTML={tmpl}></div>
    )
  }
}

