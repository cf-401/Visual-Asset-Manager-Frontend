/* globals __API_URL__ */
import superagent from 'superagent';
import cookies from 'react-cookies';

const API = `${__API_URL__}/visual_files`;

const initAction = payload => ({
  type: 'INIT',
  payload,
});

const createAction = payload => ({
  type: 'CREATE',
  payload,
});

const updateAction = payload => ({
  type: 'UPDATE',
  payload,
});

const deleteAction = id => ({
  type: 'DELETE',
  payload: id,
});


const bearerToken = () => cookies.load('auth');

export const init = () => (dispatch) => {
  superagent.get(API)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .then(res => dispatch(initAction(res.body)))
    .catch(console.error);
};

export const create = payload => (dispatch) => {
  superagent.post(API)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .send(payload)
    .then(res => dispatch(createAction(res.body)))
    .catch(console.error);
};

export const updateData = payload => (dispatch) => {
  const url = `${API}`;
  console.log();
  superagent.put(url)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .send(payload)
    .then(() => dispatch(updateAction(payload)))
    .catch(console.error);
};

export const remove = id => (dispatch) => {
  const url = `${API}/${id}`;
  superagent.delete(url)
    .set('Authorization', `Bearer ${bearerToken()}`)
    .then(() => dispatch(deleteAction(id)))
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
      const metadata = {
        path: res.body.url,
        filename: data.filename,
        description: data.description,
      };
      metadata.visualAsset = null;
      delete metadata.visualAsset;
      dispatch(create(metadata));
    })
    .catch(e => console.error('ERROR', e.message));
};
