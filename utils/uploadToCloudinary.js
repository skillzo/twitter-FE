import axios from "axios";

export const uploadImageToCloudinary = async (payload) => {
  const formData = new FormData();
  formData.append("file", {
    uri: payload.uri,
    type: payload.type,
    name: payload.fileName,
  });
  formData.append("upload_preset", "pt8oyyjf");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dyrlhkh2b/image/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res?.data?.url;
  } catch (err) {
    console.log("upload cloudinary error", err);
  }
};
