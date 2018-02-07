/* globals __API_URL__ */
import superagent from 'superagent';
import cookies from 'react-cookies';

const bearerToken = () => cookies.load('auth');
const API = `${__API_URL__}/asset_labels`;

const initLabels = payload => ({
  type: 'INIT_LABELS',
  payload,
});

const createLabel = payload => ({
  type: 'CREATE_LABEL',
  payload,
});

export const update = payload => ({
  type: 'UPDATE_SELECTIONS',
  payload,
});

export const create = payload => (dispatch) => {
  superagent.post(API)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .send(payload)
    .then(res => dispatch(createLabel(res.body)))
    .catch(console.error);
};

export const init = () => (dispatch) => {
  superagent.get(API)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .then(res => dispatch(initLabels(res.body)))
    .catch(console.error);
};
