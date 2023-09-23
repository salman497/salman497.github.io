import { StartingTemplate } from "../utils/constant";

export interface RevealJsState {
    editor: Editor;
  }

  export interface Editor {
    content: string;
  }
  
  export const initialState: RevealJsState = {
    editor: {
        content: StartingTemplate
    }
  };