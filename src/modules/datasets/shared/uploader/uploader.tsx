import * as React from 'react';
import './uploader.scss';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Modal, message, Button } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { Attachment } from '../../../../models/attachment';
import DatasetItemsService from '../../../../services/dataset-items/dataset-items.service';
import { DatasetItem } from '../../../../models/dataset-item';

export class DatasetUploaderComponent extends React.Component<any> {

  // Define the props in component
  public props: any;
  // Define dataset items
  public items : DatasetItem[] = [];

  // Config Object
  public config = {
    name: 'file',
    multiple: true,
    customRequest: (item: any) => {
      const fileReader = new FileReader();
      
      fileReader.onload = (e: any) => {
        const dataUrl = e.target.result;
        const base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
        const attachment = new Attachment(item.file);
        attachment.data = base64Data;
        attachment.mime = item.file.type;

        DatasetItemsService.getInstance()
        .create(this.props.dataset, attachment).subscribe(data => {
          this.items = this.items.concat(data);
          item.onSuccess(data);
        }, error => {
          message.warning("El archivo especificado no pudo ser subido");
          item.onError(error);
        });
      };

      fileReader.readAsDataURL(item.file);
    },
    onRemove: (item: any) => {
      let items = item.response;

      for (let i=0; i<items.length; i++) {
        DatasetItemsService.getInstance()
        .destroy(this.props.dataset, items[i]).subscribe(data => {
          this.items.splice(this.items.indexOf(items[i]), 1);
          message.success("Item eliminado exitosamente");
        }, error => {
          message.warning("El archivo no se pudo eliminar");
          console.error(error);
        });
      }
    }
  };

  public close(): void {
    this.props.close(this.items);
  }

  public render() {
    return (
      <Modal
          title="Cargar elementos"
          visible={true}
          onCancel={this.close.bind(this, {})}
          footer={[
            <Button key="ok" type="primary" onClick={this.close.bind(this, {})}>
              Ok
            </Button>
          ]}
        >
        <Dragger {...this.config}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Haz click o arrastra un archivo al area de carga</p>
          <p className="ant-upload-hint">
            Puedes agregar un o mas archivos.<br></br>   Solo se soportan formatos en pdf, txt y csv.
          </p>
        </Dragger>
      </Modal>
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
    }, dispatch);
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DatasetUploaderComponent));