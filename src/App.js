import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './Components/Navbar'
import Explore from './Pages/Explore'
import ForgotPassword from './Pages/ForgotPassword'
import Offers from './Pages/Offers'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import PrivateRoute from './Components/PrivateRoute'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path={'/'} element={<Explore />} />
          <Route exact path={'/forgotpassword'} element={<ForgotPassword />} />
          <Route exact path={'/offers'} element={<Offers />} />
          <Route exact path={'/profile'} element={<PrivateRoute />}>
            <Route exact path={'/profile'} element={<Profile />} />
          </Route>
          <Route exact path={'/sign-in'} element={<SignIn />} />
          <Route exact path={'/sign-up'} element={<SignUp />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
