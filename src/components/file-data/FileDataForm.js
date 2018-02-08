import React from 'react';
import PropTypes from 'prop-types';

import { FileDataType } from '../../state/file-data/type';
import { User } from '../../state/auth/type';
import { photoToDataUrl } from '../../util/fileData';
import EditableTagGroup from './EditableTagGroup';

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
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const { submitHandler, type } = this.props;
    e.preventDefault();
    submitHandler(Object.assign({}, this.state));
    if (type === 'creator') {
      this.setState({ ...FileDataDefault });
    } else {
      this.setState({ preview: '' });
    }
  }

  handleImage(e) {
    const { files } = e.target;
    const visualAsset = files[0];
    this.setState({ visualAsset, filename: visualAsset.name });
    photoToDataUrl(visualAsset)
      .then((preview) => {
        this.setState({ preview });
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

  renderName() {
    const { type, user } = this.props;

    if (type === 'creator') {
      return (
        <input
          name="user_name"
          type="text"
          readOnly
          value={user.username}
        />
      );
    }
    if (this.state.userId) {
      return (
        <input
          name="user_name"
          type="text"
          readOnly
          value={this.state.userId.username}
        />
      );
    }
    return null;
  }

  render() {
    const { type } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="visual-form">
        {this.renderName()}
        <input
          name="filename"
          type="text"
          value={this.state.filename}
          placeholder="File name"
          onChange={this.handleChange}
        />
        <input
          name="description"
          type="text"
          value={this.state.description}
          placeholder="Enter a description"
          onChange={this.handleChange}
        />
        <EditableTagGroup handleLablesChange={this.handleLablesChange} />
        <label htmlFor="path">
          {this.renderImage()}
          {this.renderPreview()}
          <input
            name="path"
            type="file"
            onChange={this.handleImage}
          />
        </label>

        <button type="submit">{buttonMap[type]}</button>
      </form>
    );
  }
}


FileDataForm.propTypes = {
  fileData: PropTypes.shape(FileDataType),
  submitHandler: PropTypes.func.isRequired,
  type: PropTypes.string,
  user: PropTypes.shape(User),
};

FileDataForm.defaultProps = {
  fileData: FileDataDefault,
  type: 'creator',
  user: {},
};

export default FileDataForm;
