import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from '../App';

const FilmsList = ({navigation}: Props) => {
  const cardTouchHandler = () => {
    navigation.navigate('FilmCard', {filmId: '1'});
  };

  return (
    <View>
      <TouchableOpacity onPress={cardTouchHandler}>
        <Text>Move t Film</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilmsList;
