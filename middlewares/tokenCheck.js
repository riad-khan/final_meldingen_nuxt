import jwtDecode from "jwt-decode";

export const checkTTL = (token) => {
    if (!token) return false;
    if (token) {
        const {exp} = jwtDecode(token)
        return (new Date()).getTime() < exp * 1000
    } else {
        return false
    }
}