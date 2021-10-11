import { Box, BoxProps } from "@chakra-ui/react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

export type ImageProps = NextImageProps & BoxProps;

export const Image: React.FC<ImageProps> = (props) => {
  const imagePropNames = new Set([
    "width",
    "height",
    "layout",
    "loader",
    "src",
    "alt",
    "sizes",
    "quality",
    "priority",
    "placeholder",
    "objectFit",
    "objectPosition",
    "onLoadingComplete",
    "loading",
    "blurDataURL",
    "unoptimized",
  ]);

  const imageProps = Object.fromEntries(
    Object.entries(props).filter(([key, _value]) => imagePropNames.has(key))
  ) as NextImageProps;
  const boxProps = Object.fromEntries(
    Object.entries(props).filter(([key, _value]) => !imagePropNames.has(key))
  );

  return (
    <Box position="relative" {...boxProps}>
      <NextImage {...imageProps} />
    </Box>
  );
};
