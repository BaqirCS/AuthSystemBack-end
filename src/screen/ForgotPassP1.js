import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { Store } from '../context/Store';
import { forgotPassReducer, initialState } from '../reducer/ForgotPassReducer';

function ForgotPassP1() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [state, dispatch] = useReducer(forgotPassReducer, initialState);
  const { state: ctxState } = useContext(Store);

  const clickHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      return dispatch({
        type: 'FORGOT_PASS_FAIL',
        payload: 'Email is required!!!',
      });
    }
    try {
      dispatch({ type: 'FORGOT_PASS_REQUEST' });
      const { data } = await axios.post(`${ctxState.baseUrl}/users/sendMail`, {
        email,
      });
      dispatch({ type: 'FORGOT_PASS_SUCCESS', payload: data });
      navigate('/waiting');
    } catch (error) {
      dispatch({ type: 'FORGOT_PASS_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <div style={{ backgroundColor: '#eee' }}>
      <section
        className="h-100  px-5"
        style={{
          marginLeft: '160px',
          marginRight: '160px',
          marginBottom: '-15px',
        }}
      >
        <div className="gradient-custom-2  pt-5">
          <div className="container pb-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card" style={{ borderRadius: '1rem' }}>
                  <h3 className="fw-bold text-center pt-5 text-uppercase card-title">
                    Forgot Password
                  </h3>
                  {state.error && (
                    <MessageBox
                      color="danger"
                      message={state.message}
                      showMessage={showMessage}
                    />
                  )}
                  <div className="card-body px-5 text-center">
                    <div className="mb-md-5 pb-5">
                      <p className=" mb-3">
                        Please Enter Your Registered Email Address
                      </p>
                      <div className="form-outline form-white">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {state.loading ? (
                        <Loader />
                      ) : (
                        <>
                          {' '}
                          <button
                            type="button"
                            className="btn btn-outline-danger mt-4"
                            style={{ width: '100%' }}
                            onClick={clickHandler}
                          >
                            SEND
                          </button>
                          <Link
                            type="button"
                            className="btn btn-outline-danger mt-3"
                            style={{ width: '100%' }}
                            to="/login"
                          >
                            BACK
                          </Link>
                        </>
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

export default ForgotPassP1;
