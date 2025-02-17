

export const Constant = {
    UrlRoute: {
        Startup: ':loadType' as const,
        Local: ':loadType/:mode/:name' as const,
        Published: ':loadType/:mode/:identifier/:name' as const
    },
    UrlPart: {
        Type: 'loadType' as const,
        Mode: 'mode' as const,
        Id: 'identifier' as const,
        Name: 'name' as const
    },

    UrlMode: {
        Edit: 'edit' as const,
        View: 'view' as const
    },
    UrlLoadType: {
        Local: 'local' as const,
        Published: 'published' as const,
        Startup: 'startup' as const
    },
    UrlName: {
        Default: 'my-presentation' as const,
        New: 'new-presentation' as const
    },
    Error: {
        LoadErrorNoEditPermission: { errorType: 'load-error-access', message: 'Edit permission is not given.' },
        LoadError: { errorType: 'load-error', message: 'Unable to load, please try again' },
        SaveError: { errorType: 'save-error', message: 'Unable to save, please try again' },
        SaveErrorNoEditor: { errorType: 'save-error-editor-not-present', message: 'editor is not loaded property'}
    },
   
    OutsideAngularEvents: {
        Toggle: 'toggle',
        Menu: 'menu',
        FullScreen: 'fullscreen',
        ChalkboardToggle: 'chalkboardToggle',
        ChalkboardCanvas: 'chalkboardCanvas',
        Refresh: 'refreshViewer'

    },
    DefaultName: 'My presentation' as const 

}

