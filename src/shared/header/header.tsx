import React from 'react';
import './header.scss';
import logo from '../../assets/svg/logo.svg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doLogout } from '../../actions/dousers';
import { withRouter, Link } from 'react-router-dom';
import { Dropdown, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import UserService from '../../services/users/users.service';

export class HeaderComponent extends React.Component {
  // Define the props in component
  public props: any;

  public logout(): void {
    this.props.doLogout(this.props.history);
  }

  public goToUsers(): void {
    this.props.history.push("/users");
  }

  public showUsers(): any {
    let user = UserService.getInstance().getUser();
    if (user && user.admin) {
      return (
        <Menu.Item onClick={this.goToUsers.bind(this, {})}>
          <Link to="/users">
            <Icon type="team" /> Usuarios
          </Link>
        </Menu.Item>
      );
    }
  }

  public menu(): any {
    return (
      <Menu>
        <Menu.Item>
          <Link to="/profile">
            <Icon type="user" />Perfil
          </Link>
        </Menu.Item>
        {this.showUsers()}
        <Menu.Divider />
        <Menu.Item>
          <div className="logout" onClick={this.logout.bind(this, {})}>
            <Icon type="logout" /> Cerrar sesión
          </div>
        </Menu.Item>
      </Menu>
    );
  }

  public showProjects(): any {
    let user = UserService.getInstance().getUser();
    if (user && user.admin) {
      return (
        <Link to="/projects"><div className="item">Proyectos</div></Link>
      );
    }
  }

  public showDatasets(): any {
    let user = UserService.getInstance().getUser();
    if (user && user.admin) {
      return (
        <Link to="/datasets"><div className="item">Sets de Documentos</div></Link>
      );
    }
  }

  public goToHelp(): void {
    const win = window.open('https://help.limoneno.lemontech.com', '_blank');
    if (win) {
      win.focus();
    }
  }

  public render() {
    return (
      <div className="header">
          <div className="logo">
            <img src={logo} alt="Limoneno logo"/>
          </div>
          <div className="sections">
            {/* <Link to="/dashboard"><div className="item">Dashboard</div></Link> */}
            <Link to="/workspace"><div className="item">Espacio de trabajo</div></Link>
            {this.showProjects()}
            {this.showDatasets()}
          </div>
          <div className="help" onClick={this.goToHelp.bind(this)}>Centro de ayuda</div>
          <div className="menu">
            <Dropdown overlay={this.menu()}>
              <div className="h2">
                <Icon className="icon" type="user" />
                <Icon className="icon" type="down" />
              </div>
            </Dropdown>
          </div>
      </div>
    )
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
  return {
    user: state.user.data
  }
}

function matchDispatchToProps(dispatch: any) {
  return bindActionCreators({
    doLogout
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(HeaderComponent));