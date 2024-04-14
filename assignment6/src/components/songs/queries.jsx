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

  export const addSong = gql`
  mutation AddSong($title: String!, $duration: String!, $albumId: String!) {
    addSong(title: $title, duration: $duration, albumId: $albumId) {
      id
    }
  }`;

  export const editSong = gql`
  mutation EditSong($id: String!, $title: String, $duration: String, $albumId: String) {
  editSong(_id: $id, title: $title, duration: $duration, albumId: $albumId) {
    id
  }
}`;

export const deleteSong = gql`
  mutation RemoveSong($id: String!) {
    removeSong(_id: $id) {
      id
    }
}`;