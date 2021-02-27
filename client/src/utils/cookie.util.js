import {G_COOKIE_NAME} from '../constants/constants'
const __setCookie = (cookieName, cookieValue, age = 5, age_format = "min") => {
    switch (age_format) {
        case "min": //Age in minutes
            age *= 60;
            break;
        case "hour": //Age in hours
            age *= 60 * 60;
            break;
        case "day": //Age in days
            age *= 60 * 60 * 24;
            break;
        case "month": //Age in months(month is taken as 30 days)
            age *= 60 * 60 * 24 * 30;
            break;
        case "year": //Age in years
            age *= 60 * 60 * 24 * 365;
            break;
        default: //Age in seconds
    }
    document.cookie = `${cookieName}=${cookieValue};max-age=${age};Path=/;`;
};

const __deleteCookie = (cookieName) => {
    cookieName = cookieName.trim();
    document.cookie = `${cookieName}=;Path=/;Expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

const __getCookie = (name) => {
    let cookie = document.cookie;
    cookie = cookie.split(name + "=");
    let cookieValue, cookieExists;
    //if the split length is 2 that means cookie exists
    if (cookie.length === 2 && cookie[1]) {
        cookieValue = cookie[1].split(";")[0];
        cookieExists = true;
    } else cookieExists = false;
    return {
        cookieExists,
        cookieValue: cookieValue ? cookieValue : null,
    };
};

const check_login = () => {
    const token_cookie = __getCookie(G_COOKIE_NAME);
    return (
        token_cookie.cookieExists &&
        token_cookie.cookieValue !== undefined &&
        token_cookie.cookieValue !== null
    );
};

export { __setCookie, __deleteCookie, __getCookie,check_login };
