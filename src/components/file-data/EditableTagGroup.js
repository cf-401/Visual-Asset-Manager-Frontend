import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Input, Tooltip, Icon } from 'antd';

require('style-loader!css-loader!antd/es/tag/style/index.css');
require('style-loader!css-loader!antd/es/input/style/index.css');

class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: ['Unremovable', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      inputValue: '',
    };

    this.handleClose = this.handleClose.bind(this);
    this.showInput = this.showInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveInputRef = this.saveInputRef.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
  }


  handleClose(removedTag) {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  showInput() {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm() {
    let { tags, inputValue } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef(input) {
    this.input = input;
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state;

    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

export default EditableTagGroup;
