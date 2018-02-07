import React from 'react';
import { Card, Icon } from 'antd';

require('style-loader!css-loader!antd/es/card/style/index.css');

const { Meta } = Card;

const AssetCard = (props) => {
  const { item } = props;
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={item.name} src={item.path} />}
      actions={[<Icon type="edit" />]}
    >
      <Meta
        title={item.name}
        description={item.description}
      />
    </Card>
  );
};

export default AssetCard;
