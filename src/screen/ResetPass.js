import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { Store } from '../context/Store';
import { initialState, resetPassword } from '../reducer/ResetPasswordReducer';

function ResetPass() {
  const search = new URLSearchParams(useLocation().search);
  const token = search.get('token');
  const email = search.get('email');
  const [state, dispatch] = useReducer(resetPassword, initialState);
  const { state: ctxState } = useContext(Store);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
    token,
    email,
  });
  useEffect(() => {
    setInterval(() => {
      if (state.success) {
        navigate('/login');
      }
    }, 3000);
  }, [state.success, navigate]);

  const clickHandler = async (e) => {
    e.preventDefault();
    if (!user.token) {
      return dispatch({
        type: 'PASS_RESET_FAIL',
        payload: 'Validation Error!!!',
      });
    }
    if (!user.email) {
      return dispatch({
        type: 'PASS_RESET_FAIL',
        payload: 'Validation Error!!!',
      });
    }
    if (!user.password) {
      return dispatch({
        type: 'PASS_RESET_FAIL',
        payload: 'Password is required!!!',
      });
    }
    if (user.password.length < 6) {
      return dispatch({
        type: 'PASS_RESET_FAIL',
        payload: 'Password is too short!!!',
      });
    }
    if (!user.confirmPassword) {
      return dispatch({
        type: 'PASS_RESET_FAIL',
        payload: 'Confirm Password is required!!!',
      });
    }
    if (user.password !== user.confirmPassword) {
      return dispatch({
        type: 'PASS_RESET_FAIL',
        payload: 'Passwords donot match!!!',
      });
    }

    try {
      dispatch({ type: 'PASS_RESET_REQUEST' });
      const { data } = await axios.post(
        `${ctxState.baseUrl}/users/resetpass`,
        user
      );
      dispatch({ type: 'PASS_RESET_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'PASS_RESET_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <div style={{ backgroundColor: '#eee', marginBottom: '-15px' }}>
      <section
        className="h-100  py-5 px-5"
        style={{ marginLeft: '160px', marginRight: '160px' }}
      >
        <div className="gradient-custom-2  pt-5">
          <div className="container pb-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card" style={{ borderRadius: '1rem' }}>
                  <h3 className="fw-bold text-center pt-5 text-uppercase card-title">
                    Reset Password
                  </h3>
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
                  <div className="card-body px-5 text-center">
                    <div className="mb-md-5 pb-5">
                      <p className=" mb-3">Please Enter Your password</p>
                      <div className="form-outline form-white">
                        <input
                          type="password"
                          id="typePassword"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          value={user.password}
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                        <small style={{ color: 'green', marginBottom: '10px' }}>
                          least 6 characters, 1 Uppercase, 1 digit
                        </small>
                        <input
                          type="text"
                          id="typeConfirm"
                          className="form-control form-control-lg mt-3"
                          placeholder="Confirm Password"
                          value={user.confirmPassword}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                      {state.loading ? (
                        <Loader />
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-danger mt-4"
                          style={{ width: '100%' }}
                          onClick={clickHandler}
                        >
                          CHANGE PASSWORD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetPass;
