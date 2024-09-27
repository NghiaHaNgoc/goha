import { ApiResponse } from "../model/apiResponse";
import { ImageResponse } from "../model/util";

const imageServer = import.meta.env.VITE_API_IMAGE_UPLOAD;

export async function uploadImageService(data: FormData) {
  let response = await fetch(imageServer, {
    method: "POST",
    body: data,
  });
  let result = await response.json();
  return result as ApiResponse<ImageResponse>;
}
