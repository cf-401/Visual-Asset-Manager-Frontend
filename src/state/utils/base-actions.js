export const init = payload => ({
  type: 'INIT',
  payload,
});

export const create = payload => ({
  type: 'CREATE',
  payload,
});

export const update = payload => ({
  type: 'UPDATE',
  payload,
});

export const remove = id => ({
  type: 'DELETE',
  payload: id,
});
