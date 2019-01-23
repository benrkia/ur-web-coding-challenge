import React, { Component } from 'react'
import { userService } from '../services/user.service';

import Shop from '../components/Shop'

class PreferredShops extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shops: [],
    }
  }

  componentDidMount() {
    this.setState({ 
        shops: { loading: true }
    });
    userService.getPreferredShops().then(answer => {
      this.setState({ shops:answer.data })
    });
  }

  // handle the reaction
  applyReaction = (shop_id, data) => {
    if(data.message) {
      this.setState({shops: [...this.state.shops.filter((shop) => shop.id !== shop_id)]})
    }

    this.showAlert(data);
  }

  // handle the alert messages
  showAlert = (data) => {
    const div = document.createElement('div');
    div.className = 'alert ' + (data.message ? 'alert-success' : 'alert-danger');
    const span = document.createElement('span');
    span.className = 'close-alert';
    span.textContent = 'X';

    span.addEventListener('click', (e) => {
      e.target.parentElement.remove();
    })

    div.textContent = data.message ? data.message : data.error;
    div.appendChild(span);
    document.querySelector('#alerts').appendChild(div);
  }

  render() {

    const { shops} = this.state;

    return (
      <div className='shops'>
        <div id='alerts'></div>
        {shops.loading && <em>Loading nearby shops...</em>}
        {!shops.loading
          ?
            shops.length
            ? 
            shops.map(shop => (
              <Shop key={shop.id} shop={shop} preferred={true} applyReaction={this.applyReaction} />
            ))
            :
            <h2 style={{gridColumn: '1/5'}}>you have no preferred shops</h2>
          : null
        }
      </div>
    )
  }
}

export default PreferredShops;