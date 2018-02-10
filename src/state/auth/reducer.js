
const defaultState = { init: true };

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_AUTH_TOKEN':
      return {
        user: {
          token: payload.token,
          username: payload.user.username,
          email: payload.user.email,
          group: payload.user.group,
          aboutMe: payload.user.aboutMe,
          password: payload.user.password,
          _id: payload.user._id,
        },
      };

    case 'SET_AUTH_USER':
      return {
        user: {
          token: payload.token,
          username: payload.user.username,
          email: payload.user.email,
          group: payload.user.group,
          aboutMe: payload.user.aboutMe,
          password: payload.user.password,
          _id: payload.user._id,
        },
      };

    case 'UPDATE':
      return {
        user: payload,
      };
    case 'DELETE_AUTH_TOKEN':
      return defaultState;

    default:
      return state;
  }
};
