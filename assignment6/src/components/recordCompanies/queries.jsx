import {gql} from "@apollo/client";

export const getAllCompanies = gql`
 query {
    recordCompanies {
      id
      name
      numOfAlbums
      country
      foundedYear
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

export const addCompany = gql`
 mutation AddCompany($name: String!, $foundedYear: Int!, $country: String!) {
    addCompany(name: $name, founded_year: $foundedYear, country: $country) {
      id
    }
}`;

export const editCompany = gql`
  mutation EditCompany($id: String!, $name: String, $foundedYear: Int, $country: String) {
    editCompany(_id: $id, name: $name, founded_year: $foundedYear, country: $country) {
      id
    }
}`;

export const removeCompany = gql`
  mutation RemoveCompany($id: String!) {
    removeCompany(_id: $id) {
      id
    }
}`;