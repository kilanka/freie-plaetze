import {useInstitutionTypesQuery} from "../api/generated";

export function useInstitutionTypes() {
	const {data} = useInstitutionTypesQuery();
	return data?.institutionTypes ?? [];
}
