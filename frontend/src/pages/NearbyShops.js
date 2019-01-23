import React, { Component } from 'react'
import Shop from '../components/Shop'

class NearbyShops extends Component {

  render() {

    const shops = Array(50).fill(1).map((shop, index) => ({id:index+1, name:`shop ${index+1}`}));

    return (
      <div className='shops'>
        {
          shops.map(shop => (
            <Shop key={shop.id} shop={shop} />
          ))
        }
      </div>
    )
  }
}

export default NearbyShops
