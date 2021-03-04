import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';

import {useGiphyCarouselReducer} from './GiphyCarouselReducer';

const GiphyCarousel: () => React$Node = ({
  apiKey,
  visible,
  searchTerm,
  onPress,
}) => {
  const [state, dispatch] = useGiphyCarouselReducer();
  const {gifs, on, search, offset} = state;
  const BASE_URL = 'http://api.giphy.com/v1/gifs';
  const carouselEl = useRef(null);
  const noResults = on && search !== '' && gifs.length <= 0;

  useEffect(() => {
    dispatch({type: 'TOGGLE_SWITCH', payload: visible});
  }, [visible]);

  useEffect(() => {
    dispatch({type: 'HANDLE_SEARCH', payload: searchTerm});
  }, [searchTerm]);

  useEffect(() => {
    if (on) {
      fetchGifs();
    }
  }, [on, search]);

  useEffect(() => {
    if (offset > 0) {
      fetchMoreGifs();
    }
  }, [offset]);

  async function fetchGifs() {
    try {
      if (carouselEl !== null && carouselEl.current !== null) {
        carouselEl.current.scrollToOffset({animated: true, offset: 0});
      }
      const endpoint = search
        ? `${BASE_URL}/search?api_key=${apiKey}&q=${search}&limit=10&offset=${offset}`
        : `${BASE_URL}/trending?api_key=${apiKey}&limit=10&offset=${offset}`;
      const resJson = await fetch(endpoint);
      const res = await resJson.json();
      dispatch({type: 'SET_GIFS', gifs: res.data});
    } catch (error) {
      console.warn(error);
    }
  }

  async function fetchMoreGifs() {
    try {
      const endpoint = search
        ? `${BASE_URL}/search?api_key=${apiKey}&q=${search}&limit=10&offset=${offset}`
        : `${BASE_URL}/trending?api_key=${apiKey}&limit=10&offset=${offset}`;
      const resJson = await fetch(endpoint);
      const res = await resJson.json();
      dispatch({type: 'SET_MORE_GIFS', gifs: res.data});
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <>
      {on && gifs && (
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={gifs}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  const imageSrc = item.images.original.url;
                  dispatch({type: 'SELECT_GIF', selectedGif: imageSrc});
                  onPress(imageSrc);
                }}>
                <Image
                  resizeMode="cover"
                  source={{uri: item.images.original.url}}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              dispatch({type: 'INCREASE_OFFSET'});
            }}
            ref={carouselEl}
          />
        </View>
      )}
      {noResults && (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultText}>No GIFs found for {search}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 150,
    marginHorizontal: 10,
  },
  noResultContainer: {
    marginVertical: 20,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 20,
  },
});

export default GiphyCarousel;
