import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Props} from '../../App';
import FilmItem from './FilmItem';
import {filmServices} from '../../services/filmService';
import {FilmItemType} from '../../types/filmsListType';
import {FlashList} from '@shopify/flash-list';
import DropDownPicker from 'react-native-dropdown-picker';

type FilmsListProps = {
  navigation: Props['navigation'];
};
export type FilterType = 'popular' | 'top_rated' | 'upcoming';

const FilmsList: React.FC<FilmsListProps> = ({navigation}) => {
  const [pageCount, setPageCount] = useState<number>(1);
  const [filmsList, setFilmsList] = useState<FilmItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filteredBy, setFilterBy] = useState<FilterType>('popular');
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [itemsPicker, setItemsPicker] = useState([
    {label: 'Popular', value: 'popular'},
    {label: 'Top rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'},
  ]);

  const cardTouchHandler = (id: number) => {
    navigation.navigate('FilmCard', {filmId: id});
  };
  const fetchFilmsList = async () => {
    setIsLoading(true);
    try {
      const response = await filmServices.fetchFilmsList(pageCount, filteredBy);
      setFilmsList(prevList => [...prevList, ...response.results]);
    } catch (error) {
      return navigation.navigate('Error');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchFilmsList();
  }, [pageCount]);

  useEffect(() => {
    setPageCount(1);
    setFilmsList([]);
    fetchFilmsList();
  }, [filteredBy]);
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
    <View style={styles.container}>
      <DropDownPicker
        open={openPicker}
        value={filteredBy}
        items={itemsPicker}
        setOpen={setOpenPicker}
        setValue={setFilterBy}
        setItems={setItemsPicker}
      />
      <FlashList
        data={filmsList}
        renderItem={renderFilmItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={endReachedHandler}
        onEndReachedThreshold={0.25}
        ListFooterComponent={renderFooter}
        estimatedItemSize={350}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FilmsList;
