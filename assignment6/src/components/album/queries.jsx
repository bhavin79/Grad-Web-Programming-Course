import {gql} from "@apollo/client";

export const getAlbums = gql`
 query {
    albums {
      id
    releaseDate
    artist {
      name
    }
    title
    genre
    recordCompany {
      name
    }
  }
  }`;

  export const getAlbumById = gql`
   query getALbum($id: String!) {
      getAlbumById(_id: $id) {
        id
        songs {
          id
          title
        }
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