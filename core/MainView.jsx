import React, { createElement } from 'react';
import { routeNode } from 'react-router5';

import About from '../components/About';
import Contact from '../components/Contact';
import Page from '../components/Page';
import UserList from '../components/UserList';
import UserView from '../components/UserView';

const componentsMap = {
  'about': About,
  'contact': Contact,
  'home': Page,
  'usersList': UserList,
  'usersView': UserView,
};

function MainView( props ){
  const { route } = props;
  return createElement( componentsMap[route.name], { routeParams: route.params } );
}

export default routeNode('')(MainView);
