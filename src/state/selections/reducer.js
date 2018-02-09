/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { without } from 'lodash';

const initalState = {
  allLabels: [],
  currentLabels: [],
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case 'INIT_LABELS':
      return Object.assign({}, {
        allLabels: payload || [],
        currentLabels: state.currentLabels,
      });
    case 'CREATE_LABEL':
      return Object.assign({}, {
        allLabels: [...state.allLabels, payload],
        currentLabels: state.currentLabels,
      });
    case 'UPDATE_SELECTIONS':
      return Object.assign({}, {
        allLabels: state.allLabels,
        currentLabels: payload,
      });
    case 'DELETE_LABEL':
      return {
        allLabels: without(state.allLabels, payload),
        currentLabels: without(state.allLabels, payload),
      };
    default:
      return state;
  }
};
