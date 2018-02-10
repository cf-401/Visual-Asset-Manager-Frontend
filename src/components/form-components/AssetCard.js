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

function renderEdit(item, auth) {
  console.log('auth', auth);
  if (auth.user._id !== item.userId._id) {
    return null;
  }
  return (
    [<Icon type="edit" />]
  );
}

const AssetCard = (props) => {
  const { item, auth } = props;
  console.log('item', item);
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={item.name} src={item.path} />}
      actions={renderEdit(item, auth)}
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
};

export default AssetCard;
