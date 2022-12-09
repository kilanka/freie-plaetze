import {useForwardedRef} from "@bedrock-layout/use-forwarded-ref";
import {Select, SelectInstance, chakraComponents} from "chakra-react-select";
import {useField} from "formik";
import {FormControl, BaseProps as FormControlProps} from "formik-chakra-ui";
import React from "react";
import {Except} from "type-fest";

import {useInstitutionTypes} from "../../../hooks/useInstitutionTypes";

type Option = {
	value: string;
	label: string;
	chipLabel: string;
};

export type InstitutionTypesSelectControlProps = Except<FormControlProps, "labelProps">;

export const InstitutionTypesSelectControl = React.forwardRef<
	SelectInstance<Option, true>,
	InstitutionTypesSelectControlProps
>((formControlProps, ref) => {
	const forwardedRef = useForwardedRef(ref);

	const institutionTypes = useInstitutionTypes();
	const {institutionTypeOptions, institutionTypeOptionsMap} = React.useMemo(() => {
		const institutionTypeOptionsMap: Record<string, Option> = Object.fromEntries(
			institutionTypes.map((type) => [
				type.paragraph,
				{
					value: type.paragraph,
					label: `${type.shortName} (§ ${type.paragraph} SGB 8) `,
					chipLabel: `${type.shortName} (§ ${type.paragraph})`,
				},
			])
		);
		const institutionTypeOptions = Object.values(institutionTypeOptionsMap);
		return {institutionTypeOptions, institutionTypeOptionsMap};
	}, [institutionTypes]);

	const [field, , helpers] = useField<string[]>(formControlProps.name);

	return (
		<FormControl
			labelProps={{
				onClick() {
					forwardedRef.current?.focus();
				},
			}}
			{...formControlProps}
		>
			<Select
				ref={forwardedRef}
				isMulti
				useBasicStyles
				name={formControlProps.name}
				placeholder="Wählen..."
				options={institutionTypeOptions}
				components={{
					MultiValue: (props) => (
						<chakraComponents.MultiValue {...props}>
							{props.data.chipLabel}
						</chakraComponents.MultiValue>
					),
				}}
				value={field.value.map((paragraph) => institutionTypeOptionsMap[paragraph])}
				onChange={(options) => {
					helpers.setValue(options.map((option) => option.value));
				}}
				onBlur={() => {
					helpers.setTouched(true);
				}}
			/>
		</FormControl>
	);
});
