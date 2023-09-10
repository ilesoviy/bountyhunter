import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../utils';

export const Information = () => {
    return (
        <div className=''>
            <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
                <div className='info-box pb-3'>
                    <div className='info-header'>
                        <div className='flex my-2 text-[24px] font-bold'><span>Information</span></div>
                    </div>
                    <div className='info-body'>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Published by:</span>
                            <div className='flex items-center justify-center'>
                                <img src={'/images/banner/user.png'} className='h-[20px]' alt="" />
                                <span className='text-[16px] '>GAD...RARW</span>
                            </div>

                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Payment:</span>
                            <span className='text-[16px]'>1000 XLM</span>
                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Status</span>
                            <span className='text-[16px]'>Active</span>
                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Start Date:</span>
                            <span className='text-[16px]'>January 1, 2024, 5:00 AM</span>
                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>End Date:</span>
                            <span className='text-[16px]'>January 1, 2024, 5:00 AM</span>
                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Block</span>
                            <span className='text-[16px]'>#254121386</span>
                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Level:</span>
                            <span className='text-[16px]'>Beginner</span>
                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Topic:</span>
                            <span className='text-[16px] '>Vanilla Stellar</span>
                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Type:</span>
                            <span className='text-[16px]'>Cooperative</span>
                        </div>
                        <div className='flex justify-between sm:text-center items-center gap-3'>
                            <span className='text-[18px]'>Repository:</span>
                            <span className='text-[18px]'><i className="fa-regular fa-arrow-up-right-from-square" /></span>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
