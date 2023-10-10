import { Constant } from './../utils/constants';
// state.ts
import { StartingTemplate } from "../utils/starter-template";
import { MarkdownDB } from '../models/db.model';

export interface ErrorState {
    errorType: string, 
    message: string
} 

export interface URLInfo {
    id?: string, 
    loadType?: string,
    mode?: string,
    name?: string
} 

export interface LoginUser {
    id?: string; 
    name?: string;
    imageUrl?: string;
} 



export interface RevealJsState {
    editor: Editor;
    editorInitialized: boolean;
    loading: boolean
    id: number,
    name: string,
    urlInfo: URLInfo,
    isLogin?: boolean,
    loginUser?: LoginUser,
    error?: ErrorState,
    loginUserEditors?: MarkdownDB[]
    allowPublicAccess?: boolean;
}

export interface Editor {
    content: string;
    themeSelected: string;
    animationSelected: string;
    showPen: boolean;
    showDrawingArea: boolean;
    showSlides: boolean;
    toggleViewer: boolean;
}

export const initialState: RevealJsState = {
    editor: {
      content: StartingTemplate,
      themeSelected: 'White',
      animationSelected: 'Slide',
      showPen: true,
      showDrawingArea: true,
      showSlides: true,
      toggleViewer: true,
    },
    editorInitialized: false,
    loading: true,
    id: 0,
    isLogin: false,
    name: Constant.DefaultName,
    loginUserEditors: [],
    urlInfo: {
        loadType: Constant.UrlLoadType.Startup
    }
};
