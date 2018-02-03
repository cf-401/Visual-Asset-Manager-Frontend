import reducer from '../reducer';

describe('auth reducer', () => {
  const initalState = { init: true };
  const mockUser = {
    user: {
      username: 'name',
      email: 'email',
      _id: 'id',
      token: 'token',
    },
  };

  describe('set new user', () => {
    test('it takes makes a new user and sets auth state', () => {
      const newState = reducer(initalState, { type: 'SET_AUTH_USER', payload: mockUser });

      expect(newState).toEqual({ user: { email: 'email', token: undefined, username: 'name' } });
    });
  });


  describe('DELETE_AUTH_TOKEN', () => {
    test('removes the authentication', () => {
      const newState = reducer(initalState, { type: 'DELETE_AUTH_TOKEN' });

      expect(newState).toEqual(initalState);
    });
  });
});
