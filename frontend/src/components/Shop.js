import React, { Component } from 'react'

class Shop extends Component {

  render() {
    const { shop } = this.props;

    return (
        <div className='shop'>
            <h3 className='shop-name'>{shop.name}</h3>
            <div className='shop-image'></div>
            <div className='shop-actions'>
                <button className='btn btn-danger'>Deslike</button>
                <button className='btn btn-success'>Like</button>
            </div>
        </div>
    )
  }

}

export default Shop
