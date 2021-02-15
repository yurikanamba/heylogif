import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import GifButton from './assets/gifbutton.svg';
import CloseButton from './assets/closebutton.svg';

const App: () => React$Node = () => {
  const API_KEY = 'Rf18Q7xJzS3GY38swE3RkYX5PH3Axhpw';
  const BASE_URL = 'http://api.giphy.com/v1/gifs';
  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('');
  const [selectedGif, setSelectedGif] = useState(null);
  const [mode, setMode] = useState('message');
  const [offset, setOffset] = useState(10);
  const [noResults, setNoResults] = useState(false);

  async function fetchGifs(keyword) {
    try {
      const endpoint = keyword
        ? `${BASE_URL}/search?api_key=${API_KEY}&q=${keyword}&limit=10`
        : `${BASE_URL}/trending?api_key=${API_KEY}&limit=10`;
      const resJson = await fetch(endpoint);
      const res = await resJson.json();
      setGifs(res.data);
      if (keyword && res.data <= 0) {
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
      const endpoint = term
        ? `${BASE_URL}/search?api_key=${API_KEY}&q=${term}&limit=10&offset=${offset}`
        : `${BASE_URL}/trending?api_key=${API_KEY}&limit=10&offset=${offset}`;
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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Heylo Gif picker Demo</Text>
          </View>
          {selectedGif && (
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: selectedGif}}
            />
          )}
          <View style={styles.textInputArea}>
            <View
              style={{
                flex: 1,
                marginLeft: 10,
              }}>
              <Pressable
                style={styles.gifBtn}
                onPress={() => {
                  if (mode === 'message') {
                    updateTerm('');
                    fetchGifs();
                    setMode('gif');
                  } else {
                    setMode('message');
                    setGifs([]);
                    setOffset(10);
                    updateTerm('');
                  }
                }}>
                <SvgXml
                  width="24"
                  height="24"
                  xml={mode === 'message' ? GifButton : CloseButton}
                />
              </Pressable>
            </View>
            <View
              style={{
                flex: 15,
                marginHorizontal: 10,
              }}>
              <TextInput
                placeholder={
                  mode === 'message' ? 'Send message' : 'Search GIFs in Giphy'
                }
                placeholderTextColor="#8F8F8F"
                style={styles.textInput}
                onChangeText={(keyword) => {
                  setGifs([]);
                  setOffset(10);
                  updateTerm(keyword);
                  fetchGifs(keyword);
                }}
                value={term}
              />
            </View>
          </View>
          {noResults && (
            <View style={styles.noResultContainer}>
              <Text style={styles.noResultText}>No GIFs found for {term}</Text>
            </View>
          )}
          {mode === 'gif' && (
            <View>
              <FlatList
                horizontal
                data={gifs}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      const imageSrc = item.images.original.url;
                      setSelectedGif(imageSrc);
                      setMode('message');
                      setGifs([]);
                      setOffset(10);
                      updateTerm('');
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  textInputArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  gifBtn: {
    alignItems: 'center',
    width: 25,
    height: 25,
  },
  textInput: {
    borderColor: '#8F8F8F',
    borderWidth: 1,
    borderRadius: 19,
    width: '100%',
    height: 38,
    paddingHorizontal: 10,
  },
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

export default App;
