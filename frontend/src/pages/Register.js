import React, { Component } from 'react'

import { userService } from '../services/user.service';

class Register extends Component {

  constructor(props) {
    super(props);

    // automatic logout when a user access to this page
    if(userService.isLogged())
      userService.logout();

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      submitted: false,
      loading: false,
      message: '',
      errors: '',

    };

  }

  // handle to input change
  handleChange = (e) => {
    this.setState({message:'', errors:''})
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  // handle the form submission
  handleSubmit = (e) => {
    e.preventDefault();

    // this will help in error reporting
    this.setState({ submitted: true });
    const { email, password, password_confirmation } = this.state;

    if (!(email && password && password_confirmation) || (password !== password_confirmation)) {
        return;
    }

    this.setState({ loading: true });

    /**
     * register has to cases:
     * success, implies store the user's data
     * failure, show an error message
    */
    userService.register(email, password, password_confirmation)
        .then(
            user => {
                const from = { pathname: "/" };
                this.props.history.push(from);
            },
            data => {
              this.setState({ message:data.message, errors:data.errors, loading: false })
            }
        );
  }

  render() {

    const { email, password, password_confirmation, submitted, message, errors } = this.state;
    return (
      <div className='register'>
        <h1>Register</h1>
        {message &&
          <span className='invalid-feedback lg'>{message}</span>
        }
        <form onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && (!email || (errors && errors.email)) ? ' invalid' : '')}>
            <label htmlFor='email'>Email</label>
            <input className='form-control' type='email' id='email' placeholder='your email' value={email} onChange={this.handleChange} />
            {submitted && !email &&
              <span className="invalid-feedback">Email is required</span>
            }
            {
              submitted && errors && errors.email &&
              errors.email.map((error, index) => (
                <span key={index} className="invalid-feedback">{error}</span>
              ))
            }
          </div>
          <div className={'form-group' + (submitted && (!password || (errors && errors.password)) ? ' invalid' : '')}>
            <label htmlFor='password'>Pssword</label>
            <input className='form-control' type='password' id='password' placeholder='your password' value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <span className="invalid-feedback">Password is required</span>
            }
            {
              submitted && errors && errors.password &&
              errors.password.map((error, index) => (
                <span key={index} className="invalid-feedback">{error}</span>
              ))
            }
          </div>
          <div className={'form-group' + (submitted && (!password_confirmation || password_confirmation !== password) ? ' invalid' : '')}>
            <label htmlFor='password_confirmation'>Pssword Confirmation</label>
            <input className='form-control' type='password' id='password_confirmation' placeholder='confirm the password' value={password_confirmation} onChange={this.handleChange} />
            {submitted
              ? (!password_confirmation
                ? <span className="invalid-feedback">Password confirmation is required</span>
                : (password_confirmation !== password
                  ? <span className="invalid-feedback">Password confirmation does not match</span>
                  : null
                  )
                )
              : null
            }
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
