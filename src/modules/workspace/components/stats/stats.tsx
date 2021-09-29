import * as React from 'react';
import './stats.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setProject, getUserProjects } from '../../../../actions/doprojects';
import { Project } from '../../../../models/project';
import { Progress, Card } from 'antd';
import Title from 'antd/lib/typography/Title';

export class WorkspaceStatsComponent extends React.Component {

  // Define the props in component
  public props: any;

  public newProject(): void {
    this.props.setProject(new Project());
  }
  // Mount Lifecycle
  public componentDidMount() {
    this.props.getUserProjects();
  }

  public getTotalAsigned(): number {
    if (this.props.list && this.props.list.length > 0) {
      return this.props.list.map((proj:Project) => proj.assignated)
      .reduce((prev: number, next: number) =>{
        return prev + next;
      });
    } else{
      return 0;
    }
  }

  public getTotalFree(): number {
    if (this.props.list && this.props.list.length > 0) {
      return this.props.list.map((proj:Project) => proj.free_pool)
      .reduce((prev: number, next: number) =>{
        return prev + next;
      });
    } else{
      return 0;
    }
  }

  public getTotal(): number {
    return this.getTotalAsigned() + this.getTotalFree();
  }

  public getProgress(): number {
    if (this.props.list && this.props.list.length > 0) {
      let done = this.props.list.map((proj:Project) => proj.assignated_done)
      .reduce((prev: number, next: number) =>{
        return prev + next;
      });
      if (this.getTotalAsigned() !== 0) {
        return Math.floor(done/this.getTotalAsigned());
      } else {
        return Math.floor(done/1);
      }
    } else {
      return 0;
    }
  }

  public getProgressCombined(): number {
    if (this.props.list && this.props.list.length > 0) {
      let done = this.props.list.map((proj:Project) => proj.assignated_done + proj.free_pool_done)
      .reduce((prev: number, next: number) =>{
        return prev + next;
      });
      if (this.getTotalAsigned() !== 0) {
        return Math.floor(done/this.getTotalAsigned());
      } else {
        return Math.floor(done/1*100);
      }
    } else {
      return 0;
    }
  }

  public render() {
    return (
      <div className="workspace__stats">
        <Card size="small" title="Progreso Asignado" className="card">
          <Progress type="circle" percent={this.getProgress()} />
        </Card>
        <Card size="small" title="Cantidad Total Asignada" className="card">
          <Title level={1}>{this.getTotalAsigned()}</Title>
          <div className="text">Datasets</div>
        </Card>
        <Card size="small" title="Cantidad Libre disposición" className="card">
          <Title level={1}>{this.getTotalFree()}</Title>
          <div className="text">Datasets</div>
        </Card>
        <Card size="small" title="Progreso Combinado" className="card">
          <Progress type="circle" percent={this.getProgressCombined()} />
        </Card>
      </div>
    )
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
      list: state.project.user_projects
    }
  }
  
  function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
      setProject,
      getUserProjects
    }, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(WorkspaceStatsComponent));