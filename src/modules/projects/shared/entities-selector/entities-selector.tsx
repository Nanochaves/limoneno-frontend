import * as React from 'react';
import 'antd/dist/antd.css';
import './entities-selector.scss';
import { Input, Icon, Button, message } from 'antd';
import { Entity } from '../../../../models/entity';

export default class EntitiesSelectorComponent extends React.Component<any> {
  // Define the props in component
  props: any;

  // Define state
  state: any = {
    tag: null,
    name: null,
    description: null,
    date: null
  };
  // clasifications
  entities: Entity[] = [];

  componentDidMount(): void {
    this.entities = this.props.entities;
    this.setState({
      date: new Date()
    });
  }

  setProperty = (event: any): void => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addEntity = (): any => {
    const { tag, name, description } = this.state;
    if (!tag || !name || !description) {
      return message.warning('Debe ingresaer todos los campos');
    }

    this.entities.push(
      new Entity({
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
    this.props.setEntities(this.entities);
  };

  deleteTag = (tag: Entity): void => {
    this.entities.splice(this.entities.indexOf(tag), 1);
    this.setState({
      date: new Date()
    });
  };

  showLabels(): any {
    if (this.entities.length <= 0) return null;

    return (
      <div className="labels">
        <div className="description_label">Entidades: </div>
        <div className="tags">
          {this.entities.map(entity => {
            return (
              <div className="tag" key={entity.tag}>
                <div className="title">{entity.name}</div>
                <div className="close">
                  <Icon
                    type="close"
                    onClick={() => this.deleteTag(entity)}
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
      <div className="entity">
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
          <Button type="primary" onClick={this.addEntity}>
            Agregar
          </Button>
        </div>
        {this.showLabels()}
      </div>
    );
  }
}
