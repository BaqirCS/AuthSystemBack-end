import React, { useContext, useReducer, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { initialState, loginReducer } from '../reducer/LoginReducer';
import MessageBox from '../component/MessageBox';
import Loader from '../component/Loader';
import { Store } from '../context/Store';
function LoginScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { state: ctxState, dispatch: ctxDispatch } = useContext(Store);
  const clickHandler = async (e) => {
    e.preventDefault();
    if (!user.email) {
      return dispatch({ type: 'LOGIN_FAIL', payload: 'Email is Required!!!' });
    }
    if (!user.password) {
      return dispatch({
        type: 'LOGIN_FAIL',
        payload: 'Password is Required!!!',
      });
    }
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      const { data } = await axios.post(
        `${ctxState.baseUrl}/users/login`,
        user
      );
      dispatch({ type: 'LOGIN_SUCCESS' });
      ctxDispatch({ type: 'LOG_IN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));

      navigate('/protected');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <section
      className=" gradient-form py-1"
      style={{ backgroundColor: '#eee', marginBottom: '-15px' }}
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-2 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: 185 }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-2 pb-1">
                        We are The Security Guard
                      </h4>
                      {state.error && (
                        <MessageBox
                          color="danger"
                          message={state.message}
                          showMessage={showMessage}
                        />
                      )}
                    </div>
                    <form>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Username"
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          value={user.password}
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                      </div>
                      {state.loading ? (
                        <Loader />
                      ) : (
                        <div className="text-center pt-1 mb-5 pb-1 ">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            style={{ width: '100%' }}
                            onClick={clickHandler}
                          >
                            Log in
                          </button>
                          <Link className="text-muted" to="/forgotpass">
                            Forgot password?
                          </Link>
                        </div>
                      )}

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link
                          type="button"
                          className="btn btn-outline-danger"
                          to="/register"
                        >
                          Create new
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4 ">Securting Login with JWT</h4>
                    <p className="small mb-0 " style={{ fontSize: '17px' }}>
                      the user containing Email and Password is sent to node.js
                      backend, then, server is looking for email in database, if
                      found, compares the password with related hash password.
                      if everything is good, server creates JWT token and send
                      it to front-end. then, React saves it in localStorage. by
                      using useContext, React takes controll of authenticated
                      users and makes user request possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginScreen;
