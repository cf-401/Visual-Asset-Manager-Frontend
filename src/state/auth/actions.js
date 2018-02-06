/* global __AUTH_URL__ */

import superagent from 'superagent';
import cookie from 'react-cookies';

const setUser = auth => ({
  type: 'SET_AUTH_USER',
  payload: auth,
});

export const authLogin = (user = {}) => (dispatch) => {
  const cookieToken = cookie.load('auth');
  const authenticateUsingToken = token => superagent.get(`${__AUTH_URL__}/validate`)
    .set('Authorization', `Bearer ${token}`);

  const authenticateUsingBasic = newUser => superagent.get(`${__AUTH_URL__}/signin`)
    .withCredentials()
    .auth(newUser.email, newUser.password);

  let authMethod = () => authenticateUsingBasic(user);

  if (cookieToken) {
    authMethod = () => authenticateUsingToken(cookieToken);
  }

  return authMethod()
    .then((res) => {
      dispatch(setUser(res.body));
      return res;
    })
    .catch(e => console.error('Authenticaton Error:', e.message));
};

export const authCreateAccount = user => dispatch => superagent.post(`${__AUTH_URL__}/signup`)
  .withCredentials()
  .send(user)
  .then((res) => {
    dispatch(setUser(res.body));
    return res;
  })
  .catch(e => console.error('Authenticaton Error:', e.message));


export const authLogout = () => ({
  type: 'DELETE_AUTH_TOKEN',
});
