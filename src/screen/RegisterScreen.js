import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { initialState, RegisterReducer } from '../reducer/RegisterReducer';
import MessageBox from '../component/MessageBox';
import Loader from '../component/Loader';
import { Store } from '../context/Store';

function RegisterScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    confirmPass: '',
  });
  const [state, dispatch] = useReducer(RegisterReducer, initialState);
  const { state: ctxState } = useContext(Store);
  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [state.success, navigate]);

  const clickHandler = async (e) => {
    e.preventDefault();
    if (!user.email) {
      return dispatch({
        type: 'REGISTER_FAIL',
        payload: 'Email is Required!!!',
      });
    }
    if (!user.name) {
      return dispatch({
        type: 'REGISTER_FAIL',
        payload: 'Name of user is Required!!!',
      });
    }
    if (!user.password) {
      return dispatch({
        type: 'REGISTER_FAIL',
        payload: 'Password is Required!!!',
      });
    }
    if (user.password.length < 6) {
      return dispatch({
        type: 'REGISTER_FAIL',
        payload: 'Password is too short!!!',
      });
    }
    if (!user.confirmPass) {
      return dispatch({
        type: 'REGISTER_FAIL',
        payload: 'Confirm Password is Required!!!',
      });
    }
    if (user.password !== user.confirmPass) {
      return dispatch({
        type: 'REGISTER_FAIL',
        payload: 'Passwords do not match!!!',
      });
    }
    try {
      dispatch({ type: 'REGISTER_REQUEST' });
      await axios.post(`${ctxState.baseUrl}/users`, user);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: 'Your account is successfully created',
      });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <section
      className=" gradient-form py-1"
      style={{ backgroundColor: '#eee', marginBottom: '-20px' }}
    >
      <div className="container ">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-1 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: 185 }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-2 pb-1">
                        We are The Security Taker
                      </h4>
                      {state.error && (
                        <MessageBox
                          color="danger"
                          message={state.message}
                          showMessage={showMessage}
                        />
                      )}
                      {state.success && (
                        <MessageBox
                          color="info"
                          message={state.message}
                          showMessage={showMessage}
                        />
                      )}
                    </div>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center ">
                        <i
                          className="bi bi-person-fill h3"
                          style={{
                            marginTop: '-25px',
                            marginRight: '10px',
                          }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Your Name"
                            value={user.name}
                            onChange={(e) =>
                              setUser({ ...user, name: e.target.value })
                            }
                          />
                          <label className="form-label" htmlFor="name"></label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center ">
                        <i
                          className="bi bi-envelope-fill h3"
                          style={{
                            marginTop: '-25px',
                            marginRight: '10px',
                          }}
                        ></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Your Email"
                            value={user.email}
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                          />
                          <label className="form-label" htmlFor="email"></label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <i
                          className="bi bi-lock-fill h3"
                          style={{
                            marginTop: '-25px',
                            marginRight: '10px',
                          }}
                        ></i>{' '}
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) =>
                              setUser({ ...user, password: e.target.value })
                            }
                          />
                          <div>
                            <small
                              style={{ color: 'green', marginBottom: '10px' }}
                            >
                              password : least 6 characters, 1 Uppercase, 1
                              digit
                            </small>
                          </div>
                          <label
                            className="form-label"
                            htmlFor="password"
                          ></label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <i
                          className="bi bi-key-fill h3"
                          style={{
                            marginTop: '-25px',
                            marginRight: '10px',
                          }}
                        ></i>{' '}
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="repeatPassword"
                            className="form-control"
                            placeholder="Repeat Your Password"
                            value={user.confirmPass}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                confirmPass: e.target.value,
                              })
                            }
                          />
                          <label
                            className="form-label"
                            htmlFor="repeatPassword"
                          ></label>
                        </div>
                      </div>

                      <div className=" justify-content-center flex-fill  text-center mx-4  mb-lg-4">
                        {state.loading ? (
                          <Loader />
                        ) : (
                          <div className="text-center pt-1 mb-5 pb-1 ">
                            <button
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                              type="button"
                              style={{ width: '100%', marginLeft: '15px' }}
                              onClick={clickHandler}
                            >
                              Register
                            </button>
                            <p>
                              {' '}
                              already have an account?
                              <Link
                                className="text-muted "
                                to="/login"
                                style={{
                                  marginBottom: '70px',
                                  textDecoration: 'none',
                                }}
                              >
                                Log in
                              </Link>
                            </p>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Controlled Password Format</h4>
                    <p className="small mb-0">
                      password is controlled in a way that it is instructed. if
                      the passwor follows the rules, it goes to back-end. then,
                      server looks for Email to see it is valid or not, then
                      looks for existing user with the same Email address. if
                      not found, create a user nad hash its password. boutique
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

export default RegisterScreen;
