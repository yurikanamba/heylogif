const initialGifCarouselState = {
  visible: false,
  searchTerm: '',
  selectedGif: null,
  gifs: [],
  offset: 10,
};

const gifCarouselReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SWITCH':
      return {
        ...state,
        visible: !state.visible,
        searchTerm: '',
        gifs: [],
        offset: 10,
      };
    case 'HANDLE_SEARCH':
      return {
        ...state,
        searchTerm: action.payload,
        offset: 10,
      };
    case 'SELECT_GIF':
      return {
        ...state,
        visible: false,
        searchTerm: '',
        gifs: [],
        selectedGif: action.selectedGif,
      };
    case 'SET_GIFS':
      return {
        ...state,
        gifs: action.gifs,
        offset: 10,
      };
    case 'SET_MORE_GIFS':
      return {
        ...state,
        gifs: [...state.gifs, ...action.gifs],
      };
    case 'INCREASE_OFFSET':
      return {
        ...state,
        offset: state.offset + 10,
      };
    default:
      return state;
  }
};

export {initialGifCarouselState, gifCarouselReducer};
