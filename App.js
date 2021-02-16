import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  TextInput,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import GifButton from './assets/gifbutton.svg';
import CloseButton from './assets/closebutton.svg';
import GiphyCarousel from './GiphyCarousel';

const App: () => React$Node = () => {
  const API_KEY = 'Rf18Q7xJzS3GY38swE3RkYX5PH3Axhpw';
  const [gifCarouselSwitch, updateGifCarouselSwitch] = useState(false);
  const [term, updateTerm] = useState('');
  const [selectedGif, setSelectedGif] = useState(null);
  const [noResults, setNoResults] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Heylo Gif Carousel Demo</Text>
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
                  updateGifCarouselSwitch(!gifCarouselSwitch);
                  updateTerm('');
                }}>
                <SvgXml
                  width="24"
                  height="24"
                  xml={!gifCarouselSwitch ? GifButton : CloseButton}
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
                  !gifCarouselSwitch ? 'Send message' : 'Search GIFs in Giphy'
                }
                placeholderTextColor="#8F8F8F"
                style={styles.textInput}
                onChangeText={(term) => {
                  updateTerm(term);
                }}
                value={term}
              />
            </View>
          </View>
          <GiphyCarousel
            visible={gifCarouselSwitch}
            apiKey={API_KEY}
            searchTerm={term}
            setSelectedGif={setSelectedGif}
            setNoResults={setNoResults}
          />
          {noResults && (
            <View style={styles.noResultContainer}>
              <Text style={styles.noResultText}>No GIFs found for {term}</Text>
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
