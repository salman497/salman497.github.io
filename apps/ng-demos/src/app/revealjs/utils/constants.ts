

export const Constant = {
    StartupRoute: ':userType' as const,
    Route: ':userType/:mode/:identifier/:name' as const,
    URLParam: {
        Type: 'userType' as const,
        Mode: 'mode' as const,
        Id: 'identifier' as const,
        Name: 'name' as const
    },

    URLParamMode: {
        Edit: 'edit' as const,
        View: 'view' as const
    },
    URLParamType: {
        Guest: 'guest' as const,
        User: 'user' as const,
        Startup: 'startup' as const
    }

}

