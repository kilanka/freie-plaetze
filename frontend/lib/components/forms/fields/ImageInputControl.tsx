import {Button, Icon, Image} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import {BaseProps, FormControl} from "formik-chakra-ui";
import React, {FC, ForwardedRef} from "react";
import {FiFile} from "react-icons/fi";
import {useFilePicker} from "use-file-picker";

import {getAbsoluteImageUrl} from "../../../util";

export interface ImageInputFormData {
	upload?: File;
	ref?: string | null;
	url?: string | null;
}

export type ImageInputControlProps = BaseProps;

export function convertImageInputFormatToApiFormat(input?: ImageInputFormData | null) {
	if (input?.upload) {
		return {upload: input.upload};
	}

	if (input?.ref) {
		return {ref: input.ref};
	}

	return null;
}

export function convertApiFormatToImageInputFormat(
	input?: {url?: string | null; ref?: string | null} | null
): ImageInputFormData {
	return {
		url: input?.url,
		ref: input?.ref,
	};
}

export const ImageInputControl: FC<ImageInputControlProps> = React.forwardRef(
	({name, label, ...rest}: ImageInputControlProps, ref: ForwardedRef<HTMLInputElement>) => {
		const {setFieldValue, values} = useFormikContext<any>();
		const value: ImageInputFormData = values[name];

		const [
			openFileSelector,
			{
				filesContent: [fileContent],
				plainFiles: [file],
			},
		] = useFilePicker({
			accept: ".jpg,.jpeg,.png",
			multiple: false,
			readAs: "DataURL",
		});

		React.useEffect(() => {
			if (file && file !== value.upload) {
				setFieldValue(name, {upload: file});
			}
		}, [setFieldValue, name, value, file]);

		return (
			<FormControl name={name} label={label} {...rest}>
				<Button variant="outline" leftIcon={<Icon as={FiFile} />} onClick={openFileSelector}>
					Bild auswählen
				</Button>
				{(fileContent || value?.url) && (
					<Image
						mt={4}
						src={fileContent?.content ?? getAbsoluteImageUrl(value.url!)}
						maxH={60}
						maxW={60}
						borderWidth="5px"
						borderStyle="solid"
					/>
				)}
			</FormControl>
		);
	}
);
