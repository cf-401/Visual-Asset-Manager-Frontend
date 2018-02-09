/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const defaultState = [];

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'INIT_FILE_DATA':
      return payload || [];
    case 'CREATE':
      return [...state, payload];
    case 'UPDATE':
      return state.map(item => (item._id === payload._id ? payload : item));
    case 'DELETE':
      return state.filter(item => (item._id !== payload));
    case 'DELETE_AUTH_TOKEN':
      return defaultState;
    default:
      return state;
  }
};
