import {gql} from "@apollo/client";

export const getAllCompanies = gql`
 query {
    recordCompanies {
      id
      name
      numOfAlbums
      country
    }
  }`;


export const getCompany = gql`
query Query($id: String!){
    getCompanyById(_id: $id) {
        country
        albums {
            id
            title
        }
        id
        foundedYear
        name
        numOfAlbums
  }


}`;