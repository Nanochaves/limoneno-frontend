import * as React from 'react';
import './project.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Icon, Progress, Tooltip, Tag, Button } from 'antd';
import { User } from '../../../../models/user';
import { Dataset } from '../../../../models/dataset';

export class ProjectComponent extends React.Component<any> {

  // Define the props in component
  public props: any;

  public showUsers(): any {
    return (
      this.props.project.users.map((user: User) => {
        return (
          <Tooltip placement="top" title={user.name} key={user.id}>
            <div className="user__portrait" >
              <Icon type="user" />
            </div>
          </Tooltip>
        )
      })
    )
  }

  public progress(): number {
    if (this.done() > 0) {
      let divisor = (this.total()) ? this.total() : 1;
      return Math.floor(this.done() / divisor * 100)
    } else {
      return 0;
    } 
  }

  public showDatasets(): any {
    return (
      this.props.project.datasets.map((dataset: Dataset) => {
        return <Tag color="orange" key={dataset.id}>{dataset.name}</Tag>
      })
    )
  }

  public total(): number {
    return this.props.project.assignated + this.props.project.assignated_done
  }

  public done(): number {
    return this.props.project.assignated_done + this.props.project.free_pool_done;
  }

  public render() {
    return (
      <div className="project">
        <div className="project__name">
          <Tooltip placement="top" title={this.props.project.description}>
            {this.props.project.name}
          </Tooltip>
        </div>
        <div className="project__workout">{this.props.project.assignated}</div>
        <div className="project__freepool">{this.props.project.free_pool}</div>
        <div className="project__progress">
          <div className="elements">
            {this.done()}/{this.total()} Completados 
            {(this.progress() >= 100) ? ` - ${this.progress()}%` : ''}
          </div>
          <Progress percent={this.progress()} />
        </div>
        <div className="project__actions">
          <Link to={`/workspace/projects/${this.props.project.id}`} >
            <Button className="space">
              <Icon type="usergroup-add" />Comenzar a trabajar
            </Button>
          </Link>
        </div>
      </div>
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
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ProjectComponent));