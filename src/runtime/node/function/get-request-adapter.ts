import http from 'http'
import https from 'https'

export const getRequestAdapter =  (url: string) => {
    if(url.startsWith('https')){
        return  https;
    }
    return http;
};
