import {URLS} from '../consts';

export const layoutConfig = {
    data: [
        {
            coordinates: {
                x: 0.1,
                y: 0.1,
                w: 2.9,
                h: 4.3
            },
            com: 'ListInfoKeyValue',
            fixed: true,
            canRemove: false,
            config: {
                name: 'Trader Interface',
                url: URLS.AGENT_INFO
            }
        },
        {
            coordinates: {
                x: 0.1,
                y: 5,
                w: 5.9,
                h: 2
            },
            com: 'WebSocketData',
            fixed: true,
            canRemove: false,
            config: {
                url: 'http://localhost:5556'
            }
        },
        {
            coordinates: {
                x: 3,
                y: 0.1,
                w: 2.9,
                h: 0.5
            },
            com: 'PingAgent',
            fixed: true,
            canRemove: true,
            config: {
                url: URLS.WEBSOCKET
            }
        },
        {
            coordinates: {
                x: 3,
                y: 0.7,
                w: 2.9,
                h: 3.2
            },
            com: 'GrafanaDashboard',
            fixed: true,
            canRemove: false,
            config: {
                url: 'https://snapshots.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4'
            }
        },
        // {
        //     coordinates: {
        //         x: 0,
        //         y: 5,
        //         w: 12,
        //         h: 12
        //     },
        //     com: 'TableTabs',
        //     fixed: true,
        //     canRemove: true
        // }
    ]
};