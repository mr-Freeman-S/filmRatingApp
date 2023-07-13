import {$api} from './axios';
import {FilmsFetchResponseType} from '../types/filmsListType';
import {FilmFetchResponseType} from '../types/filmDescriptionType';

export const filmServices = {
  async fetchFilmsList(page: number) {
    const {data} = await $api.get<FilmsFetchResponseType>(
      `movie/popular?page=${page}`,
    );
    return data;
  },
  async fetchFilmDescription(id: number) {
    const {data} = await $api.get<FilmFetchResponseType>(`movie/${id}`);
    return data;
  },
};
