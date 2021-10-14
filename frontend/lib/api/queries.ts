import {gql} from "graphql-tag";

export const NEARBY_INSTITUTIONS_QUERY = gql`
	query nearbyInstitutions($cityOrZip: String!, $radius: Int!, $skip: Int, $take: Int) {
		nearbyInstitutions(cityOrZip: $cityOrZip, radius: $radius, skip: $skip, take: $take) {
			id
			name
			city
			gender
			ageFrom
			ageTo
			photo {
				src
			}
			placesAvailable
			placesTotal
			lastUpdated
		}
	}
`;

export const INSTITUTIONS_QUERY = gql`
	query institutions($skip: Int, $take: Int) {
		institutionsCount
		institutions(skip: $skip, take: $take) {
			id
			name
			city
			gender
			ageFrom
			ageTo
			photo {
				src
			}
			placesAvailable
			placesTotal
			lastUpdated
		}
	}
`;
