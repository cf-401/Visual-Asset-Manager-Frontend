/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import reducer from '../reducer';

describe('labels reducer', () => {
  const database = ['label1', 'label2', 'label3', 'label4'];
  const initalState = {
    allLabels: [],
    currentLabels: [],
  };
  describe('initalize labels', () => {
    test('reads all the possible labels into the application states', () => {
      const newState = reducer(initalState, { type: 'INIT_LABELS', payload: database });
      expect(newState).toEqual({
        allLabels: ['label1', 'label2', 'label3', 'label4'],
        currentLabels: [],
      });
    });
  });

  describe('create new label', () => {
    test('it takes a new label and adds it to the all labels options', () => {
      const newState = reducer(initalState, { type: 'CREATE', payload: 'a new label' });
      expect(newState).toEqual({
        allLabels: ['a new label'],
        currentLabels: [],
      });
    });
  });

  describe('update selections', () => {
    test('sets current selections to a new array', () => {
      const updatedSlection = ['label1', 'label4', 'another label'];
      const newState = reducer(initalState, { type: 'INIT_LABELS', payload: database });
      const updatedState = reducer(newState, { type: 'UPDATE', payload: updatedSlection });

      expect(newState).toEqual({
        allLabels: ['label1', 'label2', 'label3', 'label4'],
        currentLabels: [],
      });
      expect(updatedState).toEqual({
        allLabels: ['label1', 'label2', 'label3', 'label4'],
        currentLabels: ['label1', 'label4', 'another label'],
      });
    });
  });

  describe('removes a label from both the current selections and from the all selections ', () => {
    test('it takes and id and removes the item', () => {
      const newState = reducer(initalState, { type: 'INIT_LABELS', payload: database });
      const removedState = reducer(newState, { type: 'DELETE', payload: 'label1' });

      expect(newState).toEqual({
        allLabels: ['label1', 'label2', 'label3', 'label4'],
        currentLabels: [],
      });
      expect(removedState).toEqual({
        allLabels: ['label2', 'label3', 'label4'],
        currentLabels: ['label2', 'label3', 'label4'],
      });
    });
  });
});
