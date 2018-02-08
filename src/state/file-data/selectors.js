import { filter } from 'lodash';

export const getAllFileData = state => state.fileData;

export const getFilteredData = (state) => {
  const { fileData, selections } = state;

  if (selections.currentLabels.length === 0) {
    return fileData;
  }

  const toReturn = filter(fileData, (item) => {
    let predicate = false;
    if (!item.labels) {
      return false;
    }

    selections.currentLabels.forEach((label) => {
      if (item.labels[label]) {
        predicate = true;
      }
    });
    return predicate;
  });
  return toReturn;
};
