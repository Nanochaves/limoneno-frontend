import React from 'react';
import './login.scss';
import { getAuthentication } from '../../actions/dousers';
import { doLogin } from '../../actions/dousers';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import logo from '../../assets/svg/logo.svg';
import { withRouter } from 'react-router-dom';
import FooterComponent from '../../shared/footer/footer';

class LoginContainer extends React.Component {
  // Define the props in component
  public props: any;

  public state: any = {
    email: '',
    password: '',
    check: false
  };

  public login(): void {
    if (this.validate()) {
      this.props.doLogin(this.state.email, this.state.password, this.props.history);
    } else {
      this.setState({
        check: true
      });
    }
  }

  public setPassword(options: any, event: any): void {
    this.setState({
      password: event.target.value
    })
  }
  
  public setEmail(options: any, event: any): void {
    this.setState({
      email: event.target.value
    })
  }

  public validate(): boolean {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)) return false;
    if (!this.state.password || this.state.password.length === 0) return false;
    return true;
  }

  public errorPassword() {
    if (this.state.check && (!this.state.password 
        || this.state.password.length === 0))
      return (
        <Alert message="Debe ingresar una contraseña valida" type="warning" showIcon />
      );
  }

  public errorEmail() {
    if (this.state.check && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)) {
      return (
        <Alert message="El email ingresado no es valido" type="warning" showIcon />
      );
    }
  }

  public errorAuth() {
    if (this.props.auth_error) {
      return (
        <div className="auth">
          <Alert message="El usuario o contraseña es invalido" type="error" showIcon />
        </div>
      )
    }
  }

  public render() {
    return (
      <div className="App">
        <div className="container">
          <div className="box">
          <div className="logo">
            <img src={logo} alt="Limoneno Logo"/>
          </div>
          {this.errorAuth()}
          <Form>
            <Form.Item>
              {this.errorEmail()}
              <Input prefix={<Icon type="user"/>}
              placeholder="Email"
              type="email"
              onChange={this.setEmail.bind(this, {})}></Input>
            </Form.Item>
            <Form.Item>
              {this.errorPassword()}
              <Input prefix={<Icon type="lock"/>}
                type="password"
                placeholder="Password"
                onChange={this.setPassword.bind(this, {})}></Input>
            </Form.Item>
            <Form.Item className="buttons">
              <Button type="primary" size="large" 
                onClick={this.login.bind(this, {})}
                className="login">Ingresar</Button>
            </Form.Item>
          </Form>
          </div>
        </div>
        <FooterComponent></FooterComponent>
      </div>
    );
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
  return {
    user: state.user.data,
    auth_error: state.user.auth_error
  }
}

function matchDispatchToProps(dispatch: any) {
  return bindActionCreators({
    getAuthentication,
    doLogin
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(LoginContainer));