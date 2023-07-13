import {$api} from './axios';
import {FilmsFetchResponseType} from '../types/filmsListType';
import {FilmFetchResponseType} from '../types/filmDescriptionType';
import {FilterType} from '../screens/FilmsList/FilmsList';

export const filmServices = {
  async fetchFilmsList(page: number, filteredBy: FilterType) {
    const {data} = await $api.get<FilmsFetchResponseType>(
      `movie/${filteredBy}?page=${page}`,
    );
    return data;
  },
  async fetchFilmDescription(id: number) {
    const {data} = await $api.get<FilmFetchResponseType>(`movie/${id}`);
    return data;
  },
};
