import React from 'react';
import { Link } from 'react-router5';

function createUser( arr ){
  return { id: arr[0], name: arr[1] };
}

const users = [
  [1, 'hari'],
  [2, 'Unni'],
  [3, 'Bob'],
  [4, 'Ram'],
  [5, 'Jake'],
].map( createUser );

function getRow( user ){
  return(
    <div className="row">
      <Link routeName="usersView" routeParams={{id: user.id}} routeOptions={{reload: true}}>
        <b>{user.id}</b>:
        <i>{user.name}</i>
      </Link>
    </div>
  );
}

export default class UserList{

  render(){
    return (
      <div className="col-xs-12">
        { users.map(getRow)}
      </div>
    );
  }
}
