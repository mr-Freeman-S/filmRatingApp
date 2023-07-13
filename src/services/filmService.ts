import {$api} from './axios';
import {FilmsFetchResponseType} from '../types/@filmsListType';

export const filmServices = {
  async fetchFilmsList(page: number) {
    const {data} = await $api.get<FilmsFetchResponseType>(
      `movie/popular?page=${page}`,
    );
    return data;
  },
};
