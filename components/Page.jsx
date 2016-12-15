import React, { Component } from 'react';
const tmpl = {
  __html: require("raw-loader!./Page.html")
};

export default class Page extends Component{

  render(){
    return (
      <div dangerouslySetInnerHTML={tmpl}></div>
    );
  }
}
