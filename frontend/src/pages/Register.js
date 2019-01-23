import React, { Component } from 'react'

class Register extends Component {
  render() {
    return (
      <div className='register'>
        <h1>Create an account</h1>
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
            <label htmlFor='password_confirmation'>Pssword Confirmation</label>
            <input className='form-control' type='password' id='password_confirmation' placeholder='confirm the password' />
          </div>
          <div className='form-group'>
            <input className='btn' type='submit' value='Register' />
          </div>
        </form>
      </div>
    )
  }
}

export default Register
