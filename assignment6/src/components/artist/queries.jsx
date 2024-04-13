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

export const getSongsByArtist =gql`
query Query($id: String!) {
  getSongsByArtistId(artistId: $id) {
    title
    id
  }
}
`;

export const addArtist = gql`
mutation Mutation($name: String!, $dateFormed: Date!, $members: [String!]!) {
  addArtist(name: $name, date_formed: $dateFormed, members: $members) {
    id
  }
}
`;