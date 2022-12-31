import { useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const navigate = useNavigate();

  useEffect(() => {
    console.log("user info", userInfo)
    if (!userInfo) {
        navigate('/login')
    }
    }, [navigate, userInfo])

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className='unauthorized'>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to='/login'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }

  return <Outlet />
}

export default ProtectedRoute