import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            setIsLoading(true);
            const httpAbortCtrll = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrll);

            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrll.signal
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            // setLoadedUsers(responseData.users);
            setIsLoading(false);
            return responseData;
        }
        catch (error) {
            console.log("authSubmitHandeler : ", error);
            setIsLoading(false);
            setError(error.message || 'Something went wrong, please try again.');
        }
    }, []);


    const clearError = () => {
        setError(null);
    }

    useEffect(() => {


        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abortCtrl());
        }
    }, [])



    return { isLoading, error, sendRequest, clearError };
};