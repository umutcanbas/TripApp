import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routes from './routes';

import Home from '../screens/App/Home/Home';
import ContinentPage from '../screens/App/Home/ContinentPage';
import CountryDetail from '../screens/App/Home/CountryDetail';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.HOME} component={Home} />
      <Stack.Screen name={routes.CONTINENT_PAGE} component={ContinentPage} />
      <Stack.Screen name={routes.COUNTRY_DETAIL} component={CountryDetail} />

    </Stack.Navigator>
  );
};

export default AuthNavigator;
