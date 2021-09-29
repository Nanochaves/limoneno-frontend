import * as React from 'react';
import './showcase.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb, Button, Icon, Empty } from 'antd';
import { setProject, getProjects } from '../../../../actions/doprojects';
import { Project } from '../../../../models/project';
import ProjectComponent from '../../shared/project/project';

export class ProjectShowcaseComponent extends React.Component {

  // Define the props in component
  public props: any;

  public newProject(): void {
    this.props.setProject(new Project());
  }
  // Mount Lifecycle
  public componentDidMount() {
    this.props.getProjects();
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
              No hay projects creados
            </span>
          }/>
        </div>
      );
    }
  }

  public render() {
    return (
      <div className="projects__showcase">
        <div className="top">
          <Breadcrumb className="breadcum">
            <Breadcrumb.Item>Limoneno</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/projects">Proyectos</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="add">
            <Link to="/projects/create">
              <Button type="primary">
                <Icon type="plus" /> Agregar proyecto
              </Button>
            </Link>
          </div>
        </div>
        <div className="content">
          <div className="project dark">
            <div className="project__name">Nombre</div>
            <div className="project__datasets">Datasets</div>
            <div className="project__users">Usuarios</div>
            <div className="project__progress">Progreso</div>
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
      list: state.project.list
    }
  }

  function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
      setProject,
      getProjects
    }, dispatch);
  }

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ProjectShowcaseComponent));