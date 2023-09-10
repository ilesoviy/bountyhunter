import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils';
import { useNavigate } from '@reach/router';

const MyBountyBodyListItem = ({ count }) => {

  const nav = useNavigate();

  return (
    <div className='app-body'>
      <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
        <div className='row'>
          <div className='w-full lg:pl-0 mt-[20px] pr-0'>
            <div className='app-card cursor-pointer' onClick={()=>nav('/MyBounties/0')}>
              <div className='flex justify-between sm:flex-col sm:text-center sm:items-center sm:gap-3'>
                  <div className='text-[16px]'>My Bounting Listings</div>
                  <div className='flex flex-row space-x-2'>
                    {
                      count > 0 ?
                        <div className='flex-col justify-around space-x-2  sm:flex-col sm:text-center border rounded-2xl px-4 relative'>
                          Review
                          <div className='my-badge'> {`${count}`} </div>
                        </div> :
                        <div className='flex-col justify-around space-x-2  sm:flex-col sm:text-center px-1'>No Submissions</div>
                    }
                  </div>
              </div>

            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

const MyBountiesBody = () => {
  return (
    <>
      <MyBountyBodyListItem count={2} />
      <MyBountyBodyListItem count={0} />
    </>
  );
}

export default MyBountiesBody;
