import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Props} from '../App';

type FilmsListProps = {
  navigation: Props['navigation'];
};
const FilmCard: React.FC<FilmsListProps> = ({navigation, route}) => {
  const {filmId} = route.params;
  const {filmData, setFilmData} = useState({})
  useEffect(() => {},[])
  return (
    <View>
      <Text>FilmScreen</Text>
    </View>
  );
};

export default FilmCard;
