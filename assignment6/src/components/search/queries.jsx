import { gql } from "@apollo/client";

export const getArtistByName = gql`
query Query($searchTerm: String!) {
  searchArtistByArtistName(searchTerm: $searchTerm) {
    id
    dateFormed
    name
    numOfAlbums
    members
  }
}`;

export const getAlbumsByGenre = gql`query GetSongById($genre: MusicGenre!) {
  albumsByGenre(genre: $genre) {
    title
    artist {
      name
      id
    }
    releaseDate
    id
    genre
    recordCompany {
      name
      id
    }
  }
}`;


export const getCompanies = gql`query CompanyByFoundedYear($min: Int!, $max: Int!) {
  companyByFoundedYear(min: $min, max: $max) {
    name
    numOfAlbums
    country
    id
  }
}`;

export const getSongsByTitle = gql`query SearchSongByTitle($searchTitleTerm: String!) {
  searchSongByTitle(searchTitleTerm: $searchTitleTerm) {
    id
    title
    albumId {
      id
      title
      artist {
        name
        id
      }
    }
  }
}`;