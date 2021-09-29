import * as React from 'react';
import './datasets.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect, ReactReduxContext } from 'react-redux';
import { withRouter, Router, Route, Switch } from 'react-router-dom';
import DatasetShowcaseComponent from '../components/showcase/showcase';
import CreateDatasetBarComponent from '../components/create-bar/create-bar';
import DatasetContentComponent from '../components/dataset-content/dataset-content';

export class DatasetsComponent extends React.Component {

  // Define the props in component
  public props: any;
  // Redux context 
  static contextType = ReactReduxContext;

  public newDataset(): void {

  }

  public sidebar(): any {
    if (this.props.tmpDataset) {
      return (
        <div className="sidebar">
          <CreateDatasetBarComponent 
            dataset={this.props.tmpDataset}  />
        </div>
      )
    }
  }

  public render() {
    return (
      <div className="datasets">
        <div className="content">
          <Router history={this.props.history}>
            <Switch>
              <Route exact path={`/datasets/:id`} component={DatasetContentComponent} />
              <Route exact path={``} component={DatasetShowcaseComponent} />
            </Switch>
          </Router>
        </div>
        {this.sidebar()}
      </div>
    )
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
      list: state.dataset.list,
      tmpDataset: state.dataset.tmpDataset
    }
  }
  
  function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
    }, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DatasetsComponent));