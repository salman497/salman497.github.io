import { Editor } from './../state/state';
export interface MarkdownDB {
    id?: number,
    created_at?: any,
    editor?: Editor
    user_id?: any,
    name?: string,
    url_name?: string,
}