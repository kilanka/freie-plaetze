import {Button, Icon, Image} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import {BaseProps, FormControl} from "formik-chakra-ui";
import React, {FC, ForwardedRef} from "react";
import {FiFile} from "react-icons/fi";
import {useFilePicker} from "use-file-picker";

export type ImageInputControlProps = BaseProps;

export const ImageInputControl: FC<ImageInputControlProps> = React.forwardRef(
	({name, label, ...rest}: ImageInputControlProps, ref: ForwardedRef<HTMLInputElement>) => {
		const {setFieldValue} = useFormikContext();

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
			if (file) {
				setFieldValue(name, file);
			}
		}, [setFieldValue, name, file]);

		return (
			<FormControl name={name} label={label} {...rest}>
				<Button variant="outline" leftIcon={<Icon as={FiFile} />} onClick={openFileSelector}>
					Bild auswählen
				</Button>
				{fileContent && (
					<Image
						mt={4}
						src={fileContent.content}
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
