import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

import {InstitutionGenderType, InstitutionTypeType} from "../api/generated";
import {stringToInt} from "../util";
import type {AppState} from ".";

export const searchSlice = createSlice({
	name: "search",
	initialState: {
		cityOrZip: "",
		radius: 40,
		areFiltersActive: false,
		age: "",
		types: [] as InstitutionTypeType[],
		gender: "" as "" | "f" | "m",
	},

	reducers: {
		setGeoSearch(state, {payload}: PayloadAction<{cityOrZip: string; radius: number}>) {
			state.cityOrZip = payload.cityOrZip;
			state.radius = payload.radius;
		},
		setFiltersActive(state, {payload}: PayloadAction<boolean>) {
			state.areFiltersActive = payload;
		},
		setFilters(
			state,
			{payload}: PayloadAction<{age: string; types: InstitutionTypeType[]; gender: "" | "f" | "m"}>
		) {
			state.age = payload.age;
			state.types = payload.types;
			state.gender = payload.gender;
		},
	},

	extraReducers: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		[HYDRATE]: (state, {payload}) => ({...state, ...payload.search}),
	},
});

export const {setGeoSearch, setFiltersActive, setFilters} = searchSlice.actions;

export const selectSearch = (state: AppState) => state[searchSlice.name];

// Returns arguments for the `searchInstitutions` query
export const selectSearchArgs = (state: AppState) => {
	const search = selectSearch(state);

	return {
		cityOrZip: search.cityOrZip,
		radius: search.radius,

		age: search.areFiltersActive && search.age !== "" ? stringToInt(search.age) : null,

		genderTypes:
			search.areFiltersActive && search.gender !== ""
				? {
						f: [InstitutionGenderType.F, InstitutionGenderType.Mixed],
						m: [InstitutionGenderType.M, InstitutionGenderType.Mixed],
				  }[search.gender]
				: Object.values(InstitutionGenderType),

		institutionTypes:
			search.areFiltersActive && search.types.length > 0
				? search.types
				: Object.values(InstitutionTypeType),
	};
};
