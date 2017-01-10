import { Component, createElement, Props } from 'react';

interface UserViewProps extends Props<{}>{
  routeParams: UserViewRouteParam
}

interface UserViewRouteParam{
  id: number
}

export default class UserList extends Component<UserViewProps,{}> {

  render(){
    return (
      <h1>UserId: { this.props.routeParams.id }</h1>
    );
  }
}
