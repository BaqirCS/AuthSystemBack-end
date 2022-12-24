import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';
function Navbar() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch({ type: 'LOG_OUT' });
    localStorage.removeItem('userInfo');
    navigate('/landingpage');
  };
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark p-3"
      style={{
        background:
          'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
      }}
    >
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link
            className="navbar-brand"
            to="/"
            style={{ marginLeft: '90px', color: 'rgb(189, 174, 174)' }}
          >
            Authenticaton Home
          </Link>
          <ul className="navbar-nav ms-auto" style={{ marginRight: '90px' }}>
            {state.userInfo ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i
                      style={{
                        textTransform: 'uppercase',
                      }}
                    >
                      {state.userInfo.user.name}
                    </i>
                  </Link>
                </li>
                <li className="nav-item" onClick={logOutHandler}>
                  <Link className="nav-link">LOG OUT</Link>
                </li>
              </>
            ) : (
              <>
                {' '}
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    REGISTER
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    LOG IN
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
