import React from 'react';
import './App.scss';
import logo from '../../assets/svg/logo.svg';
import { getAuthentication } from '../../actions/dousers';
import { bindActionCreators } from 'redux';
import { connect, ReactReduxContext } from 'react-redux';
import { Router, withRouter, Switch, Route } from 'react-router-dom';
import HeaderComponent from '../../shared/header/header';
import FooterComponent from '../../shared/footer/footer';
import UsersComponent from '../../modules/users/main/users';
import DashboardComponent from '../../modules/dashboard/main/dashboard';
import ProfileComponent from '../../modules/profile/main/profile';
import ProjectsComponent from '../../modules/projects/main/projects';
import DatasetsComponent from '../../modules/datasets/main/datasets';
import WorkspaceComponent from '../../modules/workspace/main/workspace';

class App extends React.Component{
  // Define the props in component
  public props: any;
  static contextType = ReactReduxContext;

  public state: any = {
    user: null
  };

  public componentDidMount() {
    this.props.getAuthentication(this.props.history);
  }

  public render() {
    if (this.props.user) {  
      return (
        <div className="app">
          <HeaderComponent></HeaderComponent>
          <div className="app__container">
            <Router history={this.props.history}>
              <Switch>
                <Route exact path={`/`} component={WorkspaceComponent} />
                <Route path={`/users`} component={UsersComponent} />
                <Route path={`/profile`} component={ProfileComponent} />
                <Route path={`/projects`} component={ProjectsComponent} />
                <Route path={`/datasets`} component={DatasetsComponent} />
                <Route path={`/dashboard`} component={DashboardComponent} />
                <Route path={`/workspace`} component={WorkspaceComponent} />
              </Switch>
            </Router>
          </div>
          <FooterComponent></FooterComponent>
        </div>
      );
    } else {
      return (
        <div className="app">
          <div className="container">
            <div className="splash">
              <img src={logo} alt="Limoneno logo"/>
            </div>
          </div>
        </div>
      );
    }
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
    getAuthentication
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(App));