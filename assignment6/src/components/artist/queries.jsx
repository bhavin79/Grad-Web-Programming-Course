import { gql } from "@apollo/client";

export const getArtits = gql`
    query {
        artists {
            id
            name
            members
            numOfAlbums
        }
    }
`;


export const getArtist = gql`
query Query($id: String!) {
  getSongsByArtistId(artistId: $id) {
    title
    id
  }
  getArtistById(_id: $id) {
    members
    name
    numOfAlbums
    dateFormed
    id
    albums {
      title
      id
    }
  }
}`;