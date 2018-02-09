import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

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
    this.setState(
      { selectedTags: nextSelectedTags },
      () => updateCurrentFilters(nextSelectedTags),
    );
  }

  render() {
    const { selectedTags } = this.state;
    const { allFilters } = this.props;

    return (
      <div>
        <h6 style={{ marginRight: 8, display: 'inline' }}>Categories:</h6>
        {allFilters.map(tag => (
          <CheckableTag
            key={tag.name}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag.name}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

export default FilterSelector;
