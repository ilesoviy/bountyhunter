import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils';
import { Link } from '@reach/router';

const MyBountyBodyListItem = ({ count }) => {
  return (
    <div className='app-body'>
      <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
        <div className='row'>
          <div className='w-full mt-[20px] pr-0'>
            <div className='app-card'>
              <div className='flex justify-between sm:flex-col sm:text-center'>
                <div className='flex flex-col'>
                  <Link className='app-gray text-[14px]' to="/MyBounties/0">My Bounting Listses</Link>
                </div>
                <div className='flex flex-col'>
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
        </div>
      </Reveal>
    </div>
  )
}

const MyBountiesBody = () => {
  return (
    <>
      <MyBountyBodyListItem count={2} />
      <MyBountyBodyListItem count={0} />
    </>
  )
}

export default MyBountiesBody;