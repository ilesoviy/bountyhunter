import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils';

const ReviewBodyItem = ({ count }) => {
  return (
    <div className='app-body'>
      <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
        <div className='row'>
          <div className='w-full mt-[20px]'>
            <div className='app-card'>
              <div className='app-card-body'>
                <div className='flex justify-between sm:flex-col sm:text-center'>
                  <div className='flex flex-col'>
                    <span className='app-gray text-[14px]'>My Bounties</span>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-row space-x-2'>
                      {
                        count > 0 ?
                          <div className='flex-col justify-around space-x-2  sm:flex-col sm:text-center border rounded-2xl px-4'>Review {`${count}`}</div> :
                          <div className='flex-col justify-around space-x-2  sm:flex-col sm:text-center px-4'>No Submissions</div>
                      }
                    </div>
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

const MyBountyListing = () => {
  return (
    <>
      <ReviewBodyItem count={1} />
      <ReviewBodyItem count={0} />
    </>
  )
}

export default MyBountyListing;