import './App.css'
import logo from './assets/react.svg'
import skyline from './assets/skyline_dark.jpg'

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
          
          <img src={skyline} alt='Dallas skyline.'></img>
        </header>

        <section id='explore_downtown' className='basic-grid'>
          <img src={logo} alt='Downtown Dallas.'></img>

          <div className='card'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dolorem voluptatum doloremque cumque totam iste in repudiandae, accusamus possimus magni? Consequuntur repellat, commodi similique ducimus maiores neque beatae dignissimos a.</p>
            <button type='submit'>Explore Downtown</button>
          </div>
        </section>

        <section id='popular_destinations'>
          <h2>Popular Destinations</h2>
          <div className='destination-container'>
            <div className='destination-item'></div>
            <div className='destination-item'></div>
            <div className='destination-item'></div>
            <div className='destination-item'></div>
            <div className='destination-item'></div>
            <div className='destination-item'></div>
            <div className='destination-item'></div>
            <div className='destination-item'></div>
            <div className='destination-item'></div>
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

            <div className='map'></div>
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
