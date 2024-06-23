import { gql } from '@apollo/client';

export const GET_DETAIL_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      image
    }
  }
`;
