/* global __AUTH_URL__ */

import superagent from 'superagent';
import cookie from 'react-cookies';

const bearerToken = () => cookie.load('auth');

const setUser = auth => ({
  type: 'SET_AUTH_USER',
  payload: auth,
});

const updateAction = auth => ({
  type: 'UPDATE',
  payload: auth,
});

export const authLogout = () => ({
  type: 'DELETE_AUTH_TOKEN',
});

const deleteAction = auth => ({
  type: 'DELETE',
  payload: auth,
});

export const checkLogin = () => (dispatch) => {
  const cookieToken = cookie.load('auth');
  if (!cookieToken) {
    return;
  }
  const authenticateUsingToken = token => superagent.get(`${__AUTH_URL__}/validate`)
    .set('Authorization', `Bearer ${token}`);
  return authenticateUsingToken(cookieToken)
    .then((res) => {
      dispatch(setUser(res.body));
      return res;
    })
    .catch(e => console.error('Authenticaton Error:', e.message));
};

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

export const userUpdate = payload => (dispatch) => {
  const URL = `${__AUTH_URL__}/update`;

  superagent.put(URL)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .send(payload)
    .then(res => dispatch(updateAction(res.body)))
    .catch(console.error);
};


export const userDelete = payload => (dispatch) => {
  const URL = `${__AUTH_URL__}`;

  superagent.delete(URL)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .then(() => {
      dispatch(deleteAction(payload));
    })
    .catch(console.error);
};
