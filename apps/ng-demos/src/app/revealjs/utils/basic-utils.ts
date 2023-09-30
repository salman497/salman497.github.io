export const valueExist = (value: any) : boolean => {
    if(value === null || value === undefined) {
        return false;
    }

    return true;
}

export function addQueryParam(key: string, value: string) {
    // Create a URL object with the current URL
    const url = new URL(window.location.href);
    
    // Get the query string parameters from the URL
    const params = new URLSearchParams(url.search);
    
    // Add or update the query string parameter
    params.set(key, value);
    
    // Update the query string in the URL object
    url.search = params.toString();
    
    // Update the URL in the address bar without reloading the page
    window.history.pushState({}, '', url.toString());
  }
  