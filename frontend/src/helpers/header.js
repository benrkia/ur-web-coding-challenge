/**
 * generate the header
 * in case of logged user the authorization header is automatically added
*/
export function Header() {

    const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    // check if the user is logged in
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.auth_token) {
        return {
            ...header,
            'Authorization': 'Bearer ' + user.auth_token,
        };
    } else {
        return header;
    }
}