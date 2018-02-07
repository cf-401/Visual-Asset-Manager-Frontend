import React from 'react';

import { AutoComplete } from 'antd';

require('style-loader!css-loader!antd/es/auto-complete/style/index.css');
require('style-loader!css-loader!antd/es/dropdown/style/index.css');


function Complete(props) {
  const { dataSource } = props;

  return (
    <AutoComplete
      style={{ width: 200 }}
      dataSource={dataSource}
      onChange={props.handleInputChange}
      onBlur={props.handleInputConfirm}
      onPressEnter={props.handleInputConfirm}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />
  );
}

export default Complete;
