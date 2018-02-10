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

const buttonMap = {
  creator: 'Save',
  updater: 'Update',
};

class FileDataForm extends React.Component {
  constructor(props) {
    super(props);
    const { fileData } = this.props;

    this.state = fileData;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.renderName = this.renderName.bind(this);
    this.handleLablesChange = this.handleLablesChange.bind(this);
    this.renderRestofForm = this.renderRestofForm.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(data) {
    const { submitHandler, type } = this.props;
    submitHandler(data);
    if (type === 'creator') {
      this.setState({ ...FileDataDefault });
    } else {
      this.setState({ preview: '' });
    }
  }

  handleImage(file) {
    const visualAsset = file;
    this.setState({ visualAsset, filename: visualAsset.name });
    return photoToDataUrl(visualAsset)
      .then((preview) => {
        file.status = 'done';
        this.setState({ preview });
        return false;
      })
      .catch(console.error);
  }

  handleLablesChange(value) {
    const labels = value.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});
    this.setState({ labels }, () => console.log(this.state));
  }

  renderImage() {
    const { name, path } = this.state;
    return path ? (<img src={path} alt={name} />) : null;
  }

  renderPreview() {
    const { preview } = this.state;
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
    let button = null;
    if (type !== 'creator') {
      button = <Button type="primary" htmlType="submit">Update</Button>;
    }
    if (this.state.preview) {
      return (
        <React.Fragment>
          <Input
            name="filename"
            type="text"
            value={this.state.filename}
            placeholder="File name"
            onChange={this.handleChange}
            readOnly
          />
          <Input
            name="description"
            type="text"
            value={this.state.description}
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
    let name = '';
    if (type === 'creator') {
      name = user.username;
    } else if (this.state.userId) {
      name = this.state.userId.username;
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
    return (
      <Modal currentState={this.state} submitHandler={this.handleSubmit}>
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
};

FileDataForm.defaultProps = {
  fileData: FileDataDefault,
  type: 'creator',
  user: {},
  allLabels: [],
};

export default FileDataForm;
