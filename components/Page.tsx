import { Component, createElement } from 'react';
const tmpl = {
  __html: require("raw-loader!./Page.html")
};

export default class Page extends Component<any, {}>{
  render(){
    return (
      <div dangerouslySetInnerHTML={tmpl}></div>
    );
  }
}
