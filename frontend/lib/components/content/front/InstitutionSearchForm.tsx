import {SearchIcon} from "@chakra-ui/icons";
import {
	Collapse,
	Container,
	Flex,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Stack,
} from "@chakra-ui/react";
import {Select, SelectInstance, chakraComponents} from "chakra-react-select";
import {Form, FormikProvider, useFormik} from "formik";
import {FormControl, NumberInputControl, SelectControl} from "formik-chakra-ui";
import React from "react";
import {MdClose, MdOutlineFilterAlt} from "react-icons/md";
import {useSelector} from "react-redux";
import {useDebounce} from "usehooks-ts";

import {InstitutionTypeType} from "../../../api/generated";
import {institutionTypeParagraphNumbers, institutionTypeShortNames} from "../../../constants";
import {useAppDispatch} from "../../../store";
import {
	searchSlice,
	selectSearch,
	setFilters,
	setFiltersActive,
	setGeoSearch,
} from "../../../store/search";
import {stringToInt} from "../../../util";

const debounceDelay = 700; // Ms

const institutionTypeOptions = Object.entries(institutionTypeShortNames).map(([type, name]) => {
	const paragraph = institutionTypeParagraphNumbers[type as InstitutionTypeType];
	return {
		value: type as InstitutionTypeType,
		label: `${name} (§ ${paragraph} SGB 8) `,
		chipLabel: `${name} (§ ${paragraph})`,
	};
});

export const InstitutionSearchForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const searchValues = useSelector(selectSearch);
	const isFilterBoxOpen = searchValues.areFiltersActive;

	const formik = useFormik({
		initialValues: {
			cityOrZip: searchValues.cityOrZip,
			radius: searchValues.radius.toString(),
			types: searchValues.types,
			age: searchValues.age,
			gender: searchValues.gender,
		},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onSubmit() {},
	});

	const debouncedCityOrZip = useDebounce(formik.values.cityOrZip, debounceDelay);
	const debouncedRadius = useDebounce(formik.values.radius, debounceDelay);
	const debouncedAge = useDebounce(formik.values.age, debounceDelay);

	React.useEffect(() => {
		dispatch(
			setGeoSearch({
				cityOrZip: debouncedCityOrZip,
				radius: stringToInt(debouncedRadius) ?? searchSlice.getInitialState().radius,
			})
		);
	}, [dispatch, debouncedCityOrZip, debouncedRadius]);

	React.useEffect(() => {
		dispatch(
			setFilters({age: debouncedAge, types: formik.values.types, gender: formik.values.gender})
		);
	}, [dispatch, debouncedAge, formik.values.types, formik.values.gender]);

	const typeSelectRef =
		React.useRef<SelectInstance<typeof institutionTypeOptions[number], true>>(null);

	return (
		<FormikProvider value={formik}>
			<Form>
				<Flex justifyContent="center">
					<Flex width="container.sm" gap={2}>
						<InputGroup bgColor="white" shadow="md" rounded="md" size="lg">
							<InputLeftElement pointerEvents="none" color="gray.300">
								<SearchIcon />
							</InputLeftElement>

							<Input
								{...formik.getFieldProps("cityOrZip")}
								placeholder="Stadt / PLZ"
								borderRightRadius={0}
							/>

							<NumberInput
								min={10}
								max={500}
								step={10}
								{...formik.getFieldProps("radius")}
								value={`${formik.values.radius} km`}
								onChange={(value) => {
									void formik.setFieldValue("radius", value.replace(/ km$/, ""));
								}}
							>
								<InputLeftElement
									width="auto"
									ml={4}
									color="gray.400"
									as="label"
									htmlFor="radius"
									display={{base: "none", sm: "flex"}}
								>
									Umkreis:
								</InputLeftElement>
								<NumberInputField
									id="radius"
									borderLeftRadius={0}
									width={{base: 28, sm: 48}}
									pr={10}
									textAlign={{sm: "right"}}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</InputGroup>

						<IconButton
							size="lg"
							variant="outline"
							shadow="md"
							bgColor="white"
							icon={
								isFilterBoxOpen ? (
									<Icon as={MdClose} boxSize={6} />
								) : (
									<Icon as={MdOutlineFilterAlt} boxSize={6} />
								)
							}
							aria-label="Weitere Suchkriterien"
							onClick={() => {
								dispatch(setFiltersActive(!isFilterBoxOpen));
							}}
						/>
					</Flex>
				</Flex>
				<Collapse
					animateOpacity
					in={isFilterBoxOpen}
					style={{overflow: isFilterBoxOpen ? "visible" : "hidden"}}
					onAnimationComplete={() => {
						if (isFilterBoxOpen) {
							typeSelectRef.current?.focus();
						}
					}}
				>
					<Container
						as={Stack}
						gap={4}
						bgColor="white"
						borderWidth="1px"
						borderColor="gray.100"
						p={4}
						mt={2}
						maxWidth="container.sm"
						alignSelf="center"
						shadow="md"
						rounded="md"
						position="relative"
						zIndex={1}
					>
						<FormControl
							name="types"
							label="Hilfeformen"
							width="auto"
							position="relative"
							zIndex={2}
						>
							<Select
								ref={typeSelectRef}
								isMulti
								useBasicStyles
								name="types"
								placeholder="Wählen..."
								options={institutionTypeOptions}
								components={{
									MultiValue: (props) => (
										<chakraComponents.MultiValue {...props}>
											{props.data.chipLabel}
										</chakraComponents.MultiValue>
									),
								}}
								value={formik.values.types.map(
									(optionValue) =>
										institutionTypeOptions.find((option) => option.value === optionValue)!
								)}
								onChange={(options) => {
									void formik.setFieldValue(
										"types",
										options.map((option) => option.value)
									);
								}}
							/>
						</FormControl>

						<Flex gap={4}>
							<NumberInputControl
								name="age"
								label="Alter"
								numberInputProps={{min: 1, step: 1}}
								maxWidth={32}
							/>
							<SelectControl
								name="gender"
								label="Geschlecht"
								selectProps={{placeholder: "beliebig"}}
							>
								<option value="m">Junge</option>
								<option value="f">Mädchen</option>
							</SelectControl>
						</Flex>
					</Container>
				</Collapse>
			</Form>
		</FormikProvider>
	);
};
