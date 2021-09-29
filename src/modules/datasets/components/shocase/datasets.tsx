import * as React from 'react';
import './datasets.scss';
import './node_modules/antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Button, Icon } from 'antd';

export class DatasetsComponent extends React.Component {

  // Define the props in component
  public props: any;

  public newDataset(): void {

  }

  public sidebar(): any {
    
  }

  public render() {
    return (
      <div className="users">
        <div className="content">
          <div className="top">
            <Breadcrumb className="breadcum">
              <Breadcrumb.Item>Administración</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/users">Datasets</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="add">
              <Button type="primary" onClick={this.newDataset.bind(this, {})}>
                <Icon type="plus" /> Agregar dataset
              </Button>
            </div>
          </div>
        </div>
        {this.sidebar()}
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
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DatasetsComponent));