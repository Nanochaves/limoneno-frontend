import * as React from 'react';
import './showcase.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb, Empty } from 'antd';
import { setProject, getUserProjects } from '../../../../actions/doprojects';
import { Project } from '../../../../models/project';
import { ProjectComponent } from '../../shared/project/project';
import WorkspaceStatsComponent from '../stats/stats';
import { Typography } from 'antd';

export class ProjectShowcaseComponent extends React.Component {

  // Define the props in component
  public props: any;

  public newProject(): void {
    this.props.setProject(new Project());
  }
  // Mount Lifecycle
  public componentDidMount() {
    this.props.getUserProjects();
  }

  public getProjects(): any {
    if (this.props.list && this.props.list.length > 0) {
      return this.props.list.map( (project: Project) => {
        return (
          <ProjectComponent project={project} key={project.id} />
        );
      });
    } else {
      return (
        <div className="empty">
          <Empty description={
            <span>
              No hay proyectos creados
            </span>
          }/>
        </div>
      );
    }
  }

  public render() {
    return (
      <div className="workspace__showcase">
        <div className="top">
          <Breadcrumb className="breadcum">
            <Breadcrumb.Item>Limoneno</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/workspace">Espacio de trabajo</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <WorkspaceStatsComponent></WorkspaceStatsComponent>
        <div className="title">
          <Typography.Title level={4}>Mis proyectos</Typography.Title>
        </div>
        <div className="content">
          <div className="project dark">
            <div className="project__name">Nombre proyecto</div>
            <div className="project__datasets">Carga asignada</div>
            <div className="project__users">Cantidad libre</div>
            <div className="project__progress">Progreso completado</div>
            <div className="project__actions">Acciones</div>
          </div>
          {this.getProjects()}
        </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ProjectShowcaseComponent));