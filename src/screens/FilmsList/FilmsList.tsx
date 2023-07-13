import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Props} from '../../App';
import FilmItem from './FilmItem';
import {filmServices} from '../../services/filmService';
import {FilmItemType} from '../../types/filmsListType';
import {FlashList} from '@shopify/flash-list';

type FilmsListProps = {
  navigation: Props['navigation'];
};
const FilmsList: React.FC<FilmsListProps> = ({navigation}) => {
  const [pageCount, setPageCount] = useState<number>(1);
  const [filmsList, setFilmsList] = useState<FilmItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cardTouchHandler = (id: number) => {
    navigation.navigate('FilmCard', {filmId: id});
  };
  const fetchFilmsList = async () => {
    setIsLoading(true);
    try {
      const response = await filmServices.fetchFilmsList(pageCount);
      setFilmsList(prevList => [...prevList, ...response.results]);
    } catch (error) {
      return navigation.navigate('Error');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchFilmsList();
  }, [pageCount]);

  const renderFilmItem = ({item}: {item: FilmItemType}) => (
    <FilmItem item={item} cardTouchHandler={cardTouchHandler} />
  );

  const renderFooter = () => {
    if (!isLoading) {
      return null;
    }

    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  const endReachedHandler = () => {
    setPageCount(pageCount + 1);
  };
  return (
    <FlashList
      data={filmsList}
      renderItem={renderFilmItem}
      keyExtractor={(itemm, index) => index.toString()}
      onEndReached={endReachedHandler}
      onEndReachedThreshold={0.25}
      ListFooterComponent={renderFooter}
      estimatedItemSize={200}
    />
  );
};

export default FilmsList;
