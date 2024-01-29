import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const login = useCallback((uId, token, exprationDate) => {
        setToken(token);
        setUserId(uId);
        const tokenExpirationDate = exprationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem('userData', JSON.stringify({
            userId: uId,
            token: token,
            tokenExpirationDate: tokenExpirationDate.toISOString()
        }))
    }, []);

    const logout = useCallback(() => {
        setToken('');
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token) {
            const remainTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainTime);
        }
        else {
            logoutTimer = clearTimeout();
        }
    }, [token, logout, tokenExpirationDate])


    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData &&
            storedData.token &&
            new Date(storedData.tokenExpirationDate) > new Date()) {
            login(storedData.userId, storedData.token, new Date(storedData.tokenExpirationDate));
        }
    }, [login]);

    return { token, login, logout, userId };
}