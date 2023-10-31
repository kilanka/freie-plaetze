import {Button, Icon, Image} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import {BaseProps, FormControl} from "formik-chakra-ui";
import React, {FC, ForwardedRef} from "react";
import {FiFile} from "react-icons/fi";
import {useFilePicker} from "use-file-picker";

import {getAbsoluteImageUrl} from "../../../util";

export interface ImageInputFormData {
	upload?: File;
	url?: string | undefined;
}

export type ImageInputControlProps = BaseProps;

export function convertImageInputFormatToApiFormat(input?: ImageInputFormData | undefined) {
	return input?.upload ? {upload: input.upload} : undefined;
}

export function convertApiFormatToImageInputFormat(
	// eslint-disable-next-line @typescript-eslint/ban-types
	input?: {url?: string | undefined} | null | undefined
): ImageInputFormData {
	return {
		url: input?.url,
	};
}

export const ImageInputControl: FC<ImageInputControlProps> = React.forwardRef(
	({name, label, ...rest}: ImageInputControlProps, ref: ForwardedRef<HTMLInputElement>) => {
		const {setFieldValue, values} = useFormikContext<Record<string, ImageInputFormData>>();
		const value = values[name];

		const {
			openFilePicker,
			filesContent: [fileContent],
			plainFiles: [file],
		} = useFilePicker({
			accept: ".jpg,.jpeg,.png,.webp,.gif",
			multiple: false,
			readAs: "DataURL",
		});

		React.useEffect(() => {
			if (file && file !== value.upload) {
				void setFieldValue(name, {upload: file});
			}
		}, [setFieldValue, name, value, file]);

		return (
			<FormControl name={name} label={label} {...rest}>
				<Button
					id={name}
					variant="outline"
					leftIcon={<Icon as={FiFile} />}
					onClick={openFilePicker}
				>
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
