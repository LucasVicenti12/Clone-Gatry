import { useState } from "react"
import axios from "axios";
import useDebouncedPromise from "./useDebouncedPromise";

const initialRequestInfo = {    
    error: null,
    data: null,
    loading: false,
}

export default function useApi(config){
    const [requestInfo, setRequestInfo] = useState(initialRequestInfo);
    const debouncedAxios = useDebouncedPromise(axios, config.debounceDelay);
    async function call(localconfig){
        const finalConfig = {
            baseURL: 'http://localhost:5000',
            ...config,
            ...localconfig
        }
        if(!finalConfig.quietly){
            setRequestInfo({
                ...initialRequestInfo,
                loading: true,
            })   
        }
        let response = null;
        const fn = finalConfig.debounced ? debouncedAxios : axios
        try {
            response = await fn(finalConfig);
            setRequestInfo({
                ...initialRequestInfo,
                data: response.data,
            })  
        } catch (error) {
            setRequestInfo({
                ...initialRequestInfo,
                error,
            }) 
        }   
        
        if(config.onCompleted){
            config.onCompleted(response);
        }
    }

    return[
        call,
        requestInfo
    ]
}