import React, {memo} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {FilmItemType} from '../../types/filmsListType';

type FilmItemProps = {
  cardTouchHandler: (id: number) => void;
  item: FilmItemType;
};

const FilmItem = ({item, cardTouchHandler}: FilmItemProps) => {
  const backgroundImageURI =
    'https://image.tmdb.org/t/p/w500' + item.backdrop_path;

  return (
    <TouchableOpacity onPress={() => cardTouchHandler(item.id)}>
      <ImageBackground
        source={{uri: backgroundImageURI}}
        style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.rating}>Rating: {item.vote_average}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 200,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    color: 'white',
    fontSize: 14,
  },
});

export default memo(FilmItem);
