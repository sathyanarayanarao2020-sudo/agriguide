import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
      <h2>AGRI GUIDE</h2>

      <div>
        <Link to='/'>Home</Link>
        <Link to='/crops'>Crops</Link>
        <Link to='/irrigation'>Irrigation</Link>
        <Link to='/monitor'>Monitor</Link>
        <Link to='/about'>About</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
    </div>
  )
}

export default Navbar