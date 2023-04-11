import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';

import Navigation from "./router";
import { store } from "./redux/store";

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Navigation/>         
      </NavigationContainer>
    </Provider>
    
  );
}