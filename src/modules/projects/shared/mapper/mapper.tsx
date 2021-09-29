import * as React from 'react';
import './mapper.scss';
import 'antd/dist/antd.css';
import { Modal, Button, InputNumber, message } from 'antd';
import { User } from '../../../../models/user';

export class DatasetItemMapperComponent extends React.Component<any> {
  state: any = {
    currentUserPool: {}
  }

  showProjectUsers = (): any => {
    return (
      <div className="users_list">
        <div className="users_item dark">
          <div className="users_info">Usuario</div>
          <div className="users_info">Email</div>
          <div className="users_info"> Asignar </div>
        </div>
        { this.props.project.users.map((user: User) => {
          return (
            <div className="users_item" key={user.id}>
              <div className="users_info">{user.name}</div>
              <div className="users_info">{user.email}</div>
              <div className="users_pool">
                <InputNumber
                  min={0}
                  size="small"
                  defaultValue={0}
                  value={this.state.currentUserPool[user.id] || 0}
                  onChange={this.updateFreePool.bind(this, user.id)}
                ></InputNumber>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  close = (): void => {
    this.props.close(this);
  }

  action = (): void => {
    if (this.getAvailablePool() === this.props.project.free_pool){
      this.close()
      return
    }
    this.props.action(this.state.currentUserPool);
  }

  updateFreePool = (userId: any, value: any, ): void => {
    const { currentUserPool } = this.state
    const newPool = { ...currentUserPool, [userId]: value }
    if (this.getAvailablePool() === 0 && newPool[userId] > currentUserPool[userId]) {
      message.warning("La cantidad asignada supera a la disponible");
      return
    }
    this.setState({
      currentUserPool: newPool
    })
  }

  getAvailablePool = (): number => {
    const values: number[] = Object.values(this.state.currentUserPool)
    if (values.length === 0) return this.props.project.free_pool
    const sum = values.reduce((sum, x) => sum + x)
    return this.props.project.free_pool - sum
  }

  render() {
    const availablePool = this.getAvailablePool()
    return (
      <Modal
          title="Asignar Carga"
          visible={true}
          onCancel={this.close}
          className="mapper_modal"
          footer={[
            <Button key="mapper" type="primary" onClick={this.action}>
              Asignar
            </Button>
          ]}>
        <div className="mapper">
          <div className="mapper_content">
            <div className="free_pool">
              Cantidad de Libre Disposición: {availablePool}
            </div>
            {this.showProjectUsers()}
          </div>
        </div>
      </Modal>
    )
  }
}

export default DatasetItemMapperComponent;
