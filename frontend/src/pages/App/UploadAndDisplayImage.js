import React, { useState } from "react";

const UploadAndDisplayImage = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="relative">
      {selectedImage ?
        <div> <img alt="" width={"120px"} height={"120px"} src={URL.createObjectURL(selectedImage)}/></div>
       : <img src={'/images/banner/unknown.png'} />}
      <div className='relative'>
        <div className='absolute right-0 bottom-0 w-[30px] h-[30px] bg-[#011829] flex justify-center items-center rounded-full cursor-pointer'>
          <i className='fa fa-pencil' />
        </div>
      </div>
      <input
        type="file"
        name="myImage"
        accept="image/*"
        className="absolute right-0 bottom-0 w-[30px] h-[30px] opacity-0"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;