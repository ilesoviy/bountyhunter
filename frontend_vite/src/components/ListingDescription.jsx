
export const ListingDescription = () => {
  return (
    <>
      <div className='flex justify-between xsm:text-[10px] sm:items-center sm:gap-3 py-2'>
        <div className='flex flex-col'>
          <button className='text-[18px] border rounded-2xl px-4'>Active</button>
        </div>
        <div className='flex gap-1'>
          <button className='text-[18px]'><i className="fa-regular fa-arrow-up-from-square mr-2"></i>Share</button>
        </div>
      </div>
      <span className='pt-2 mb-6'>As a bounty hunter for the Soroban Contract Writing in Rust, you will be responsible for thoroughly testing our platform and identifying any potential security vulnerabilities or bugs. You will be tasked with conducting comprehensive penetration testing and code review to ensure that our platform is secure, reliable, and efficient.<br /> Successful candidates will have a strong understanding of Rust development, as well as experience working with blockchain technology and smart contract writing. You should be comfortable working with cryptographic algorithms, as well as developing and testing secure, reliable, and efficient.</span></>
  )
}
