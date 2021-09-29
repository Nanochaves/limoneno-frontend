import * as React from 'react';
import './dashboard.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class DashboardComponent extends React.Component {

    // Define the props in component
    public props: any;

    public render() {
        return (
            <div className="dashboard">
                dashboard
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
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DashboardComponent));