import { gql } from "@apollo/client";

export const getSong = gql`
query GetSongById($id: String!) {
    getSongById(_id: $id) {
      albumId {
        title
        id
        artist {
          name
          id
        }
      }
      title
      duration
      id
    }
  }`;