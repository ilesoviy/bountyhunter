import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../utils';

export const Information = ({
    title, payAmount, duration, type, difficulty, topic, desc, gitHub
}) => {
    function getType() {
        switch(type) {
            case '1':
                return 'Competitive'
            case '2':
                return 'Cooperative'
            case '3':
                return 'Hakathon'
        }
    }
    function getLevel() {
        switch(difficulty) {
            case '1':
                return 'Beginner'
            case '2':
                return 'Intermediate'
            case '3':
                return 'Advanced'
        }
    }
    function getTopic() {
        switch(topic) {
            case '1':
                return 'Design'
            case '2':
                return 'Development'
            case '3':
                return 'Smart Contracts'
            case '4':
                return 'Data'
            case '5':
                return 'AI'
        }
    }
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
                            <span className='text-[16px]'>{payAmount} XLM</span>
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
                            <span className='text-[16px]'>{getLevel()}</span>
                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Topic:</span>
                            <span className='text-[16px] '>{getTopic()}</span>
                        </div>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-[16px] font-bold'>Type:</span>
                            <span className='text-[16px]'>{getType()}</span>
                        </div>
                        <div className='flex justify-between sm:text-center items-center gap-3'>
                            <span className='text-[18px]'>Repository:</span>
                            <a className='text-[18px]' href={gitHub}><i className="fa-regular fa-arrow-up-right-from-square" /></a>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
