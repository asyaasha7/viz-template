import {URLS} from '../consts';

export const layoutConfig = {
    data: [
        {
            coordinates: {
                x: 0.1,
                y: 0.1,
                w: 2.9,
                h: 4.6
            },
            com: 'ListInfoKeyValue',
            fixed: true,
            canRemove: false,
            config: {
                name: 'Agent Interface',
                url: URLS.AGENT_INFO,
                refreshInterval: 30000
            }
        },
        {
            coordinates: {
                x: 0.1,
                y: 5,
                w: 5.9,
                h: 6
            },
            com: 'WebSocketData',
            fixed: true,
            canRemove: false,
            config: {
                url: URLS.WEBSOCKET,
                name: 'Agent Logs'
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
            canRemove: false,
            config: {
                url: URLS.WEBSOCKET
            }
        },
        {
            coordinates: {
                x: 3,
                y: 0.7,
                w: 2.9,
                h: 4
            },
            com: 'GrafanaDashboard',
            fixed: true,
            canRemove: false,
            config: {
                url: ''
                // url: 'https://snapshots.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4'
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