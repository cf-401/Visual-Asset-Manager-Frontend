/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'INIT':
      return payload || [];
    case 'CREATE':
      return [...state, payload];
    case 'UPDATE':
      return state.map(item => (item._id === payload._id ? payload : item));
    case 'DELETE':
      return state.filter(item => (item._id !== payload));
    default:
      return state;
  }
};
