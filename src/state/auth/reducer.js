
const defaultState = { init: true };

// {token:alsadkfjlsadkjfdsljsdflj}

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_AUTH_TOKEN':
      return {
        user: {
          token: payload.token,
          username: payload.user.username,
          email: payload.user.email,
        },
      };

    case 'SET_AUTH_USER':
      return {
        user: {
          token: payload.token,
          username: payload.user.username,
          email: payload.user.email,
        },
      };

    case 'DELETE_AUTH_TOKEN':
      return defaultState;

    default:
      return state;
  }
};
