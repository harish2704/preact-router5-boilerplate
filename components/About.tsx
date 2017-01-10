import { Component, createElement } from 'react';

const langs = [
	'javascript',
	'json',
	'bat',
	'coffee',
	'cpp',
	'csharp',
	'css',
	'dockerfile',
	'fsharp',
	'go',
	'handlebars',
	'html',
	'ini',
	'jade',
	'java',
	'less',
	'lua',
	'markdown',
	'objective-c',
	'php',
	'postiats',
	'powershell',
	'python',
	'r',
	'razor',
	'ruby',
	'scss',
	'sql',
	'swift',
	'vb',
	'xml',
	'yaml'
];

interface ObjectWithStringKeys{
  [key: string]: any
}

function getProp( obj:ObjectWithStringKeys, keys:Array<string>|String, defaultVal?:any ):any{
  keys = Array.isArray( keys )? keys : keys.split('.');
  obj = obj[keys[0]];
  if( obj && keys.length>1 ){
    return getProp( obj, keys.slice(1) );
  }
  return obj === undefined? defaultVal : obj;
}

export default class About extends Component<any, any> {

  constructor(){
    super();
    this.setState({
      code: '',
      ft: 'javascript'
    });
  }

  bindTo( field:string, source?:string ) {
    const self = this;
    return function( newVal ){
      const state = {} as ObjectWithStringKeys;
      state[field] = source? getProp( newVal, source ) : newVal;
      self.setState(state);
    }
  }

  render(){
    const code = this.state.code;
    const options = {
      language: "javascript",
      lineNumbers: true,
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: false,
      theme: "vs-dark",
    };
    const requireConfig = {
      url: '/build/vs/loader.js',
      paths:{
        vs: '/build/vs'
      }
    };
    return(
      <div className="col-xs-12">
        <div className="col-xs-4">
          <h2>About us </h2>
          <i>Selected:</i>b <b>{this.state.ft}</b>
          <select onChange={this.bindTo('ft', 'target.value')}>
            { langs.map(lang=><option value={lang}>{lang}</option>) }
          </select>
          <pre>{this.state.code}</pre>
        </div>
        <div className="col-xs-8">
        </div>
      </div>
      );
  }
}



