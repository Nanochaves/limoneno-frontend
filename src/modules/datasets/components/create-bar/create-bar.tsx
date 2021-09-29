import * as React from 'react';
import './create-bar.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Icon, Button } from 'antd';
import { setDataset, publishDataset, destroyDataset } from '../../../../actions/dodatasets';

export class CreateDatasetBarComponent extends React.Component<any> {

  // Define the props in component
  public props: any;

  public newDataset(): void {

  }

  public close(): void {
    this.props.setDataset(null);
  }

  public title(): any {
    if (this.props.dataset && this.props.dataset.id) {
      return (
        <div className="top">
          <div className="title">Editar Dataset</div>
          <div className="close" onClick={this.close.bind(this, {})}>
            <Icon type="close"/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="top">
          <div className="title">Crear Dataset</div>
          <div className="close" onClick={this.close.bind(this, {})}>
            <Icon type="close"/>
          </div>
        </div>
      );
    }
  }

  public editDatatset(): void {
    this.props.publishDataset(this.props.dataset);
  }

  public createDatatset(): void {
    this.props.publishDataset(this.props.dataset);
  }

  public destroyDataset(): void {
    this.props.destroyDataset(this.props.dataset);
  }


  public editButton(): any {
    if (this.props.dataset && this.props.dataset.id) {
      return (
        <div className="buttons">
          <Button type="primary" className="edit__button"
            onClick={this.editDatatset.bind(this, {})}>Editar Dataset</Button>
          <Button type="danger"
            onClick={this.destroyDataset.bind(this, {})}>Eliminar Dataset</Button>
        </div>
      );
    }
  }

  public createButton(): any {
    if (this.props.dataset && !this.props.dataset.id) {
      return (
        <Button type="primary" 
          onClick={this.createDatatset.bind(this, {})}>Crear Dataset</Button>
      );
    }
  }

  public setName(options: any, event: any): void {
    this.props.dataset.name = event.target.value;
  }

  public setDescription(options: any, event: any): void {
    this.props.dataset.description = event.target.value;
  }

  public render() {
    return (
      <div className="dataset__bar">
        {this.title()}
        <div className="inputs">
          <Form>
            <Form.Item className="inputs">
              <div className="label">Nombre dataset:</div>
              <Input prefix={<Icon type="edit"/>}
              placeholder="Nombre"
              defaultValue={this.props.dataset.name}
              type="text"
              onChange={this.setName.bind(this, {})}></Input>
            </Form.Item>
            <Form.Item className="inputs">
              <div className="label">Descripción:</div>
              <Input.TextArea rows={4}
              placeholder="Descripción del dataset"
              defaultValue={this.props.dataset.description}
              onChange={this.setDescription.bind(this, {})}></Input.TextArea>
            </Form.Item>
            <Form.Item className="buttons">
              { this.createButton()}
              { this.editButton()}
            </Form.Item>
          </Form>
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
      setDataset,
      publishDataset,
      destroyDataset
    }, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(CreateDatasetBarComponent));