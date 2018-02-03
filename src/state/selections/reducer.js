/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { without } from 'lodash';

const initalState = {
  allLabels: [],
  currentLabelsSelcted: [],
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case 'INIT':
      return { ...state, allLabels: payload };
    case 'CREATE':
      return { ...state, allLabels: payload };
    case 'UPDATE':
      return { ...state, currentLabelsSelcted: payload };
    case 'ETE':
      return {
        allLabels: without(state.allLabels, payload),
        currentLabelsSelcted: without(state.allLabels, payload),
      };
    default:
      return state;
  }
};
