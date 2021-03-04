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
import GiphyCarousel from './GiphyCarousel/GiphyCarousel';
import {SvgXml} from 'react-native-svg';
import GifButton from './assets/gifbutton.svg';
import CloseButton from './assets/closebutton.svg';

const App: () => React$Node = () => {
  const API_KEY = 'Rf18Q7xJzS3GY38swE3RkYX5PH3Axhpw';
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGif, setSelectedGif] = useState(null);
  const onPress = (gif) => {
    setSelectedGif(gif);
    setVisible(false);
    setSearchTerm('');
  };

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
                  setVisible(!visible);
                }}>
                <SvgXml
                  width="24"
                  height="24"
                  xml={!visible ? GifButton : CloseButton}
                />
              </Pressable>
            </View>
            <View
              style={{
                flex: 15,
                marginHorizontal: 10,
              }}>
              <TextInput
                placeholder={!visible ? 'Send message' : 'Search GIFs in Giphy'}
                placeholderTextColor="#8F8F8F"
                style={styles.textInput}
                onChangeText={(text) => setSearchTerm(text)}
                value={searchTerm}
              />
            </View>
          </View>
          <GiphyCarousel
            apiKey={API_KEY}
            visible={visible}
            searchTerm={searchTerm}
            onPress={onPress}
          />
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
});

export default App;
