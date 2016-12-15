import React, { Component } from 'react';


export default class UserList{

  render(){
    return (
      <h1>UserId: { this.props.routeParams.id }</h1>
    );
  }
}
