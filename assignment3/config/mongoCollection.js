import {dbConnection} from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }
    return _col;
  };
};

export const artists = getCollectionFn('artists');
export const albums = getCollectionFn("albums");
export const recordcompanies = getCollectionFn("recordcompanies");
export const songs = getCollectionFn("songs")
