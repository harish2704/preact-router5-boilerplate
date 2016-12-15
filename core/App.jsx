
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';
import MainView from './MainView';

import Router5, { createRouter, RouteNode, errorCodes, transitionPath, loggerPlugin } from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';
import { RouterProvider } from 'react-router5';

const routes = [
  { name: 'usersList', path: '/users'},
  { name: 'usersView', path: '/users/:id', xxx: 12 },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'home', path: '/' },
];

const router = createRouter( routes )
  .usePlugin( loggerPlugin )
  .usePlugin( browserPlugin({useHash: true }) )
  .usePlugin( listenersPlugin() );

const app = <RouterProvider router={ router }><MainView/></RouterProvider>;

ReactDOM.render( <Nav/>, document.getElementById('main-nav'));

router.start(()=>{
  ReactDOM.render( app, document.getElementById('container'));
})
