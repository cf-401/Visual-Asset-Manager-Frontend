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
    this.renderButton = this.renderButton.bind(this);
    const { visible } = this.props;
    this.state = { visible };
  }

  componentWillReceiveProps(newProps) {
    const { visible } = newProps;
    if (visible) {
      this.setState({ visible });
    }
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    const { fileData } = this.props;
    this.setState({
      visible: false,
    }, this.props.submitHandler(fileData));
  }

  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }

  renderButton() {
    const { type } = this.props;
    if (type === 'creator') {
      return (<Button type="primary" onClick={this.showModal}>Upload Images</Button>);
    }
    return null;
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        {this.renderButton()}
        <Modal
          title="Image Uploader"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Save"
          destroyOnClose
        >
          {children}
        </Modal>
      </div>
    );
  }
}

ModalImageUploader.propTypes = {
  visible: Boolean,
};
ModalImageUploader.defaultProps = {
  visible: false,
};

export default ModalImageUploader;
