import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {Props, RootStackParamList} from '../App';
import {FilmFetchResponseType} from '../types/filmDescriptionType';
import {filmServices} from '../services/filmService';
import {RouteProp} from '@react-navigation/native';

type FilmsCardProps = {
  navigation: Props['navigation'];
  route: RouteProp<RootStackParamList, 'FilmCard'>;
};

const FilmCard: React.FC<FilmsCardProps> = ({navigation, route}) => {
  const {filmId} = route.params;
  const [filmData, setFilmData] = useState<FilmFetchResponseType>(
    {} as FilmFetchResponseType,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchFilm = async (id: number) => {
    setIsLoading(true);
    try {
      const film = await filmServices.fetchFilmDescription(id);
      setFilmData(film);
    } catch (error) {
      navigation.navigate('Error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFilm(filmId);
  }, [filmId]);

  const openHomepage = () => {
    if (filmData.homepage) {
      Linking.openURL(filmData.homepage);
    }
  };
  const backgroundImageLink =
    'https://image.tmdb.org/t/p/original' + filmData.backdrop_path;

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  return (
    <ImageBackground
      source={{uri: backgroundImageLink}}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{filmData.title}</Text>
          <Text style={styles.rating}>Rating: {filmData.vote_average}</Text>
          <Text style={styles.budget}>Budget: {filmData.budget} $</Text>
          <Text style={styles.overview}>{filmData.overview}</Text>
          <Text style={styles.releaseDate}>
            {`Release Date: ${filmData.release_date}`}
          </Text>
          <Text style={styles.homepage} onPress={openHomepage}>
            Website: {filmData.homepage}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  rating: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
  },
  budget: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
  },
  overview: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
  },
  releaseDate: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
  },
  homepage: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'white',
  },
});

export default FilmCard;
