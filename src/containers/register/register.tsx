import React from 'react';
import './register.scss';
import { getAuthentication } from '../../actions/dousers';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class RegisterContainer extends React.Component{
  // Define the props in component
  public props: any;

  public componentDidMount() {
    this.props.getAuthentication();
  }



  public render() {
    return (
      <div className="App">
        register
      </div>
    );
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

export default connect(mapStateToProps, matchDispatchToProps)(RegisterContainer);