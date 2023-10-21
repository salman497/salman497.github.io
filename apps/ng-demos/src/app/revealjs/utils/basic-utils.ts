import { MarkdownDB } from './../models/db.model';
import { LoginUser } from './../state/state';
import { URLInfo } from '../state/state';
import { Constant } from './constants';

export const valueExist = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }

  return true;
};

export function getQueryParam(param: string) {
  // Getting the query string from the current URL
  const queryString = window.location.search;
  // Removing the leading '?' from the query string
  const queryParams = new URLSearchParams(queryString);
  // Getting the value of the specified query parameter
  const value = queryParams.get(param);
  return value;
}

export function addQueryParam(key: string, value: string | number) {
  window.location.hash = `${window.location.hash}?${key}=${value}`;
}

export function getSlideNumberFromFragments(fragment: string | null): {
  slideNumber?: string;
  slideNumberVertical?: string;
} {
  if (!fragment) {
    return {};
  }

  if (fragment.includes('/')) {
     // '/15'
    const parts = fragment.split('/');
    const slideNumber = parts[1];
    let slideNumberVertical;
    if(parts.length > 1) {
        slideNumberVertical = parts[2];
    }
   
    return {
      slideNumber,
      slideNumberVertical,
    };
  }

  return {
    slideNumber: fragment,
  };
}

export function updateWindowHash(event: any) {
  console.log('-------updateWindowHash-------', event);

  const currentURL = window.location.href; // Get the current URL
  let newHash = '';

  if (event.indexh && event.indexv) {
    newHash = `/${event.indexh}/${event.indexv}`;
  } else if (event.indexh) {
    newHash = `/${event.indexh}`;
  } else {
    newHash = '/';
  }

  const newURL = currentURL.split('#')[0] + `#${newHash}`;

  // Use history.replaceState to update the URL without reloading
  history.replaceState(null, '', newURL);
}

export function generateShortID(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function isEmpty(value: string | number): boolean {
  if (value == null) {
    // This checks for both null and undefined
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
  if (param.loadType === Constant.UrlLoadType.Published) {
    return `${window.location.origin}/${param.loadType}/${param.mode}/${param.id}/${param.name}`;
  }
  return ``;
}

export function buildPublishedURL(id: string, name: string): string {
  return `${window.location.origin}/${Constant.UrlLoadType.Published}/${Constant.UrlMode.Edit}/${id}/${name}`;
}

export function allowEdit(
  loginUser: LoginUser | undefined,
  dbItem: MarkdownDB
): boolean {
  if (
    dbItem.allow_edit === false &&
    dbItem.user_id &&
    dbItem.user_id !== loginUser?.id
  ) {
    return false;
  }

  return true;
}
