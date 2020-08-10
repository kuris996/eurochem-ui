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
                        redirect: '/dashboard/analysis'
                    },
                    {
                        path: '/dashboard/analysis',
                        name: 'analysis',
                    },
                    {
                        path: '/dashboard/monitor',
                        name: 'monitor',
                    },
                    {
                        path: '/dashboard/workplace',
                        name: 'workplace',
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
                        redirect: '/list/table-list' 
                    },
                    {
                        path: '/list/table-list',
                        name: 'searchtable',
                    },
                    {
                        path: '/list/basic-list',
                        name: 'basiclist',
                    },
                    {
                        path: '/list/card-list',
                        name: 'cardlist',
                    },
                    {
                        path: '/list/search',
                        name: 'searchlist',
                        routes: [
                            {
                                path: '/list/search',
                                redirect: '/list/search/articles',
                            },
                            {
                                path: '/list/search/articles',
                                name: 'articles',
                            },
                            {
                                path: '/list/search/projects',
                                name: 'projects',
                            },
                            {
                                path: '/list/search/applications',
                                name: 'applications',
                            },
                        ],
                    },
                ],
            },
        ]
    },
]