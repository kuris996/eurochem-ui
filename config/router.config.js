export default [    
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/logistics' },
            {
                path: '/logistics',
                name: 'Logistics',
                icon: 'compass',
                routes: [
                    { 
                        path: '/logistics', 
                        redirect: '/logistics/routes',
                    },
                    {
                        path: '/logistics/routes',
                        name: 'Routes',
                        icon: 'branches',
                        routes: [
                            { 
                                path: '/logistics/routes', 
                                redirect: '/logistics/routes/routes',
                            },
                            {
                                path: '/logistics/routes/routes',
                                name: 'Routes',
                                icon: 'edit',
                            },
                            {
                                path: '/logistics/routes/leg-costs',
                                name: 'Leg Costs',
                                icon: 'edit',
                            },
                            {
                                path: '/logistics/routes/location-costs',
                                name: 'Location Costs',
                                icon: 'edit',
                            }
                        ]
                    },
                    {
                        path: '/logistics/storage-units',
                        name: 'Storage Units',
                        icon: 'database',
                        component: './Logistics/StorageUnits'
                    },
                    {
                        path: '/logistics/distance-units',
                        name: 'Distance Units',
                        icon: 'compass',
                        component: './Logistics/DistanceUnits'
                    },
                    {
                        path: '/logistics/transfer-type',
                        name: 'Transfer Type',
                        icon: 'wifi',
                        component: './Logistics/TransferType'
                    },
                    {
                        path: '/logistics/location-cost-type',
                        name: 'Location Cost Type',
                        icon: 'moneyCollect'
                    }
                ],
            },
            {
                path: '/geography',
                name: 'Geography',
                icon: 'global',
                routes: [
                    { 
                        path: '/geography', 
                        redirect: '/geography/macro-regions',
                    },
                    {
                        path: '/geography/macro-regions',
                        name: 'Macro Regions',
                        component: './Geography/MacroRegions'
                    },
                    {
                        path: '/geography/sub-regions',
                        name: 'Sub Regions'
                    },
                    {
                        path: '/geography/area',
                        name: 'Area'
                    },
                    {
                        path: '/geography/weather',
                        name: 'Weather'
                    },
                ]
            },
            {
                path: '/indicative-prices',
                name: 'Indicative Prices',
                icon: 'gold'
            },
            {
                path: '/currencies',
                name: 'Currencies',
                icon: 'dollar',
                routes: [
                    { 
                        path: '/currencies', 
                        redirect: '/currencies/currency',
                    },
                    {
                        path: '/currencies/currency',
                        name: 'Currency',
                        component: './Currencies/Currencies'
                    },
                    {
                        path: '/currencies/currency-rates',
                        name: 'Currency Rates'
                    },
                ]
            },
            {
                path: '/products',
                name: 'Products',
                icon: 'appstore',
                routes: [
                    { 
                        path: '/products', 
                        redirect: '/products/product-groups',
                    },
                    {
                        path: '/products/product-groups',
                        name: 'Product Groups',
                        component: './Products/ProductGroups'
                    },
                    {
                        path: '/products/products',
                        name: 'Products',
                        component: './Products/Products'
                    },
                ]
            },
            {
                path: '/demand',
                name: 'Demand',
                icon: 'credit-card'
            },
            {
                path: '/infrastructure',
                name: 'Infrastructure',
                icon: 'bank'
            },
            {
                path: '/map',
                name: 'Map',
                icon: 'environment'
            }
        ]
    },
]