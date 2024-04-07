const upload_preset = "tynf0ckz";
const cloud_name = "dvp3lkojc";

const uploadToCloudinary = async (file, isImage) => {
  const uploadData = new FormData();
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);
  uploadData.append("file", file);
  if (!isImage) {
    uploadData.append(file, "video");
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloud_name}/upload`;

  try {
    const res = await fetch(endpoint, {
      method: "post",
      body: uploadData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export default uploadToCloudinary;
