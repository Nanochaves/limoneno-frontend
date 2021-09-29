import * as React from 'react';
import './dataset-content.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb, Button, Icon, Empty, Spin, Modal } from 'antd';
import { setDataset, getDataset } from '../../../../actions/dodatasets';
import { Dataset } from '../../../../models/dataset';
import DatasetUploaderComponent from '../../shared/uploader/uploader';
import { DatasetItem } from '../../../../models/dataset-item';
import DatasetItemComponent from '../../shared/dataset-item/dataset-item';
import DatasetItemsService from '../../../../services/dataset-items/dataset-items.service';
const { confirm } = Modal;

export class DatasetContentComponent extends React.Component<any> {

  // Define the props in component
  public props: any;

  // Define state vasriable
  public state: any = {
    uploadModal: false,
    dataset: null
  };

  public newDataset(): void {
    this.props.setDataset(new Dataset());
  }
  public componentDidMount() {
    this.props.getDataset(this.props.match.params.id);
  }

  public getDatasets(): any {
    if (!this.state) {
      return (
        <div className="empty">
          <Spin size="large" />
          <span>
            Cargando elementos
          </span>
        </div>
      )
    }

    if (this.state.dataset && this.state.dataset.items.length > 0) {
      return this.props.dataset.items.map( (item: DatasetItem) => {
        return (
          <DatasetItemComponent 
            dataset={this.state.dataset} 
            transfer={this.transferItem.bind(this)}
            delete={this.deleteItem.bind(this)}
            item={item} 
            key={item.id} />
        );
      });
    } else {
      return (
        <div className="empty">
          <Empty description={
            <span>
              No hay elementos en el dataset
            </span>
          }/>
        </div>
      )
    }
  }

  public deleteItem(item: DatasetItem): void {
    let self = this;
    confirm({
      title: 'Confirmación',
      content: '¿Esta seguro que desea eliminar el elemento?',
      onOk() {
        DatasetItemsService.getInstance().destroy(self.props.dataset, item)
        .subscribe(data => {
          let dataset = self.state.dataset;
          dataset.items.splice(dataset.items.indexOf(data), 1);
          self.setState({
            dataset: dataset
          });
        });
      }
    });
  }

  public transferItem(item: DatasetItem, dataset: Dataset): void {
    let self = this;
    item.dataset = dataset.id;
    confirm({
      title: 'Confirmación',
      content: '¿Esta seguro que desea transferir el elemento?',
      onOk() {
        DatasetItemsService.getInstance().update(self.props.dataset, item)
        .subscribe(data => {
          let dataset = self.state.dataset;
          dataset.items.splice(dataset.items.indexOf(data), 1);
          self.setState({
            dataset: dataset
          });
        });
      }
    });
  }

  public editDataset(): void {
    this.props.setDataset(this.props.dataset);
  }

  public loadElements(): void {
    this.setState({
      uploadModal: true
    });
  }

  public showModal(): any {
    if (this.state.uploadModal) {
      return (
        <DatasetUploaderComponent 
          close={this.uploads.bind(this)}
          dataset={this.state.dataset}>
        </DatasetUploaderComponent>
      );
    }
  }

  public uploads(items: DatasetItem[]): any {
    let dataset = this.state.dataset;
    dataset.items = dataset.items.concat(items);
    this.setState({
      uploadModal: false,
      dataset: dataset
    });
  }

  public static getDerivedStateFromProps(props: any, state: any) {
    state.dataset = props.dataset;
    return state;
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
            <Breadcrumb.Item>
              <Link to="/datasets">
                {(this.props.dataset) ? this.props.dataset.name : ''}
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="buttons">
            <Button className="load"
              onClick={this.loadElements.bind(this, {})}>
              <Icon type="plus" /> Cargar elementos
            </Button>
            <Button type="primary" onClick={this.editDataset.bind(this, {})}>
              <Icon type="plus" /> Editar Dataset
            </Button>
          </div>
        </div>
        <div className="dataset__content">
          {this.getDatasets()}
        </div>
        {this.showModal()}
      </div>
    )
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
      dataset: state.dataset.dataset
    }
  }
  
  function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
      setDataset,
      getDataset
    }, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DatasetContentComponent));