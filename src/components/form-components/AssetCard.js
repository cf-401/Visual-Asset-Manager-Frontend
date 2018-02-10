/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import { Card, Icon, Tag } from 'antd';
import PropTypes from 'prop-types';
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

function renderEdit(isOwnerOfAsset) {
  if (isOwnerOfAsset) {
    return (
      [<Icon type="edit" />]
    );
  }
  return null;
}

const AssetCard = (props) => {
  const { item, isOwnerOfAsset } = props;
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={item.name} src={item.path} />}
      actions={renderEdit(isOwnerOfAsset)}
      extra={labelCheck(item.labels)}
    >
      <Meta
        title={item.name}
        description={item.description}
      />
    </Card>
  );
};

AssetCard.propTypes = {
  item: PropTypes.shape({}).isRequired,
  isOwnerOfAsset: Boolean,
};

AssetCard.defaultProps = {
  isOwnerOfAsset: false,
};

export default AssetCard;
