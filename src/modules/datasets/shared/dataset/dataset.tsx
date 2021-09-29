import * as React from 'react';
import './dataset.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Icon } from 'antd';

export class DatasetComponent extends React.Component<any> {

  // Define the props in component
  public props: any;

  public render() {
    return (
      <Link to={`/datasets/${this.props.dataset.id}`}>
      <div className="dataset">
        <div className="icon">
          <Icon type="folder" />
        </div>
        <div className="title">{this.props.dataset.name}</div>
      </div>
      </Link>
    )
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
    }
  }
  
  function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
    }, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DatasetComponent));