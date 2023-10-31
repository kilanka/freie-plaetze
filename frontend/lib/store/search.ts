import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

import type {AppState} from ".";
import {InstitutionGenderType} from "../api/generated";
import {stringToInt} from "../util";

export const searchSlice = createSlice({
	name: "search",
	initialState: {
		cityOrZip: "",
		radius: 40,
		areFiltersActive: false,
		age: "",
		paragraphs: [] as string[],
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
			{payload}: PayloadAction<{age: string; paragraphs: string[]; gender: "" | "f" | "m"}>
		) {
			state.age = payload.age;
			state.paragraphs = payload.paragraphs;
			state.gender = payload.gender;
		},
	},

	extraReducers(builder) {
		builder.addCase<typeof HYDRATE, PayloadAction<AppState, typeof HYDRATE>>(
			HYDRATE,
			(state, {payload}) => ({...state, ...payload.search})
		);
	},
});

export const {setGeoSearch, setFiltersActive, setFilters} = searchSlice.actions;

export const selectSearch = (state: AppState) => state[searchSlice.name];

/**
 * Returns arguments for the `searchInstitutions` query
 **/
export const selectSearchArgs = createSelector(
	[
		(state) => selectSearch(state).cityOrZip,
		(state) => selectSearch(state).radius,
		(state) => selectSearch(state).areFiltersActive,
		(state) => selectSearch(state).age,
		(state) => selectSearch(state).paragraphs,
		(state) => selectSearch(state).gender,
	],
	// eslint-disable-next-line max-params
	(cityOrZip, radius, areFiltersActive, age, paragraphs, gender) => ({
		cityOrZip,
		radius,
		age: areFiltersActive && age !== "" ? stringToInt(age) : null,

		genderTypes:
			areFiltersActive && gender !== ""
				? {
						f: [InstitutionGenderType.F, InstitutionGenderType.Mixed],
						m: [InstitutionGenderType.M, InstitutionGenderType.Mixed],
				  }[gender]
				: Object.values(InstitutionGenderType),

		paragraphs: areFiltersActive ? paragraphs : null,
	})
);
