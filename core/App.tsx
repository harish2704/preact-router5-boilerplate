import { createElement } from 'react';
import { render } from 'react-dom';
import Nav from '../components/Nav';
import MainView from './MainView';

import createRouter, { loggerPlugin } from 'router5';
const browserPlugin = require( 'router5/plugins/browser' ).default;
const listenersPlugin = require( 'router5/plugins/listeners' ).default;
const { RouterProvider } = require('react-router5');

const routes = [
  { name: 'usersList', path: '/users'},
  { name: 'usersView', path: '/users/:id' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'home', path: '/' },
];

const router = createRouter( routes )
  .usePlugin( loggerPlugin )
  .usePlugin( browserPlugin({useHash: true }) )
  .usePlugin( listenersPlugin() );
window.onclick = function(e){
  var el = e.target as HTMLAnchorElement, state; 
  if( location.host !== el.host ){
    return;
  }
  if( location.pathname === el.pathname ){
    return;
  }
  state = router.matchPath( el.pathname );
  if(!state){
    return;
  }
  router.navigate( state.name, state.params );
  e.preventDefault();
}

const app = <RouterProvider router={ router }><MainView/></RouterProvider>;

render( <Nav/>, document.getElementById('main-nav'));

router.start(()=>{
  render( app, document.getElementById('container'));
})
