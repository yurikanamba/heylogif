import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const GiphyCarousel: () => React$Node = ({
  apiKey,
  gifCarouselState,
  dispatch,
}) => {
  const BASE_URL = 'http://api.giphy.com/v1/gifs';
  const carouselEl = useRef(null);

  useEffect(() => {
    if (gifCarouselState.visible) {
      fetchGifs();
    }
  }, [gifCarouselState.visible, gifCarouselState.searchTerm]);

  async function fetchGifs() {
    try {
      if (carouselEl !== null && carouselEl.current !== null) {
        carouselEl.current.scrollToOffset({animated: true, offset: 0});
      }
      const endpoint = gifCarouselState.searchTerm
        ? `${BASE_URL}/search?api_key=${apiKey}&q=${gifCarouselState.searchTerm}&limit=10&offset=0`
        : `${BASE_URL}/trending?api_key=${apiKey}&limit=10&offset=0`;
      const resJson = await fetch(endpoint);
      const res = await resJson.json();
      dispatch({type: 'SET_GIFS', gifs: res.data});
    } catch (error) {
      console.warn(error);
    }
  }

  async function fetchMoreGifs() {
    try {
      const endpoint = gifCarouselState.searchTerm
        ? `${BASE_URL}/search?api_key=${apiKey}&q=${gifCarouselState.searchTerm}&limit=10&offset=${gifCarouselState.offset}`
        : `${BASE_URL}/trending?api_key=${apiKey}&limit=10&offset=${gifCarouselState.offset}`;
      const resJson = await fetch(endpoint);
      const res = await resJson.json();
      dispatch({type: 'SET_MORE_GIFS', gifs: res.data});
      dispatch({type: 'INCREASE_OFFSET'});
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <>
      {gifCarouselState.visible && gifCarouselState.gifs && (
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={gifCarouselState.gifs}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  const imageSrc = item.images.original.url;
                  dispatch({type: 'SELECT_GIF', selectedGif: imageSrc});
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
              fetchMoreGifs();
            }}
            ref={carouselEl}
          />
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
});

export default GiphyCarousel;
