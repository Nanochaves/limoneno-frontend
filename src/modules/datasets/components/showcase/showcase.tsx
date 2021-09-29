import * as React from 'react';
import './showcase.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb, Button, Icon, Empty } from 'antd';
import { setDataset, getDatasets } from '../../../../actions/dodatasets';
import { Dataset } from '../../../../models/dataset';
import { DatasetComponent } from '../../shared/dataset/dataset';

export class DatasetShowcaseComponent extends React.Component {

  // Define the props in component
  public props: any;

  public newDataset(): void {
    this.props.setDataset(new Dataset());
  }
  // Mount Lifecycle
  public componentDidMount() {
    this.props.getDatasets();
  }

  public getDatasets(): any {
    if (this.props.list && this.props.list.length > 0) {
      return this.props.list.map( (dataset: Dataset) => {
        return (
          <DatasetComponent dataset={dataset} key={dataset.id} />
        );
      });
    } else {
      return (
        <div className="empty">
          <Empty description={
            <span>
              No hay datasets creados
            </span>
          }/>
        </div>
      );
    }
  }

  public render() {
    return (
      <div className="showcase">
        <div className="top">
          <Breadcrumb className="breadcum">
            <Breadcrumb.Item>Limoneno</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/datasets">Datasets</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="add">
            <Button type="primary" onClick={this.newDataset.bind(this, {})}>
              <Icon type="plus" /> Agregar dataset
            </Button>
          </div>
        </div>
        <div className="content">
          {this.getDatasets()}
        </div>
      </div>
    )
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
      list: state.dataset.list
    }
  }
  
  function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
      setDataset,
      getDatasets
    }, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DatasetShowcaseComponent));