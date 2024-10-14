const UPLOAD_PRESET = "kkorean";

const CloudinaryUtils = {
  generateFormData: (public_id, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("public_id", public_id);
    return formData;
  },
};

export default CloudinaryUtils;
