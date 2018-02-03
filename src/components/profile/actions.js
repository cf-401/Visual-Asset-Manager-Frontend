import superagent from 'superagent';
import cookie from 'react-cookies';

let API = `${__API_URL__}`;

export const categoryInitialize = () => dispatch => {

    superagent.get(API)
        .set('Authorization', 'Bearer ' + bearerToken())
        .then(res => dispatch(initAction(res.body)) )
        .catch(console.error);

}

export const categoryCreate = payload => dispatch => {

    // payload._id = uuid();

    superagent.post(API)
        .set('Authorization', 'Bearer ' + bearerToken())
        .send(payload)
        .then(res => dispatch(createAction(res.body)) )
        .catch(console.error);

};

export const categoryUpdate = payload => dispatch => {

    let URL = `${API}/${payload._id}`;

    superagent.put(URL)
        .set('Authorization', 'Bearer ' + bearerToken())
        .send(payload)
        .then(res => dispatch(updateAction(res.body)) )
        .catch(console.error);

};


export const categoryDelete = payload => dispatch => {

  let URL = `${API}/${payload._id}`;

  superagent.delete(URL)
    .send(payload)
    .then(res => {
      console.log('!!!!', payload)
      dispatch(deleteAction(payload));
    })
    .catch(console.error);
};

const bearerToken = () => {
    return cookie.load('auth');
};

const initAction = list => ({
   type: 'INIT',
   payload: list
});

const createAction = category => ({
    type: 'CREATE',
    payload: category,
});

const updateAction = category => ({
  type: 'UPDATE',
  payload: category,
});

const deleteAction = category => ({
  type: 'DELETE',
  payload: category,
});
