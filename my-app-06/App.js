import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';

import Router from "./components/router";
import store from "./redux/store";
import Watcher from "./components/Watcher";

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />  
        <Watcher />     
      </NavigationContainer>
    </Provider>
    
  );
}