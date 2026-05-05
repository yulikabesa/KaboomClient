import type { AreaPixels } from "../components/create/ImageCrop";

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: AreaPixels,
) => {
  const image = new Image();
  image.src = imageSrc;

  // Wait for image to load
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // Return as a base64 string
  return canvas.toDataURL("image/jpeg");
};
