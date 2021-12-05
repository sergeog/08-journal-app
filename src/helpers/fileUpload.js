export const fileUpload = async (file) => {
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dnxo0e0ss/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const cloudinaryResp = await response.json();
      return cloudinaryResp.secure_url;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
