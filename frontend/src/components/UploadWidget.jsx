
import { useRef,useEffect } from "react";
const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnhzsg7mg",
        uploadPreset: "E-learning", // Note the correct parameter name: uploadPreset
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          handleSuccess(result);
        }
      }
    );
  }, [onUpload]);
  
const handleSuccess = (result) => {
  const { secure_url } = result.info;
  onUpload(secure_url);
};
  const handleUploadClick = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log('goooooooooooooooooo');
    widgetRef.current.open();
  };

  return <button onClick={handleUploadClick}>Upload</button>;
};
export default UploadWidget;