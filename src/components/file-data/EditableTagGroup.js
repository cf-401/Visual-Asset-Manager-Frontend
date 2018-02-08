import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Input, Tooltip, Icon, AutoComplete } from 'antd';
import { includes } from 'lodash';

/* eslint-disable */
require('style-loader!css-loader!antd/es/style/index.css');
require('style-loader!css-loader!antd/es/tag/style/index.css');
require('style-loader!css-loader!antd/es/input/style/index.css');
require('style-loader!css-loader!antd/es/auto-complete/style/index.css');
require('style-loader!css-loader!antd/es/dropdown/style/index.css');
require('style-loader!css-loader!antd/es/select/style/index.css');
/* eslint-enable */

class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
    };

    this.handleClose = this.handleClose.bind(this);
    this.showInput = this.showInput.bind(this);
    this.handleInputSelect = this.handleInputSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveInputRef = this.saveInputRef.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
  }


  handleClose(removedTag) {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags }, () => this.props.handleLablesChange(tags));
  }

  showInput() {
    this.setState(
      { inputVisible: true },
      () => this.input.focus(),
    );
  }

  handleInputSelect(value) {
    console.log('change');
    const { allLabels } = this.props;
    if (includes(allLabels, value)) {
      this.setState({ inputValue: value }, () => {
        this.handleInputConfirm();
      });
    }
  }

  handleInputChange(value) {
    console.log('change', value);
    const { allLabels } = this.props;
    if (includes(allLabels, value)) {
      return this.setState({ inputValue: value }, () => {
        this.handleInputConfirm();
      });
    }
    this.setState({ newLabel: value });
  }

  handleInputConfirm(value) {
    let { tags } = this.state;
    console.log('confirm', value);
    const { inputValue } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    }, () => this.props.handleLablesChange(tags));
  }

  saveInputRef(input) {
    this.input = input;
  }

  render() {
    const {
      tags, inputVisible, inputValue,
    } = this.state;
    const { allLabels } = this.props;
    const InputElement = (<Input
      ref={this.saveInputRef}
      type="text"
      size="small"
      style={{ width: 100 }}
      value={inputValue}
      onChange={this.handleInputChange}
      onBlur={this.handleInputConfirm}
      onPressEnter={this.handleInputConfirm}
    />);
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable="true" afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <AutoComplete
            style={{ width: 100 }}
            dataSource={allLabels}
            onSelect={this.handleInputSelect}
            onChange={this.handleInputChange}
            placeholder="Add a tag"
            filterOption={(input, option) =>
              option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1}
          >
            {InputElement}
          </AutoComplete>
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Label
          </Tag>
        )}
      </div>
    );
  }
}

EditableTagGroup.propTypes = {
  handleLablesChange: PropTypes.func.isRequired,
  allLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditableTagGroup;
