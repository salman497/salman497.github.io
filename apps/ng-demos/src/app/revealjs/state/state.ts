// state.ts
import { StartingTemplate } from "../utils/constant";

export interface RevealJsState {
    editor: Editor;
    loaded: boolean;
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
    loaded: false
};
