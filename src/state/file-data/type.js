import PropTypes from 'prop-types';

export default {
  name: PropTypes.string,
  date: PropTypes.sting,
  user: PropTypes.string,
  path: PropTypes.string,
  description: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
};
