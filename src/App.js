import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Explore from './Pages/Explore'
import ForgotPassword from './Pages/ForgotPassword'
import Offers from './Pages/Offers'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={'/'} element={<Explore />} />
        <Route exact path={'/forgotpassword'} element={<ForgotPassword />} />
        <Route exact path={'/offers'} element={<Offers />} />
        <Route exact path={'/profile'} element={<Profile />} />
        <Route exact path={'/sign-in'} element={<SignIn />} />
        <Route exact path={'/sign-up'} element={<SignUp />} />
      </Routes>
      <Navbar />
    </Router>
  )
}

export default App
