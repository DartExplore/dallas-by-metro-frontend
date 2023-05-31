import './App.css'
import Destination from './components/Destination'
import att from './assets/att_disc2.jpg'
import skyline_art from './assets/skyline_art.png'

function App() {

  return (
    <>
      <main>
        <header>
          <div className='card'>
            <h2>Dallas by Metro</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula varius nisi, sit amet fermentum
              metus finibus non. Proin vel lectus a enim dignissim ultricies. Vestibulum convallis, lorem ac tristique
              ultrices, ante metus luctus est, eu dictum erat tortor vitae purus.</p>
              <button type='submit'>Learn More</button>
          </div>
          
          <img src={skyline_art} alt='Dallas skyline.'></img>
        </header>

        <section id='explore_downtown' className='basic-grid'>
          <img src={att} alt='Downtown Dallas.'></img>

          <div className='card'>
            <h2>Explore Downtown</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dolorem voluptatum doloremque cumque totam iste in repudiandae, accusamus possimus magni? Consequuntur repellat, commodi similique ducimus maiores neque beatae dignissimos a.</p>
            <button type='submit'>Explore Downtown</button>
          </div>
        </section>

        <section id='popular_destinations'>
          <h2>Popular Destinations</h2>
          <div className='destination-container'>
            <Destination />
            <Destination />
            <Destination />
            <Destination />
            <Destination />
            <Destination />
            <Destination />
            <Destination />
          </div>
        </section>
        
        <section id='planner'>
          <div className='card'>
            <h2>Create your own journey...</h2>
            <p>With our carefully curated list you will find easily to get to and fun new locations.</p>
          </div>
          
          <div className='basic-grid'>
            <form action="#" method="POST">
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>

            <div className='map'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </div>
          </div>
          
        </section>
        
        <section id='contact_us'>
          <h2>Contact</h2>
          
          <form action="#" method="POST">
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>

      <footer>
        <h2>Connect with us on:</h2>
      </footer>
    </>
  )
}

export default App
