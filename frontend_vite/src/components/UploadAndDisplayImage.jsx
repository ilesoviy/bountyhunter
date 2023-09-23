import React, { useState, useEffect } from "react";
import { useCustomWallet } from '../context/WalletContext';
import useBackend from '../hooks/useBackend';

const UploadAndDisplayImage = ({ editable }) => {
  const { isConnected, walletAddress } = useCustomWallet();
  const { getUser } = useBackend();
  const [userImg, setUserImg] = useState(null);
  
  useEffect(() => {
    if (!isConnected)
      return;

    async function fetchUserImg(walletAddress) {
      const userProfile = await getUser(walletAddress);
      setUserImg(userProfile.img);
    }

    fetchUserImg(walletAddress);
  }, [isConnected, walletAddress]);

  return (
    <div className="relative flex items-center justify-center">
      <img alt="" className="w-[120px] h-[120px] rounded-full" 
		    src={(!hide && userImg ? `data:image/${userImg.contentType};base64,${Buffer.from(userImg.data).toString('base64')}` : '/images/banner/unknown.png')} />
      {/* {editable &&
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
      />} */}
    </div>
  );
}

export default UploadAndDisplayImage;
