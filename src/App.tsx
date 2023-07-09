import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import FilmCard from './screens/FilmCard';
import FilmsList from './screens/HomeScreen';

export type RootStackParamList = {
  FilmsList: undefined;
  FilmCard: {filmId: string};
};

export type Props = NativeStackScreenProps<RootStackParamList>;


const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FilmsList" component={FilmsList} />
        <Stack.Screen name="FilmCard" component={FilmCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
