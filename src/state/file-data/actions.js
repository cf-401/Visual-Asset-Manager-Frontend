/* globals __API_URL__ */
import superagent from 'superagent';
import cookies from 'react-cookies';

import * as actions from '../utils/base-actions';

const API = `${__API_URL__}/visual_files`;

const bearerToken = () => cookies.load('auth');

export const init = () => (dispatch) => {
  superagent.get(API)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .then(res => dispatch(actions.init(res.body)))
    .catch(console.error);
};

export const create = payload => (dispatch) => {
  superagent.post(API)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .send(payload)
    .then(res => dispatch(actions.create(res.body)))
    .catch(console.error);
};

export const updateData = payload => (dispatch) => {
  const url = `${API}`;
  superagent.put(url)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .send(payload)
    .then(() => dispatch(actions.update(payload)))
    .catch(console.error);
};

export const remove = id => (dispatch) => {
  const url = `${API}/${id}`;
  superagent.delete(url)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .then(() => dispatch(actions.remove(id)))
    .catch(console.error);
};

export const updateImage = data => (dispatch) => {
  const token = cookies.load('auth');
  const URL = `${__API_URL__}/upload`;

  // no image to uplaod
  if (!data.visualAsset) {
    return dispatch(updateData(data));
  }

  return superagent.post(URL)
    .set('Authorization', `Bearer ${token}`)
    .attach('newImage', data.visualAsset)
    .then((res) => {
      const metadata = {
        path: res.body.url,
        filename: data.filename,
        description: data.description,
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        _id: data._id,
      };
      metadata.visualAsset = null;
      delete metadata.visualAsset;
      return dispatch(updateData(metadata));
    })
    .catch(e => console.error('ERROR', e.message));
};

export const uploadImage = data => (dispatch) => {
  const token = cookies.load('auth');

  const URL = `${__API_URL__}/upload`;
  superagent.post(URL)
    .set('Authorization', `Bearer ${token}`)
    .attach('newImage', data.visualAsset)
    .then((res) => {
      console.log('dat', data);
      const toPost = Object.assign({}, data, { path: res.body.url });
      toPost.visualAsset = null;
      delete toPost.visualAsset;
      toPost.preview = null;
      delete toPost.preview;
      console.log('toPost', toPost);
      dispatch(create(toPost));
    })
    .catch(e => console.error('ERROR', e.message));
};
