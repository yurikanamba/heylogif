import {useReducer} from 'react';

const initialState = {
  on: false,
  search: '',
  selectedGif: null,
  gifs: [],
  offset: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SWITCH':
      return {
        ...initialState,
        on: action.payload,
      };
    case 'HANDLE_SEARCH':
      return {
        ...state,
        search: action.payload,
        offset: 0,
      };
    case 'SELECT_GIF':
      return {
        ...initialState,
        selectedGif: action.selectedGif,
      };
    case 'SET_GIFS':
      return {
        ...state,
        gifs: action.gifs,
        offset: 0,
      };
    case 'INCREASE_OFFSET':
      return {
        ...state,
        offset: state.offset + 11,
      };
    case 'SET_MORE_GIFS':
      return {
        ...state,
        gifs: [...state.gifs, ...action.gifs],
      };
    default:
      return state;
  }
};

export const useGiphyCarouselReducer = () => {
  return useReducer(reducer, initialState);
};
