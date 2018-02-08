/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

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
    const { allLabels } = this.props;
    if (includes(allLabels, value)) {
      this.setState({ inputValue: value }, () => {
        this.handleInputConfirm();
      });
    }
  }

  handleInputChange(value) {
    const { allLabels } = this.props;
    if (includes(allLabels.map(label => label.name), value)) {
      return this.setState({ inputValue: value }, () => {
        this.handleInputConfirm();
      });
    }
    return this.setState({ newLabel: value });
  }

  handleInputConfirm() {
    let { tags } = this.state;
    const { inputValue } = this.state;
    const {
      makeNewLabel,
      handleLablesChange,
    } = this.props;

    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    }, () => handleLablesChange(tags));

    const { newLabel } = this.state;
    if (newLabel) {
      tags = [...tags, newLabel];
      this.setState({ tags, newLabel: '' }, () => {
        handleLablesChange(tags);
        makeNewLabel({ name: newLabel });
      });
    }
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
        {tags.map((tag) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            /* eslint-disable-next-line no-underscore-dangle */
            <Tag key={tag._id} closable="true" afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <AutoComplete
            style={{ width: 100 }}
            dataSource={allLabels.map(label => label.name)}
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
  makeNewLabel: PropTypes.func.isRequired,
};


export default EditableTagGroup;
