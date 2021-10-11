import gql from "graphql-tag";

export const INSTITUTIONS_QUERY = gql`
  query institutions($skip: Int, $take: Int) {
    institutionsCount
    institutions(skip: $skip, take: $take) {
      id
      name
      placesTotal
      placesAvailable
      city
      gender
      ageFrom
      ageTo
      logo {
        src
      }
      photo {
        src
      }
    }
  }
`;
