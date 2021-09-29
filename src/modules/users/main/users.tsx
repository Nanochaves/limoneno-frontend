import * as React from 'react';
import './users.scss';
import { bindActionCreators } from 'redux';
import { connect, ReactReduxContext } from 'react-redux';
import { Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css';
import { getUsers, setTmpUser } from '../../../actions/dousers';
import { User } from '../../../models/user';
import UserListComponent from '../components/user-list/user-list';
import { Button } from 'antd';
import UserSidebarComponent from '../components/user-sidebar/user-sidebar';

export class UsersComponent extends React.Component {

  // Define the props in component
  public props: any;
  static contextType = ReactReduxContext;

  // Define state
  public state: any = {
    users: []
  };

  public componentDidMount() {
    this.props.getUsers();
  }

  public sidebar(): any {
    if (this.props.tmpUser) {
      return (
        <div className="sidebar">
          <UserSidebarComponent 
            user={this.props.tmpUser}  />
        </div>
      );
    }
  }

  public setTmpUser(user: User): void {
    this.props.setTmpUser(user);
  }

  public newUser(): void {
    this.props.setTmpUser(new User());
  }

  public render() {
    return (
      <div className="users">
        <div className="content">
          <div className="top">
            <Breadcrumb className="breadcum">
              <Breadcrumb.Item>Administración</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/users">Usuarios</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="add">
              <Button type="primary" onClick={this.newUser.bind(this, {})}>
                <Icon type="plus" /> Agregar usuario
              </Button>
            </div>
          </div>
          <div className="table">
            <UserListComponent setUser={this.setTmpUser.bind(this)}></UserListComponent>
          </div>
        </div>
        {this.sidebar()}
      </div>
    );
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
  return {
    users: state.user.list,
    tmpUser: state.user.tmpUser
  }
}
  
function matchDispatchToProps(dispatch: any) {
  return bindActionCreators({
    getUsers,
    setTmpUser
  }, dispatch);
}
  
export default connect(mapStateToProps, matchDispatchToProps)(UsersComponent);