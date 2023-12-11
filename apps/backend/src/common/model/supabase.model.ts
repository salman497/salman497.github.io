export interface BaseTable {
    id?: number,
    created_at?: any,
}

export interface MarkdownTable extends BaseTable {
    editor?: Editor
    user_id?: any,
    name?: string,
    url_name?: string,
    allow_edit?: boolean,
    modified?: string
}

export interface Editor {
    content: string;
    themeSelected: string;
    animationSelected: string;
    showPen: boolean;
    showDrawingArea: boolean;
    showSlides: boolean;
    showAutoSlide:boolean;
    toggleViewer: boolean;
}
