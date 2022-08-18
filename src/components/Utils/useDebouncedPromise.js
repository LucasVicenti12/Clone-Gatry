import { useRef } from "react";

export default function useDebouncedPromise(fn, delay){
    let timeoutRef = useRef(null);

    function handler(...params){
        return new Promise((res, rej) => {
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = window.setTimeout(async () => {
                try {
                    const response = await fn(...params); 
                    res(response) 
                } catch (error) {
                    rej(error)
                }
            }, delay)
        })
    }

    return handler
}