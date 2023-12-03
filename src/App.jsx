import './assets/css/app.css'
import { ContentRowTop } from './pages/home-admin-page'
import { Footer } from './components/Footer'
import { SideBar } from './components/SideBar'
import { TableMovies } from './pages/movies-list-page'
import { TopBar } from './components/TopBar'

function App() {

  return (
    <div id="wrapper">
      <SideBar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar />

          <div className="container-fluid">
            <ContentRowTop />
            <TableMovies />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default App
