const upload_preset = "tynf0ckz";
const cloud_name = "dvp3lkojc";

const uploadToCloudinary = async (file, isImage) => {
  const uploadData = new FormData();
console.log(uploadData,'uploddta');
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);
  uploadData.append("file", file);
  console.log(FormData,'updatedformdata');
  if (!isImage) {
    console.log('kjkjjj');
    uploadData.append(file, "video");
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloud_name}/upload`;

  try {
    const res = await fetch(endpoint, {
      method: "post",
      body: uploadData,
    });
    console.log(res,'reessssss');
    const data = await res.json();
console.log(data,'dataaaa');
    return data;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export default uploadToCloudinary;
