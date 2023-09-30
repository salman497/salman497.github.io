import { StartingTemplate } from "../utils/constant";

export interface RevealJsState {
    editor: Editor;
  }

  export interface Editor {
    content: string;
    themeSelected: string;
    animationSelected: string;
    showPen: boolean;
    showDrawingArea: boolean;
    showSlides: boolean;
    toggleViewer: boolean;
    linkId: string; 
  }
  
  export const initialState: RevealJsState = {
    editor: {
      content: StartingTemplate,
      themeSelected: 'Black',
      animationSelected: 'Slide',
      showPen: true,
      showDrawingArea: true,
      showSlides: true,
      toggleViewer: true,
      linkId: ''
    }
  };