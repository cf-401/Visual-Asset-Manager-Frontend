import React from 'react';
import { Card, Icon, Tag } from 'antd';

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

const AssetCard = (props) => {
  const { item } = props;
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={item.name} src={item.path} />}
      actions={[<Icon type="edit" />]}
      extra={labelCheck(item.labels)}
    >
      <Meta
        title={item.name}
        description={item.description}
      />
    </Card>
  );
};

export default AssetCard;
