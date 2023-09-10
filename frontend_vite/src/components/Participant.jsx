import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../utils';

export const Participant = () => {
  return (
    <div>
      <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
        <div className='info-box mt-[40px]'>
          <div className='info-header pl-0'>
            <div className='flex items-center sm:text-center justify-evenly'>
              <div className='flex my-2 text-[24px] font-bold'><span>Participants</span></div>
              <div className='flex my-2 text-[24px] font-bold'><span>Status</span></div>
              <div className='flex my-2 text-[24px] font-bold'><span>Time</span></div>
            </div>
          </div>
          <div className='info-body'>
            {[1, 1, 1].map((v, i) => (
              <div key={i} className='flex justify-evenly items-center sm:text-center'>
                <div className='flex my-2 text-[16px] '><span>GS573KASDHK...AZEW (Worker {`${i+1}`})</span></div>
                <div className='flex my-2 text-[16px] '><span>In Progress</span></div>
                <div className='flex my-2 text-[16px] '><span>10 hours ago</span></div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
