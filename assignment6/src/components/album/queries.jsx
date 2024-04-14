import {gql} from "@apollo/client";

export const getAlbums = gql`
 query {
    albums {
      id
    releaseDate
    artist {
      id
      name
    }
    title
    genre
    recordCompany {
      id
      name
    }
  }
  }`;

  export const getAlbumById = gql`
   query getALbum($id: String!) {
      getAlbumById(_id: $id) {
        id
        releaseDate
        title
        artist {
          id
          name
        }
        recordCompany {
          id
          name
        }
        genre
      }
}
  `;

export const getSongByAlbumId = gql`query GetSongsByAlbumId($id: String!) {
  getSongsByAlbumId(_id: $id) {
    id
    title
    duration
  }
}`;


export const addAlbum = gql`
mutation Mutation($title: String!, $releaseDate: Date!, $genre: MusicGenre!, $artistId: String!, $companyId: String!) {
  addAlbum(title: $title, releaseDate: $releaseDate, genre: $genre, artistId: $artistId, companyId: $companyId) {
    id
  }
}`;

export const editAlbum = gql`
mutation EditAlbum($id: String!, $title: String, $releaseDate: Date, $genre: MusicGenre, $artistId: String, $companyId: String) {
  editAlbum(_id: $id, title: $title, releaseDate: $releaseDate, genre: $genre, artistId: $artistId, companyId: $companyId) {
    id
  }
}`;

export const removeAlbum = gql`
mutation RemoveAlbum($id: String!) {
  removeAlbum(_id: $id) {
    id
  }
}`;
