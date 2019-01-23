import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service'

class Navbar extends Component {

    render() {

        const logged = userService.isLogged();

        return (
            <nav className='main-navbar'>
                <div className='wrapper'>
                    <Link to='/' className='home'>
                        <h2>Nearby Shops</h2>
                    </Link>
                    <ul className='right-nav'>
                        {!logged ? (
                            <React.Fragment>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                        </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li>
                                    <Link to='/'>Nearby Shops</Link>
                                </li>
                                <li>
                                    <Link to='/preferred'>Preferred Shops</Link>
                                </li>
                                <li>
                                    <Link to='/logout'>Logout</Link>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar