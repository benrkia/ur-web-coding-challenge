import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className='login'>
        <h1>Login</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input className='form-control' type='email' id='email' placeholder='your email' />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Pssword</label>
            <input className='form-control' type='password' id='password' placeholder='your password' />
          </div>
          <div className='form-group'>
            <input className='btn' type='submit' value='Login' />
          </div>
        </form>
      </div>
    )
  }
}

export default Login
