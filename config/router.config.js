export default [    
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/dashboard' },
            {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'dashboard',
                routes: [
                    { 
                        path: '/dashboard', 
                        redirect: '/dashboard/analysis',
                        icon: 'dashboard',
                    },
                    {
                        path: '/dashboard/analysis',
                        name: 'analysis',
                        icon: 'dashboard',
                    },
                    {
                        path: '/dashboard/monitor',
                        name: 'monitor',
                        icon: 'dashboard',
                    },
                    {
                        path: '/dashboard/workplace',
                        name: 'workplace',
                        icon: 'dashboard',
                    },
                ],
            },
            {
                path: '/profile',
                name: 'profile',
                icon: 'profile',
            },
            {
                path: '/list',
                icon: 'table',
                name: 'list',
                routes: [
                    { 
                        path: '/list', 
                        redirect: '/list/table-list',
                        icon: 'dashboard',
                    },
                    {
                        path: '/list/table-list',
                        name: 'searchtable',
                        icon: 'dashboard',
                    },
                    {
                        path: '/list/basic-list',
                        name: 'basiclist',
                        icon: 'dashboard',
                    },
                    {
                        path: '/list/card-list',
                        name: 'cardlist',
                        icon: 'dashboard',
                    },
                    {
                        path: '/list/search',
                        name: 'searchlist',
                        icon: 'dashboard',
                        routes: [
                            {
                                path: '/list/search',
                                redirect: '/list/search/articles',
                                icon: 'dashboard',
                            },
                            {
                                path: '/list/search/articles',
                                name: 'articles',
                                icon: 'dashboard',
                            },
                            {
                                path: '/list/search/projects',
                                name: 'projects',
                                icon: 'dashboard',
                            },
                            {
                                path: '/list/search/applications',
                                name: 'applications',
                                icon: 'dashboard',
                            },
                        ],
                    },
                ],
            },
        ]
    },
]