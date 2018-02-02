import reducer from '../reducer';

describe('file data reducer', () => {
  const initalState = [];
  const mockFileData = {
    name: 'name',
    path: 'path',
    description: 'description',
    user_name: 'user name',
    _id: 'id',
  };

  describe('create new file data', () => {
    test('it takes new file data and adds it to state', () => {
      const newState = reducer(initalState, { type: 'CREATE', payload: mockFileData });

      expect(newState).toEqual([{
        description: 'description', _id: 'id', name: 'name', path: 'path', user_name: 'user name',
      }]);
    });
  });

  describe('update file data', () => {
    test('it take filedata and updates based on id', () => {
      const updatedFileData = {
        name: 'name',
        path: 'updated-path',
        description: 'description',
        user_name: 'user name',
        _id: 'id',
      };
      const newState = reducer(initalState, { type: 'CREATE', payload: mockFileData });
      const updatedState = reducer(newState, { type: 'UPDATE', payload: updatedFileData });

      expect(newState).toEqual([{
        description: 'description', _id: 'id', name: 'name', path: 'path', user_name: 'user name',
      }]);
      expect(updatedState).toEqual([{
        description: 'description', _id: 'id', name: 'name', path: 'updated-path', user_name: 'user name',
      }]);
    });
  });

  describe('remove file data', () => {
    test('it takes and id and removes the item', () => {
      const newState = reducer(initalState, { type: 'CREATE', payload: mockFileData });
      const removedState = reducer(newState, { type: 'DELETE', payload: mockFileData._id });

      expect(newState).toEqual([{
        description: 'description', _id: 'id', name: 'name', path: 'path', user_name: 'user name',
      }]);
      expect(removedState).toEqual([]);
    });
  });

  describe('read file data', () => {
    test('gets all data in the state', () => {
      const newState = reducer(initalState, { type: 'INIT' });

      expect(newState).toEqual([]);
    });
  });
});
