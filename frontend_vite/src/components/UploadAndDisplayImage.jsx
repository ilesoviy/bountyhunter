import React, { useState } from "react";

const UploadAndDisplayImage = ({ editable }) => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="relative flex items-center justify-center">
      {selectedImage ?
        <img alt="" className="w-[120px] h-[120px] rounded-full" src={URL.createObjectURL(selectedImage)} />
        : <img src={'/images/banner/unknown.png'} alt="" />}
      {editable &&
        <div className='absolute right-0 bottom-0 w-[30px] h-[30px] flex bg-[#011829] flex justify-center items-center rounded-full cursor-pointer'>
          <i className='fa fa-pencil' />
        </div>}
      {editable &&
        <input
          type="file"
          name="myImage"
          accept="image/*"
          className="absolute right-0 bottom-0 w-[30px] h-[30px] opacity-0"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />}
    </div>
  );
}

export default UploadAndDisplayImage;
