import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '../../utils';

const ReviewBodyItem = () => {
    return (
        <div className='app-body'>
          <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
            <div className='row'>
              <div className='w-full mt-[20px]'>
                <div className='app-card'>
                  <div className='app-card-body'>
                    <div className='flex justify-between sm:flex-col sm:text-center'>
                      <div className='flex flex-col'>
                        <span className='app-gray text-[14px]'>Bounty Listing 1</span>
                      </div>
                      <div className='flex flex-col'>
                          <div className='flex flex-row space-x-2'>
                            <div className='flex-col justify-around space-x-2  sm:flex-col sm:text-center border rounded-2xl px-4'>Review</div>
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

const ReviewBody = () => {
    return (
        <>
        <ReviewBodyItem/>
        <ReviewBodyItem/>
        <ReviewBodyItem/>
        </>      
    )
  }

  export default ReviewBody;