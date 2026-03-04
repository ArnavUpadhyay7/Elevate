import {axiosInstance} from "../lib/axios";

export const uploadGameplayVideo = async (file) => {
  const formData = new FormData();
  formData.append("video", file);

  const res = await axiosInstance.post(
    "/coach/upload-video",
    formData,
    {
      headers: {  
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const deleteGameplayVideo = async (videoId) => {
  const res = await axiosInstance.delete(
    `/coach/video/${videoId}`
  );

  return res.data;
};