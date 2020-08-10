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
                        routes: [
                            { 
                                path: '/logistics/routes', 
                                redirect: '/logistics/routes/routes',
                            },
                            {
                                path: '/logistics/routes/routes',
                                name: 'Routes'
                            },
                            {
                                path: '/logistics/routes/leg-costs',
                                name: 'Leg Costs'
                            },
                            {
                                path: '/logistics/routes/location-costs',
                                name: 'Location Costs'
                            }
                        ]
                    },
                    {
                        path: '/logistics/storage-units',
                        name: 'Storage Units',
                    },
                    {
                        path: '/logistics/distance-units',
                        name: 'Distance Units',
                    },
                    {
                        path: '/logistics/transfer-type',
                        name: 'Transfer Type',
                    },
                    {
                        path: '/logistics/location-cost-type',
                        name: 'Location Cost Type',
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
                        name: 'Macro Regions'
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
                        name: 'Currency'
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
                        redirect: '/products/product-group',
                    },
                    {
                        path: '/products/product-group',
                        name: 'Product Group'
                    },
                    {
                        path: '/products/products',
                        name: 'Products'
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