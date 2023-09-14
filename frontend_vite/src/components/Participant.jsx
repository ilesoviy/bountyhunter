import { useState, useEffect } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp, shortenAddress, getWorkStatus, getTimeDifference } from '../utils';
import useBackend from '../hooks/useBackend';

export const Participant = ({bountyId}) => {
  const { getWorks } = useBackend();
  const [works, setWorks] = useState([]);

  useEffect(() => {
    if (!bountyId)
      return;

    async function fetchWorks(bountyId) {
      const bountyWorks = await getWorks(bountyId);
      setWorks(bountyWorks);
    }

    fetchWorks(bountyId);
  }, [bountyId]);

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
            {works?.map((work, idx) => (
              <div key={idx} className='flex justify-evenly items-center sm:text-center'>
                <div className='flex my-2 text-[16px] '><span>{shortenAddress(work?.participant.wallet)} ({work?.participant.name})</span></div>
                <div className='flex my-2 text-[16px] '><span>{getWorkStatus(work?.status)}</span></div>
                <div className='flex my-2 text-[16px] '><span>{getTimeDifference(work?.applyDate)} ago</span></div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
