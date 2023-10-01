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
    }
   
  }