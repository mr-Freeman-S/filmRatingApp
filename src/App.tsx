import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import FilmCard from './screens/FilmCard';
import FilmsList from './screens/FilmsList/FilmsList';
import ErrorPage from './screens/ErrorPage';

export type RootStackParamList = {
  FilmsList: undefined;
  FilmCard: {filmId: number};
  Error: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FilmsList" component={FilmsList} />
        <Stack.Screen name="FilmCard" component={FilmCard} />
        <Stack.Screen name="Error" component={ErrorPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
