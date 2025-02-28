import { Constant } from './../utils/constants';
import { MarkdownDB } from '../models/db.model';
import { getStarterTemplate } from '../utils/basic-utils';

export interface ErrorState {
    errorType: string, 
    message: string
} 

export interface URLInfo {
    id?: string, 
    loadType?: string,
    mode?: string,
    name?: string
    slideNumber?: string,
    slideNumberVertical?: string
    resetHash?: boolean
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
    allowEdit?: boolean;
    isEditorVisible?: boolean;
    modified?:string;
}

export interface Editor {
    content: string;
    themeSelected: string;
    animationSelected: string;
    mermaidStyleSelected: string;
    showPen: boolean;
    showDrawingArea: boolean;
    showSlides: boolean;
    showAutoSlide:boolean;
    toggleViewer: boolean;
    showAutoDelayInMS: number;
}

export const initialState: RevealJsState = {
    editor: {
      content: getStarterTemplate(),
      themeSelected: 'Black',
      animationSelected: 'Slide',
      mermaidStyleSelected: '',
      showPen: true,
      showDrawingArea: true,
      showSlides: true,
      toggleViewer: true,
      showAutoSlide: true,
      showAutoDelayInMS: 2000
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
