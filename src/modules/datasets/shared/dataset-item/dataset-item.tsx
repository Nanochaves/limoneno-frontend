import * as React from 'react';
import './dataset-item.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Menu, Dropdown, Modal, Select } from 'antd';
import { getDatasets } from '../../../../actions/dodatasets';
import { Dataset } from '../../../../models/dataset';

export class DatasetItemComponent extends React.Component<any> {

  // Define the props in component
  public props: any;

  // Define state var
  public state: any = {
    transfer: false,
    transferDataset: null
  };
  
  public icon(): string {
    switch (this.props.item.mime) {
      case "application/pdf":
        return "file-pdf";
      case "text/plain":
        return "file-text"
      case "text/csv":
        return "file-excel"
      default:
        return "file"
    }
  }

  public delete(): void {
    this.props.delete(this.props.item);
  }

  public toggleTransfer(): void {
    this.setState({
      transfer: !this.state.transfer
    })
  }

  public transfer(): void {
    this.props.transfer(this.props.item, this.state.transferDataset);
  }

  public menu(): any {
    return (
      <Menu>
        <Menu.Item key="1">
          {this.props.item.id + ' - ' + this.props.item.name}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={this.toggleTransfer.bind(this)}>
          <Icon type="sync" /> Transferir
        </Menu.Item>
        <Menu.Item key="3" onClick={this.delete.bind(this)}>
          <Icon type="delete" /> Eliminar
        </Menu.Item>
      </Menu>
    )
  }

  public changeTransferDataset(options: any): void {
    this.setState({
      transferDataset: this.props.datasets.find((dataset: Dataset) => {
        return dataset.id === options;
      })
    });
  }

  public transferModal(): any {
    if (this.state.transfer) {
      this.props.getDatasets();
      return (
        <Modal
          title="Transferir Item"
          visible={true}
          onOk={this.transfer.bind(this)}
          onCancel={this.toggleTransfer.bind(this)}
        >
          <div className="label">Transferir al siguiente dataset:</div>
          <Select className="transfer_select" defaultValue="Seleccione el datatset" 
            onChange={this.changeTransferDataset.bind(this)}>
            <Select.Option value={-1}>Seleccione el datatset</Select.Option>
            {this.props.datasets.map((dataset: Dataset) => {
              return (
                <Select.Option key={dataset.id} value={dataset.id}>
                  {dataset.name}
                </Select.Option>
              )
            })}
          </Select>
        </Modal>
      )
    }
  }

  public render() {
    return (
      <Dropdown overlay={this.menu()} trigger={['contextMenu']}>
        <div className="dataset__item">
          <div className="icon">
            <Icon type={this.icon()} />
          </div>
          <div className="title">{this.props.item.name}</div>
          {this.transferModal()}
        </div>
      </Dropdown>
    )
  }
}

// Configure React-redux store functions
function mapStateToProps(state: any) {
    return {
      datasets: state.dataset.list
    }
  }
  
  function matchDispatchToProps(dispatch: any) {
    return bindActionCreators({
      getDatasets
    }, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DatasetItemComponent));