import { Section } from 'react-scroll-section';
import MainHeader from '../../components/menu/MainHeader';
import MainFooter from '../../components/menu/MainFooter';
import Banner from '../../components/home/banner';
import './home.scss';

const Home = () => {
  return (
    <div className='full-container relative'>
      <div className='app-space-group'>
        <img className='space opacity-60' src="/images/banner/space.png" alt="" ></img>
      </div>
      <div className='home h-full'>
          <MainHeader />
          <Section id="section1" className='h-full overflow-auto'>
            <Banner />
          </Section>
      </div>
    </div>    
  )
}

export default Home;