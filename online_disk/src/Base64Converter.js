const convertToBase64 = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Data = btoa(e.target.result);
      callback(base64Data);
    };

    reader.readAsBinaryString(file);
};

export default convertToBase64;