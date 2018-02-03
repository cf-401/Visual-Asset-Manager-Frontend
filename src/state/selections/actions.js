/* globals __API_URL__ */
import superagent from 'superagent';
import cookies from 'react-cookies';

import * as actions from '../utils/base-actions';

const bearerToken = () => cookies.load('auth');
const API = `${__API_URL__}/asset_labels`;

export const { update } = actions;

export const create = payload => (dispatch) => {
  superagent.post(API)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .send(payload)
    .then(res => dispatch(actions.create(res.body)))
    .catch(console.error);
};

export const init = () => (dispatch) => {
  superagent.get(API)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .then(res => dispatch(actions.init(res.body)))
    .catch(console.error);
};
