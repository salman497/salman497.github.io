// state.ts
import { StartingTemplate } from "../utils/starter-template";

export interface ErrorState {
    errorType: string, 
    message: string
} 
export interface RevealJsState {
    editor: Editor;
    editorInitialized: boolean;
    loading: boolean
    id: number,
    name: string,
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
    name: 'startup' 
};
