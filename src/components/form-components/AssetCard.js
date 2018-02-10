/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import { Card, Icon, Tag } from 'antd';
import PropTypes from 'prop-types';
import FileDataForm from '../file-data/FileDataForm';
/* eslint-disable*/
require('style-loader!css-loader!antd/es/card/style/index.css');
require('style-loader!css-loader!antd/es/tag/style/index.css');
/* eslint-enable */

const { Meta } = Card;

const labelCheck = (labels) => {
  if (!labels) {
    return null;
  }
  if (Object.keys(labels).length === 0) {
    return null;
  }
  return Object.keys(labels).map(label => (<Tag key={label}>{label}</Tag>));
};


class AssetCard extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
    this.turnOnRendering = this.turnOnRendering.bind(this);
    this.state = {
      editing: false,
    };
  }

  renderEditForm() {
    const {
      item,
      submitHandler,
      allFilters,
      makeNewLabel,
    } = this.props;
    if (this.state.editing) {
      return (
        <FileDataForm
          fileData={item}
          submitHandler={submitHandler}
          type="updater"
          allLabels={allFilters}
          makeNewLabel={makeNewLabel}
          visible={this.state.editing}
        />);
    }
    return null;
  }

  turnOnRendering() {
    this.setState({ editing: true });
  }

  renderEditButton(isOwnerOfAsset) {
    if (isOwnerOfAsset) {
      return (
        [<Icon type="edit" onClick={this.turnOnRendering} />]
      );
    }
    return null;
  }

  render() {
    const {
      item,
      isOwnerOfAsset,
      submitHandler,
      allFilters, makeNewLabel,
    } = this.props;
    return (
      <React.Fragment>
        {this.renderEditForm()}
        <Card
          style={{ width: 300 }}
          cover={<img alt={item.name} src={item.path} />}
          actions={this.renderEditButton(isOwnerOfAsset)}
          extra={labelCheck(item.labels)}
        >
          <Meta
            title={item.name}
            description={item.description}
          />
        </Card>
      </React.Fragment>
    );
  }
}

AssetCard.propTypes = {
  item: PropTypes.shape({}).isRequired,
  isOwnerOfAsset: Boolean,
};

AssetCard.defaultProps = {
  isOwnerOfAsset: false,
};

export default AssetCard;
