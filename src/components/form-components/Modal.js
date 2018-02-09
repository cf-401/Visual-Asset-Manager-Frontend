import React from 'react';
import { Modal, Button } from 'antd';
/* eslint-disable */
require('style-loader!css-loader!antd/es/modal/style/index.css');
/* eslint-enable */
class ModalImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = { visible: false };
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk(e) {
    this.setState({
      visible: false,
    }, this.props.submitHandler);
  }

  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Upload Images</Button>
        <Modal
          title="Image Uploader"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Done"
          destroyOnClose="true"
        >
          {children}
        </Modal>
      </div>
    );
  }
}

export default ModalImageUploader;
