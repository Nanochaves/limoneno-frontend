import React from "react";
import './user-list.scss';
import { Table, Tag, Button, Icon, Modal } from "antd";
import { User } from "../../../../models/user";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { doDeleteUser } from '../../../../actions/dousers';
const { Column } = Table;
const { confirm } = Modal;

export class UserListComponent extends React.Component<any> {
  // Define the props in component
  public props: any;

  public state: any = {
    list: []
  }

  public adminTag(admin: boolean): any {
    if (admin) {
      return (
        <Tag color="red">Administrador</Tag>
      )
    }
  }

  public editUser(user: User): void {
    this.props.setUser(user);
  }

  public deleteUser(user: User): void {
    let self = this;
    confirm({
      title: 'Eliminación de usuario',
      content: `Desea eliminar el usuario ${user.name}`,
      onOk() {
        self.props.doDeleteUser(user);
      }
    });
  }

  static getDerivedStateFromProps(props: any, state: any) {
    // Return null to indicate no change to state.

    return state;
  }

  public render() {
    return (
        <Table dataSource={this.props.users} className="users__list">
          <Column dataIndex="avathar" key="avathar" render={
            (ele: any, record: User) => (
              <div className="portrait">
                <Icon type="user"></Icon>
              </div>
            )
          }/>
          <Column title="Nombre" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Roles" dataIndex="admin" key="admin" render={
            admin => (
              <span>
              <Tag color="blue">Clasificador</Tag>
              {this.adminTag(admin)}
              </span>
            )
          }/>
          <Column title="Acciones" render={
            (ele: any, record: User) => (
              <span>
              <Button className="edit__button" onClick={this.editUser.bind(this, record)}>
                  <Icon type="edit" /> Editar
              </Button>
              <Button type="danger" onClick={this.deleteUser.bind(this, record)}>
                  <Icon type="trash" /> Eliminar
              </Button>
              </span>
            )
          }/>
      </Table>
    )
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
  return {
    users: state.user.list
  }
}

function matchDispatchToProps(dispatch: any) {
  return bindActionCreators({
    doDeleteUser
  }, dispatch);
}
  
export default connect(mapStateToProps, matchDispatchToProps)(UserListComponent);