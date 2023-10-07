import { URLInfo } from "../state/state";
import { Constant } from "./constants";

export const valueExist = (value: any) : boolean => {
    if(value === null || value === undefined) {
        return false;
    }

    return true;
}

export function getQueryParam(param: string) {
    // Getting the query string from the current URL
    const queryString = window.location.search;
    // Removing the leading '?' from the query string
    const queryParams = new URLSearchParams(queryString);
    // Getting the value of the specified query parameter
    const value = queryParams.get(param);
    return value;
  }


export function addQueryParam(key: string, value: any) {
    window.location.hash = `${window.location.hash}?${key}=${value}`;
  }
  


  export function updateWindowHash(event: any) {
    console.log('-------updateWindowHash-------', event);
    const queryString = window.location.search;
    if(event.indexh && event.indexv) {
        // Set the new hash fragment, keeping the existing query string
        window.location.hash = `/${event.indexh}/${event.indexv}${queryString}`;
    }
    else if (event.indexh) {
        // Set the new hash fragment, keeping the existing query string
        window.location.hash = `/${event.indexh}${queryString}`;
    } else {
        window.location.hash = '/';
    }
   
  }

  export function generateShortID(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function isEmpty(value: any): boolean {
    if (value == null) { // This checks for both null and undefined
        return true;
    }

    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return false;
    }

    return true; // Default case, though you might want to adjust based on your needs
}


export function buildURL(param: URLInfo): string {
    if(param.loadType === Constant.UrlLoadType.Published) {
        return `${window.location.origin}/${param.loadType}/${param.mode}/${param.id}/${param.name}`;
    }
    return ``;
}