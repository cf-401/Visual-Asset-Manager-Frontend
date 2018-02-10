import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Upload, Icon } from 'antd';
import { noop } from 'lodash';
import { FileDataType } from '../../state/file-data/type';
import { User } from '../../state/auth/type';
import { photoToDataUrl } from '../../util/fileData';
import EditableTagGroup from './EditableTagGroup';
import Modal from '../form-components/Modal';

/* eslint-disable */
require('style-loader!css-loader!antd/es/style/index.css');
/* eslint-enable */

const FileDataDefault = {
  filename: '',
  date: '',
  path: '',
  description: '',
  preview: '',
};

class FileDataForm extends React.Component {
  constructor(props) {
    super(props);
    const { fileData } = this.props;
    const { visible } = this.props;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.renderName = this.renderName.bind(this);
    this.handleLablesChange = this.handleLablesChange.bind(this);
    this.renderRestofForm = this.renderRestofForm.bind(this);
    this.state = {
      visible,
      fileData,
    };
  }

  handleChange(e) {
    const { fileData } = this.state;
    this.setState({ fileData: { ...fileData, [e.target.name]: e.target.value } });
  }

  handleSubmit(data) {
    const { submitHandler, type } = this.props;
    submitHandler(data);
    if (type === 'creator') {
      this.setState({ fileData: FileDataDefault });
    } else {
      const { fileData } = this.state;
      this.setState({ fileData: { ...fileData, preview: '' }, visible: false });
    }
  }

  handleImage(file) {
    const visualAsset = file;
    const { fileData } = this.state;
    this.setState({ fileData: { ...fileData, visualAsset, filename: visualAsset.name } });
    return photoToDataUrl(visualAsset)
      .then((preview) => {
        const newFileData = this.state.fileData;
        this.setState({
          fileData: {
            ...newFileData, preview,
          },
        });
        return false;
      })
      .catch(console.error);
  }

  handleLablesChange(value) {
    const { fileData } = this.state;

    const labels = value.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});
    this.setState({ fileData: { ...fileData, labels } });
  }

  renderImage() {
    const { name, path } = this.state.fileData;
    return path ? (<img src={path} alt={name} />) : null;
  }

  renderPreview() {
    const { preview } = this.state.fileData;
    return preview ? (
      <figure>
        <img src={preview} alt="preview of upload" />
        <figcaption>Preview</figcaption>
      </figure>) : null;
  }

  renderRestofForm() {
    const {
      allLabels,
      makeNewLabel,
      type,
    } = this.props;
    const { fileData } = this.state;
    const button = null;

    if (fileData.preview || type !== 'creator') {
      return (
        <React.Fragment>
          <Input
            name="filename"
            type="text"
            value={fileData.filename}
            placeholder="File name"
            onChange={this.handleChange}
            readOnly
          />
          <Input
            name="description"
            type="text"
            value={fileData.description}
            placeholder="Enter a description"
            onChange={this.handleChange}
            required
          />
          <EditableTagGroup
            makeNewLabel={makeNewLabel}
            handleLablesChange={this.handleLablesChange}
            allLabels={allLabels}
          />
          {button}
        </React.Fragment>
      );
    }
    return null;
  }

  renderName() {
    const { type, user } = this.props;
    const { fileData } = this.state;
    let name = '';
    if (type === 'creator') {
      name = user.username;
    } else if (fileData.userId) {
      name = fileData.userId.username;
    }
    return (
      <Input
        name="user_name"
        type="text"
        readOnly
        value={name}
      />
    );
  }

  render() {
    const { type } = this.props;
    const { visible } = this.state;
    return (
      <Modal
        fileData={this.state.fileData}
        submitHandler={this.handleSubmit}
        type={type}
        visible={visible}
      >
        <Form onSubmit={this.handleSubmit} className="visual-form">
          {this.renderName()}
          {this.renderImage()}
          {this.renderPreview()}
          <Upload
            beforeUpload={this.handleImage}
            name="path"
            type="file"
            customRequest={noop}
            showUploadList={false}
          >
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
          {this.renderRestofForm()}
        </Form>
      </Modal>
    );
  }
}


FileDataForm.propTypes = {
  fileData: PropTypes.shape(FileDataType),
  submitHandler: PropTypes.func.isRequired,
  type: PropTypes.string,
  user: PropTypes.shape(User),
  allLabels: PropTypes.arrayOf(PropTypes.shape({})),
  makeNewLabel: PropTypes.func.isRequired,
  visible: Boolean,
};

FileDataForm.defaultProps = {
  fileData: FileDataDefault,
  type: 'creator',
  user: {},
  allLabels: [],
  visible: false,
};

export default FileDataForm;
