import React, { Component } from 'react'

import { userService } from '../services/user.service';

class Login extends Component {

  constructor(props) {
    super(props);

    // automatic logout when a user access to this page
    if(userService.isLogged())
      userService.logout();

    this.state = {
      email: '',
      password: '',
      submitted: false,
      loading: false,
      error: ''
    };

  }

  // handle to input change
  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  // handle the form submission
  handleSubmit = (e) => {
    e.preventDefault();

    // this will help in error reporting
    this.setState({ submitted: true });
    const { email, password } = this.state;

    if (!(email && password)) {
        return;
    }

    this.setState({ loading: true });

    /**
     * login has to cases:
     * success, implies store the user's data & redirect to original location
     * failure, show an error message
    */
    userService.login(email, password)
        .then(
            user => {
                const { from } = this.props.location.state || { from: { pathname: "/" } };
                this.props.history.push(from);
            },
            data => {
              this.setState({ error:data.error, loading: false })
            }
        );
  }

  render() {

    const { email, password, submitted, error } = this.state;

    return (
      <div className='login'>
        <h1>Login</h1>
        {error &&
          <span className='invalid-feedback lg'>{error}</span>
        }
        <form onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !email ? ' invalid' : '')}>
            <label htmlFor='email'>Email</label>
            <input className='form-control' type='email' id='email' placeholder='your email' value={email} onChange={this.handleChange} />
            {submitted && !email &&
              <span className="invalid-feedback">Email is required</span>
            }
          </div>
          <div className={'form-group' + (submitted && !password ? ' invalid' : '')}>
            <label htmlFor='password'>Pssword</label>
            <input className='form-control' type='password' id='password' placeholder='your password' value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <span className="invalid-feedback">Password is required</span>
            }
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
