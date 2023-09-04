import { Reveal } from 'react-awesome-reveal';
import { numberWithCommas, IsSmMobile, fadeInUp, fadeIn, getUTCNow, getUTCDate, isEmpty } from '../../utils';
import { Link } from '@reach/router';

const Bounty = () => {
  const a=0;
  return (
    <div className='app-body'>
      <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
        <div className='row'>
          <div className='w-full mt-[20px]'>
            <div className='app-card'>
              <div className='app-card-header text-left'>
                <div className='flex justify-between sm:flex-col sm:text-center'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row'>
                      <img className="h-[30px] logo" src="./images/banner/user.png" alt="" />
                      <span className='app-gray text-[14px]'>GAD..RARW</span>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-row space-x-2 '>
                      <div className='flex-col justify-around sm:flex-col sm:text-center border rounded-2xl px-2'> {`${numberWithCommas(1000,3)} XLM`}</div>
                      <div className='flex-col justify-around sm:flex-col sm:text-center border rounded-2xl px-2'>Active</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='app-card-body'>
                <div className="row text-left">
                  <Link className='app-gray text-[32px]' to="/ExploreBounties/0">Bounty Listing</Link>
                  <p className='text-[17px] sm:text-[15px]'>As a bounty hunter for the Soroban Contract Writing in Rust, you will be responsible for thoroughly testing our platform and identifying any potential security vulnerabilities or bugs. You will be tasked with conducting comprehensive penetration testing and code review to ensure that...</p>
                </div>
              </div>
              <div className='app-card-footer'>
                <div className='flex justify-between sm:flex-col sm:text-center'>
                  <div className='flex flex-col'>
                    <span className='app-gray text-[14px]'>{`${5} hours ago`}</span>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-row space-x-2'>
                      <div className='flex-col justify-around space-x-2 sm:flex-col sm:text-center border rounded-2xl px-2'>Cooperative</div>
                      <div className='flex-col justify-around space-x-2 sm:flex-col sm:text-center border rounded-2xl px-2'>Vanila</div>
                      <div className='flex-col justify-around space-x-2 sm:flex-col sm:text-center border rounded-2xl px-2'>Beginner</div>
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

export default Bounty;