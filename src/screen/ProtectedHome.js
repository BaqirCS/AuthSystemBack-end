import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from '../context/Store';
import axios from 'axios';
import { HomeReducer, initialState } from '../reducer/HomeReducer';
function ProtectedHome() {
  const { state: ctxState } = useContext(Store);
  const [role, setRole] = useState(ctxState.userInfo.user.status);
  const [state, dispatch] = useReducer(HomeReducer, initialState);
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState('');
  const refreshHandler = () => {
    window.location.reload();
  };
  const deleteHandler = (id) => {
    const copyItem = users.filter((item) => {
      return item._id !== id;
    });
    setUsers(copyItem);
  };
  const chageRoleHandler = (status) => {
    setRole(status);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    try {
      dispatch({ type: 'GET_USER_REQUEST' });
      const { data } = await axios.get(`${ctxState.baseUrl}/users`, {
        headers: {
          authorization: `Bearer ${ctxState.userInfo.token}`,
        },
      });
      dispatch({ type: 'GET_USER_SUCCESS', payload: data });
      setUsers(data);
    } catch (error) {
      dispatch({ type: 'GET_USER_FAIL', payload: error.response.data });
    }
  };
  const chageNumberHandler = () => {
    const x = parseInt(Math.random() * 6 + 1);
    setNumber(x);
  };
  return (
    <div className="container">
      <h4 className="text-center mt-3">
        Hi <b style={{ color: 'red' }}> {ctxState.userInfo.user.name}</b>{' '}
      </h4>
      <div className="text-center mb-2">
        <p>
          do you want to check Admin authority? then, if you are lucky, you
          bring <b style={{ color: 'red' }}>6</b> and can change your status to
          admin
        </p>
        <div style={{ marginTop: '-10px' }}>
          <i style={{ color: 'gray', fontWeight: 'bold' }}>
            your random number is{' '}
          </i>{' '}
          <b style={{ color: 'red' }}>{number}</b>
        </div>
        <button
          className="btn btn-primary btn-block fa-lg gradient-custom-3 mb-3"
          style={{ border: 'none' }}
          onClick={chageNumberHandler}
          disabled={role === 'admin'}
        >
          Generate Randon Number
        </button>
        <br />
      </div>
      {role === 'user' && (
        <div className="text-center mb-2">
          {number === 6 && (
            <button
              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
              style={{ border: 'none' }}
              onClick={() =>
                chageRoleHandler(role === 'admin' ? 'user' : 'admin')
              }
            >
              Chagne to Admin
            </button>
          )}
        </div>
      )}
      {role === 'admin' && (
        <div className="text-center mb-2">
          {number === 6 && (
            <button
              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
              style={{ border: 'none' }}
              onClick={() => chageRoleHandler('user')}
            >
              Chagne to User
            </button>
          )}
        </div>
      )}

      <div className="row align-items-center justify-content-center">
        {users.length > 0 ? (
          <table
            className="table table-sm table-striped text-center"
            style={{ width: '60%', marginBottom: '30px' }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                {role === 'admin' && <th scope="col">ACTION</th>}
              </tr>
            </thead>
            <tbody>
              {state.users &&
                state.users.length > 0 &&
                users.map((item, index) => (
                  <tr key={item._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    {role === 'admin' && (
                      <td>
                        <button
                          onClick={() => deleteHandler(item._id)}
                          className="btn"
                          style={{ color: 'red' }}
                        >
                          {' '}
                          <i className="bi bi-trash-fill"> </i>{' '}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <button
            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
            onClick={refreshHandler}
            style={{ width: '40%' }}
          >
            {' '}
            Refresh Page
          </button>
        )}
      </div>
    </div>
  );
}

export default ProtectedHome;
