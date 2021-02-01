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

const App: () => React$Node = () => {
  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('');
  const [selectedGif, setSelectedGif] = useState(null);

  async function fetchGifs() {
    try {
      const API_KEY = 'Rf18Q7xJzS3GY38swE3RkYX5PH3Axhpw';
      const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
      const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}`);
      const res = await resJson.json();
      setGifs(res.data);
      console.log(gifs);
    } catch (error) {
      console.warn(error);
    }
  }
  function onEdit(newTerm) {
    updateTerm(newTerm);
    fetchGifs();
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
                  console.log('pressed gif button');
                }}>
                <SvgXml width="24" height="24" xml={GifButton} />
              </Pressable>
            </View>
            <View
              style={{
                flex: 15,
                marginHorizontal: 10,
              }}>
              <TextInput
                placeholder="Search GIFs in Giphy..."
                placeholderTextColor="#8F8F8F"
                style={styles.textInput}
                onChangeText={(text) => onEdit(text)}
              />
            </View>
          </View>
          <View>
            <FlatList
              horizontal
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
            />
          </View>
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
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'darkblue',
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
});

export default App;
