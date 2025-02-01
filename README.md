# svelte template

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

Build would output bundle files in public folder

Renders componetns on the dashboard using coordinates and component name.

## Layout Configs

Supports using custom layout configs from http://localhost:5555/api/layout endpoint
Default fallback layout src/lib/config/layoutConfig.js

<b>Params</b>

coordinates { x, y, w, h } - component's x,y positions and  width / height
fixed: boolean - is component draggable 
canRemove: boolean - enables removing component from the dashboard
com: components name - currently supports ListInfoKeyValue, GrafanaDashboard, WebSocketData, PingAgent, WalletConnect
config: 
{
        name: 'component title', // optional
        url: 'https:your-url-to-fetch-data', // optional, falls back to default value
        refreshInterval: dataRefreshInterval // optional number
}
------------------------------------

## Available components

ListInfoKeyValue: fetches data from an endpoint and renders agent info as a key value pair
GrafanaDashboard: provides input for a custom grafana dashboard and renders a dashboard ( or uses dashboard url from layout configs if provided )
WebSocketData: renders websocket data using agent endpoint
PingAgent: input for pinging an agent

----------------------------------
Layout config example 
( x axis devided into 6 columns )
w = width
h = height

```
// example
{
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
        }
]
```
