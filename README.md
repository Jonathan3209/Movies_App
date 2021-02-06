# Movies_App - Movies database app 

The app shows information related to movies, and enables to manage multiple favorite watchlists.
This app is built in React-Native Framework.

## Getting Started

Clone the Repository by Typing

```
git clone https://github.com/Jonathan3209/Movies_App
```
```
cd Movies_App
```
```
git fetch
```

### Installing

Install npm packages

```
npm i
```
Install pod
```
cd ios
```
```
pod install
```


Go back to the project directory
```
cd ..
```
Run the app on ios

```
react-native run-ios
```
Run the app on android

```
react-native run-android
```
### Architecture

The app is build with React-Navigation Bottom-Bar that navigates between 2 Container Components,
Movie and Watchlist.
The app uses React-Native's AsyncStorage for storing movies related data and watchlists.
Both the AsyncStorage and the app's API are built in Higher Order Component (HOC) design pattern.


## Built With

* [react-navigation](https://reactnavigation.org/docs/getting-started) - For bottom bar and navigation
* [react-native-popup-dialog](https://www.npmjs.com/package/react-native-popup-dialog) - For popups
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) - For using icons

## Authors

* **Jonathan Peretz** 

