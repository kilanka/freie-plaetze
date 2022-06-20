/**
 * Virtual field factory for fields that return imgproxy image URLs of various formats
 **/

import {graphql} from "@keystone-6/core";
import {virtual} from "@keystone-6/core/fields";
import {ImgproxyBuilder} from "imgproxy/dist/builder";

import {imgproxy} from "../environment";

type ImageFormats = Record<string, (builder: ImgproxyBuilder) => void>;

export function makeImageFormatField(
	listName: string,
	imageFieldName: string,
	imageFormats: ImageFormats
) {
	return virtual({
		field: graphql.field({
			type: graphql.String,
			args: {
				format: graphql.arg({
					type: graphql.enum({
						name: `${listName}${imageFieldName.slice(0, 1).toUpperCase()}${imageFieldName.slice(
							1
						)}ImageFormats`,
						values: graphql.enumValues(Object.keys(imageFormats)),
					}),
				}),
			},
			async resolve(item: any, {format}) {
				const imageId = item[`${imageFieldName}_id`] as string | undefined;
				const imageExtension = item[`${imageFieldName}_extension`] as string | undefined;

				if (!format || !imageId || !imageExtension) {
					return null;
				}

				const builder = imgproxy.builder();
				imageFormats[format](builder);
				return builder.generateUrl(`${imageId}.${imageExtension}`);
			},
		}),
	});
}
