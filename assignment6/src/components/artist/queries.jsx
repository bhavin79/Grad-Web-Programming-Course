import { gql } from "@apollo/client";

export const getArtits = gql`
    query {
        artists {
            id
            name
            members
            numOfAlbums
            dateFormed
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
    duration
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

export const updateArtist = gql`
mutation Mutation($id: String!, $name: String, $dateFormed: Date, $members: [String!]) {
  editArtist(_id: $id, name: $name, date_formed: $dateFormed, members: $members) {
    id
  }
}
`;


export const deleteArtist = gql`
mutation Mutation($id: String!) {
  removeArtist(_id: $id) {
    id
  }
}`;