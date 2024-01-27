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
    if (parts.length > 1) {
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

export function generateRandomId(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

export function getCurrentISODataTime() {
  return new Date(Date.now()).toISOString();
}

export function isLocalStorageGreater(
  localState: any,
  db: MarkdownDB
): boolean {
  if (!localState || !localState.modified || !db || !db.modified) {
    return false;
  }
  // Parse the date strings into Date objects
  const localStorageDate = new Date(localState.modified);
  const comparisonDate = new Date(db.modified);

  // Compare the two dates
  return localStorageDate > comparisonDate;
}

export function setLocalData(id: any, jsonData: any) {
  const key = String(id);
  const value = jsonData ? JSON.stringify(jsonData) : '';
  // localStorage.setItem(key, value);
  sessionStorage.setItem(key, value);
}

export function getLocalData(id: any): any {
  const key = String(id);
  //const value = localStorage.getItem(String(key));
  const value = sessionStorage.getItem(String(key));
  return JSON.parse(value || '{}');
}

function propExistsInObject(object: any, propName: string): boolean {
  return object && propName in object;
}

function callPropIfExistsInObject(object: any, propName: string): void {
  if (propExistsInObject(object, propName)) {
    object[propName]();
  }
}

function changeCustomButtonIcon(
  id: string,
  previousIcon: string,
  newIcon: string,
  title: string
) {
  const fsButton = document.getElementById(id)?.querySelector('button');
  if (fsButton) {
    fsButton.title = title;
  }

  const icon = fsButton?.querySelector('i');
  if (icon) {
    icon.classList.remove(previousIcon);
    icon.classList.add(newIcon);
  }
}

export function toggleFullScreen() {
  const elem = document.documentElement;

  if (!document.fullscreenElement) {
    callPropIfExistsInObject(elem, 'requestFullscreen');
    callPropIfExistsInObject(elem, 'mozRequestFullScreen'); // Firefox
    callPropIfExistsInObject(elem, 'webkitRequestFullscreen'); // Chrome, Safari, Opera
    callPropIfExistsInObject(elem, 'msRequestFullscreen'); // IE/Edge
    changeCustomButtonIcon(
      Constant.OutsideAngularEvents.FullScreen,
      'fa-expand',
      'fa-compress',
      'Exit Full Screen (F)'
    );
  } else {
    callPropIfExistsInObject(document, 'exitFullscreen');
    callPropIfExistsInObject(document, 'mozCancelFullScreen'); // Firefox
    callPropIfExistsInObject(document, 'webkitExitFullscreen'); // Chrome, Safari, Opera
    callPropIfExistsInObject(document, 'msExitFullscreen'); // IE/Edge
    changeCustomButtonIcon(
      Constant.OutsideAngularEvents.FullScreen,
      'fa-compress',
      'fa-expand',
      'Show in Full Screen (F)'
    );
  }
}

export function isMermaidApp(): boolean {
  try {
    const parsedUrl = new URL(window.location.href);

    // Check if the port is 4500 for localhost
    if (parsedUrl.hostname === 'localhost' && parsedUrl.port === '4500') {
      return true;
    }

    // Check if the hostname contains 'mermaid.'
    if (parsedUrl.hostname.includes('mermaid.')) {
      return true;
    }

    // Check if the hostname contains 'diagram.'
    if (parsedUrl.hostname.includes('diagram.')) {
      return true;
    }

    return false;
  } catch (e) {
    console.error('Error parsing the current window URL:', e);
    return false;
  }
}
