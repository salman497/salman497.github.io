import { Constant } from './../utils/constants';
// state.ts
import { StartingTemplate } from "../utils/starter-template";

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

export interface RevealJsState {
    editor: Editor;
    editorInitialized: boolean;
    loading: boolean
    id: number,
    name: string,
    urlInfo: URLInfo,
    error?: ErrorState
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
    name: Constant.DefaultName,
    urlInfo: {
        loadType: Constant.UrlLoadType.Startup
    }
};
