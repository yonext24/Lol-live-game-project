import UserPage from './components/UserPage';
import './app.css'
import { Route } from 'wouter'
import { LiveMatchPage } from './components/LiveMatchPage';
import { HomePage } from './components/HomePage'

function App() {

  return (

    <div className='App'>

      <Route path='/' component={HomePage}></Route>
      <Route path='/:name' component={UserPage}></Route>
      <Route path='/live/:name' component={LiveMatchPage}></Route>

    </div>
  )
}

export default App
