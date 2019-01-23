import React, { Component } from 'react'
import { userService } from '../services/user.service';

class Shop extends Component {

    likeShop = (shop_id) => {
        userService.likeShop(shop_id).then(response => {
            this.props.applyReaction(shop_id, response);
        }, response => {
            this.props.applyReaction(shop_id, response);
        });
    }

    deslikeShop = (shop_id) => {
        userService.deslikeShop(shop_id).then(response => {
            this.props.applyReaction(shop_id, response);
        }, response => {
            this.props.applyReaction(shop_id, response);
        });
    }

    unlikeShop = (shop_id) => {
        userService.unlikeShop(shop_id).then(response => {
            this.props.applyReaction(shop_id, response);
        }, response => {
            this.props.applyReaction(shop_id, response);
        });
    }

  render() {
    const { shop, preferred } = this.props;

    return (
        <div className='shop'>
            <h3 className='shop-name'>{shop.name}</h3>
            <div className='shop-image'></div>
            <div className='shop-actions'>
                {!preferred
                    ?
                    <React.Fragment>
                        <button className='btn btn-danger' onClick={() => this.deslikeShop(shop.id)}>Deslike</button>
                        <button className='btn btn-success' onClick={() => this.likeShop(shop.id)}>Like</button>
                    </React.Fragment>
                    :
                    <button className='btn btn-danger' onClick={() => this.unlikeShop(shop.id)}>Remove</button>
                }
                
            </div>
        </div>
    )
  }

}

export default Shop
