import * as React from 'react';
import './workspace.scss';
import { bindActionCreators } from 'redux';
import { connect, ReactReduxContext } from 'react-redux';
import { withRouter, Router, Switch, Route } from 'react-router-dom';
import ProjectShowcaseComponent from '../components/showcase/showcase';
import ProjectTagComponent from '../components/project-content/project-tag';

export class WorkspaceComponent extends React.Component {

  // Define the props in component
  public props: any;
  // Redux context 
  static contextType = ReactReduxContext;

  public render() {
    return (
      <div className="workspace">
        <div className="content">
          <Router history={this.props.history}>
            <Switch>
              <Route exact path={`/workspace/projects/:id`} component={ProjectTagComponent} />
              <Route exact path={``} component={ProjectShowcaseComponent} />
            </Switch>
          </Router>
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
    }, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(WorkspaceComponent));