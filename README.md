# Gif Carousel

This component (written in React Native) renders a carousel of gifs using the giphy API and displays the gif that you picked

![image](https://user-images.githubusercontent.com/52552266/106423886-9f012a80-64a4-11eb-8a57-fc7df0afd7ea.png)

https://user-images.githubusercontent.com/52552266/127375090-4902c260-6bb7-4ec2-b9b1-191beb929049.mov

# How to run and install

- `$ git clone git@github.com:yurikanamba/heylogif.git`
- `$ cd MyApp`
- `$ yarn`

- Mobile
  - [iOS]
    - `$ cd ios`
    - `$ pod install`
    - `$ yarn start`
    - `$ yarn ios`

# How it works

First you will need to create a [Giphy API Key](https://developers.giphy.com/docs/api#quick-start-guide). Import the `GiphyCarousel` component and pass it the following props:
- apiKey as a string
- visible as a boolean (to hide or display the carousel)
- searchTerm as a string (to pass gif keyword to the Giphy API)
- onPress as a function (the function you want to run when a gif is selected)

An example can be found in [`App.js`](https://github.com/yurikanamba/heylogif/blob/3fcc96ceaacfcd87126549a9afc84dfaa5ad5fd7/App.js#L76).
