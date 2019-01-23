import { Header } from '../helpers/header';

const { REACT_APP_API_URL: API_URL } = process.env;

export const userService = {
    login,
    register,
    logout,
    isLogged,
    getNearbyShops,
    getPreferredShops,
    likeShop,
    deslikeShop,
    unlikeShop,
};


/**
 * @param email 
 * @param password 
 * login request to api
 * in case of success save the user data (token) in local storage
*/
function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: Header(),
        body: JSON.stringify({ email, password })
    };

    return fetch(`${API_URL}login`, requestOptions)
        .then(handleResponse)
        .then(answer => {
            // login successful if there's a data in the response
            const { data } = answer;
            const user = {
                id: data.id,
                email: data.email,
                auth_token: data.api_token
            }
            
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

/**
 * @param email 
 * @param password 
 * login request to api
 * in case of success save the user data (token) in local storage
*/
function register(email, password, password_confirmation ) {
    const requestOptions = {
        method: 'POST',
        headers: Header(),
        body: JSON.stringify({ email, password, password_confirmation })
    };

    return fetch(`${API_URL}register`, requestOptions)
        .then(handleResponse)
        .then(answer => {
            // register successful if there's a data in the response
            const { data } = answer;
            const user = {
                id: data.id,
                email: data.email,
                auth_token: data.api_token
            }
            
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}


// remove user from local storage to log user out
async function logout() {
    if(isLogged()){
        const requestOptions = {
            method: 'POST',
            headers: Header()
        };
        await fetch(`${API_URL}logout`, requestOptions)
        .then(handleResponse);
        localStorage.removeItem('user');
    }
}


// check if user logged in
function isLogged() {
    return !!localStorage.getItem('user');
}


// fetch the nearby shops, sorted by distance
function getNearbyShops() {
    const requestOptions = {
        method: 'GET',
        headers: Header()
    };

    return fetch(`${API_URL}shops`, requestOptions)
    .then(handleResponse)
}


// fetch the preferred shops list, sorted by distance
function getPreferredShops() {
    const requestOptions = {
        method: 'GET',
        headers: Header()
    };

    return fetch(`${API_URL}shops/preferred`, requestOptions)
    .then(handleResponse);
}

// performe like reaction on a shop
function likeShop(shop_id) {
    const requestOptions = {
        method: 'POST',
        headers: Header(),
        body: JSON.stringify({ shop_id })
    };

    return fetch(`${API_URL}shops/like`, requestOptions)
    .then(handleResponse)
    .then(response => response.data);
}

// performe deslike reaction on a shop
function deslikeShop(shop_id) {
    const requestOptions = {
        method: 'POST',
        headers: Header(),
        body: JSON.stringify({ shop_id })
    };

    return fetch(`${API_URL}shops/deslike`, requestOptions)
    .then(handleResponse)
    .then(response => response.data);
}

// remove a shop from preferred, unlike a shop
function unlikeShop(shop_id) {
    const requestOptions = {
        method: 'POST',
        headers: Header(),
        body: JSON.stringify({ shop_id })
    };

    return fetch(`${API_URL}shops/unlike`, requestOptions)
    .then(handleResponse)
    .then(response => response.data);
}


/** 
 * @param response
 * handle the response of each request
 * return either the data or fire a reject 
*/
function handleResponse(response) {
    return response.text().then(text => {
        // the response from server is formated inside data
        // in case registration failure, we have message & errors as response
        const answer = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // automatic logout if 401 response returned from the api
                logout();
                window.location.reload(true);
            }

            const {data, message, errors } = answer;
            if(!data)
                return Promise.reject({message, errors});
            else
                return Promise.reject(data);
        }

        return answer;
    });
}