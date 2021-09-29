import * as React from 'react';
import 'antd/dist/antd.css';
import './clasification-selector.scss';
import { Input, Icon, Button, message, Modal } from 'antd';
import { Clasification } from '../../../../models/clasification';
import { Subclasification } from '../../../../models/subclasification';

export default class ClasificatorSelectorComponent extends React.Component<
  any
> {
  // Define the props in component
  props: any;

  // Define state
  state: any = {
    tag: null,
    name: null,
    description: null,
    subtag: null,
    subname: null,
    subdescription: null,
    date: null
  };
  // clasifications
  clasifications: Clasification[] = [];
  clasification: any;

  componentDidMount(): void {
    this.clasifications = this.props.clasifications;
    this.setState({
      date: new Date()
    });
  }

  setProperty = (event: any): void => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addClasification = (): any => {
    const { tag, name, description } = this.state;
    if (!tag || !name || !description) {
      return message.warning('Debe ingresaer todos los campos');
    }

    this.clasifications.push(
      new Clasification({
        name: name,
        tag: tag,
        description: description
      })
    );
    // Clean
    this.setState({
      tag: '',
      name: '',
      description: ''
    });
    // Set clasification
    this.props.setClasifications(this.clasifications);
  };

  addSubclasification = (): any => {
    const { subtag, subname, subdescription } = this.state;
    if (!subtag || !subname || !subdescription) {
      return message.warning('Debe ingresaer todos los campos');
    }

    this.clasification.subclasifications.push(
      new Subclasification({
        name: subname,
        tag: subtag,
        description: subdescription
      })
    );
    // Clean
    this.setState({
      subtag: '',
      subname: '',
      subdescription: ''
    });
    // Set clasification
    this.props.setClasifications(this.clasifications);
  };

  deleteTag = (tag: Clasification): void => {
    this.clasifications.splice(this.clasifications.indexOf(tag), 1);
    this.setState({ date: new Date() });
  };

  deleteSubtag = (subtag: Subclasification): void => {
    this.clasification.subclasifications.splice(
      this.clasification.subclasifications.indexOf(subtag),
      1
    );
    this.setState({ date: new Date() });
  };

  handleOk(): void {}

  setClasification = (clasification: Clasification | null): any => {
    this.clasification = clasification;
    this.setState({ date: new Date() });
  };

  subcategory = (): any => {
    if (!this.clasification) return null;

    const { subtag, subname, subdescription } = this.state;
    return (
      <Modal
        title={`Subcategorias de ${this.clasification.name}`}
        visible={this.clasification}
        onOk={() => this.setClasification(null)}
        onCancel={() => this.setClasification(null)}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div className="subclasification">
          <div className="inline">
            <Input
              prefix={<Icon type="edit" />}
              placeholder="Tag"
              name="subtag"
              defaultValue={subtag}
              value={subtag}
              type="text"
              className="space"
              onChange={this.setProperty}
            ></Input>
            <Input
              prefix={<Icon type="edit" />}
              placeholder="Nombre a visualizar"
              name="subname"
              defaultValue={subname}
              value={subname}
              type="text"
              onChange={this.setProperty}
            ></Input>
          </div>
          <div className="inline description">
            <Input
              prefix={<Icon type="edit" />}
              placeholder="Descripcion"
              name="subdescription"
              defaultValue={subdescription}
              value={subdescription}
              type="text"
              className="space"
              onChange={this.setProperty}
            ></Input>
            <Button type="primary" onClick={this.addSubclasification}>
              Agregar
            </Button>
          </div>
          {this.showSubLabels()}
        </div>
      </Modal>
    );
  };

  showLabels = (): any => {
    if (this.clasifications.length <= 0) return null;

    return (
      <div className="labels">
        <div className="description_label">Clasificaciones: </div>
        <div className="tags">
          {this.clasifications.map(clasification => {
            return (
              <div className="tag" key={clasification.tag}>
                <div
                  className="title"
                  onClick={() => this.setClasification(clasification)}
                >
                  {clasification.name}
                </div>
                <div className="close">
                  <Icon
                    type="close"
                    onClick={() => this.deleteTag(clasification)}
                  ></Icon>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  showSubLabels(): any {
    const { subclasifications } = this.clasification;
    if (!subclasifications || subclasifications.length < 1) return null;

    return (
      <div className="labels">
        <div className="description_label">Subclasificaciones: </div>
        <div className="tags">
          {subclasifications.map((subclasification: any) => {
            return (
              <div className="tag" key={subclasification.tag}>
                <div className="title">{subclasification.name}</div>
                <div className="close">
                  <Icon
                    type="close"
                    onClick={this.deleteSubtag.bind(this, subclasification)}
                  ></Icon>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.disabled) return null;

    const { tag, name, description } = this.state;
    return (
      <div className="clasification">
        <div className="inline">
          <Input
            prefix={<Icon type="edit" />}
            placeholder="Tag"
            name="tag"
            defaultValue={tag}
            value={tag}
            type="text"
            className="space"
            onChange={this.setProperty}
          ></Input>
          <Input
            prefix={<Icon type="edit" />}
            placeholder="Nombre a visualizar"
            name="name"
            defaultValue={name}
            value={name}
            type="text"
            className="space"
            onChange={this.setProperty}
          ></Input>
        </div>
        <div className="inline description">
          <Input
            prefix={<Icon type="edit" />}
            placeholder="Descripcion"
            name="description"
            defaultValue={description}
            value={description}
            type="text"
            className="space"
            onChange={this.setProperty}
          ></Input>
          <Button type="primary" onClick={this.addClasification}>
            Agregar
          </Button>
        </div>
        {this.showLabels()}
        {this.subcategory()}
      </div>
    );
  }
}
