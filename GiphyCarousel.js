import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const GiphyCarousel: () => React$Node = ({
  visible,
  apiKey,
  searchTerm,
  setSelectedGif,
  setNoResults,
}) => {
  const BASE_URL = 'http://api.giphy.com/v1/gifs';
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(10);

  useEffect(() => {
    fetchGifs(searchTerm);
  }, [searchTerm]);

  async function fetchGifs(searchTerm) {
    try {
      const endpoint = searchTerm
        ? `${BASE_URL}/search?api_key=${apiKey}&q=${searchTerm}&limit=10`
        : `${BASE_URL}/trending?api_key=${apiKey}&limit=10`;
      const resJson = await fetch(endpoint);
      const res = await resJson.json();
      setGifs(res.data);
      if (searchTerm && res.data <= 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async function fetchMoreGifs() {
    try {
      const endpoint = searchTerm
        ? `${BASE_URL}/search?api_key=${apiKey}&q=${searchTerm}&limit=10&offset=${offset}`
        : `${BASE_URL}/trending?api_key=${apiKey}&limit=10&offset=${offset}`;
      const resJson = await fetch(endpoint);
      const res = await resJson.json();
      setOffset(offset + 10);
      setGifs([...gifs, ...res.data]);
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <>
      {visible && (
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={gifs}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  const imageSrc = item.images.original.url;
                  setSelectedGif(imageSrc);
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
