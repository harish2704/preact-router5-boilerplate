import { Component, createElement } from 'react';
const tmpl = {
  __html: require("raw-loader!./Nav.html")
};



class Nav extends Component< {}, {} > {

  render() {
    return (
      <div className="container" dangerouslySetInnerHTML={tmpl} ></div>
    );
  }
}
export default Nav;

