import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

const tagsFromServer = ['Tag 2', 'Stuff', 'Music', 'Sports'];

class FilterSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
    };
  }

  handleChange(tag, checked) {
    const { updateCurrentFilters } = this.props;
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
      [...selectedTags, tag] :
      selectedTags.filter(t => t !== tag);
    console.log('Filter images by: ', nextSelectedTags);
    this.setState(
      { selectedTags: nextSelectedTags },
      () => updateCurrentFilters(nextSelectedTags),
    );
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <div>
        <h6 style={{ marginRight: 8, display: 'inline' }}>Categories:</h6>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

export default FilterSelector;
