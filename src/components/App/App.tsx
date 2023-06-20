import './App.scss';
import Card from '../Card/Card.tsx';
import DestinationContainer from '../DestinationContainer/DestinationContainer.tsx';
import InputForm from '../InputForm/InputForm.tsx';
import { DestinationInfo } from '../DestinationContainer/DestinationContainer.tsx';
import att from '../../assets/att_disc2.jpg';
import skyline_art from '../../assets/skyline_art.png';

function App() {
  const destinations:DestinationInfo[] = 
      [ {image:'urban.jpg', name:'Downtown', station:'Akard, St. Paul, Pearl/Arts District, West End'},
      {image:'neon.jpg'             ,name:'Deep Ellum'                 ,station:'Deep Ellum'},
      {image:'bar.jpg'         ,name:'Uptown'                  ,station:'Cityplace/Uptown'}
] ;
  return (
    <>
      <main>
        <header>
          <Card headerText='Dallas by Metro' 
            description='Learn how to navigate the DART train system so that you can discover new places
            and move around our city in a more eco-friendly fashion.'
            buttonText='Learn More'
          />
          <img src={skyline_art} alt='Dallas skyline.'></img>
        </header>

        <section id='goal' className='basic-grid'>
          <Card headerText='Our Goal'
            description="When using public transit it's often better to look for places near stations and not for places directly.
             Our planner will do all the hard work for you. Simply put what you're looking for and we will find DARTable locations
             that suit your needs."
            buttonText='Plan Your Next Trip'
          />

          <div id='background_pattern'></div>
        </section>
        
        <section id='explore_downtown' className='basic-grid'>
          <img src={att} alt='Downtown Dallas.'></img>

          <Card headerText='Explore Downtown'
            description='Download the GoPass app and take the train Downtown to enjoy all the sights and destinations that 
            Downtown has to offer without the hastle of driving and parking in the busiest streets of Dallas.'
            buttonText='Explore Downtown'
          />
        </section>

        <section id='popular_destinations'>
          <h2>Popular Destinations</h2>
          <DestinationContainer destinations={destinations} />
        </section>
        
        <section id='planner'>
          <Card headerText='Create your own journey...' 
            description='With our carefully curated list you will find easily to get to and fun new locations.'
            buttonText=''
          />
          
          <div className='basic-grid'>
            <InputForm />

            <div className='map'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </div>
          </div>
          
        </section>
      </main>

      <footer>
        <h2>Connect with us on:</h2>
      </footer>
    </>
  );
}

export default App;
