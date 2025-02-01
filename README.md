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

Renders components on the dashboard using coordinates configs and mapping 'com' name to a component.

## Layout 

Supports using custom layout configs from http://localhost:5555/api/layout endpoint response <br/>
Otherwise would use default fallback layout defined in src/lib/config/layoutConfig.js

------------------------------------

## Configuration Properties

| Property       | Type           | Description |
|---------------|---------------|-------------|
| `coordinates` | `{ x, y, w, h }` | Defines the **position** (`x`, `y`) and **size** (`w` = width, `h` = height) of the component. |
| `fixed`       | `boolean`       | Determines if the component is **draggable** (`true` = fixed, `false` = movable). |
| `canRemove`   | `boolean`       | Allows the component to be **removed** from the dashboard (`true` = removable, `false` = permanent). |
| `com`         | `string`        | Defines the **component type** (see supported components below). |
| `config`      | `object`        | Optional component's configs. name: string - components title, url: string - url to fetch data ( uses default value if not provided ), refreshInterval: number - interval to refetch data |


---

## Components Descriptions

| Component Name        | Description | Default URL |
|----------------------|-------------|-------------|
| **ListInfoKeyValue** | Fetches data from an endpoint and renders info as a **key-value pair**. | `http://localhost:5555/api/agent-info` |
| **GrafanaDashboard** | Provides input for a **custom Grafana dashboard** and renders it. Uses the **dashboard URL** from layout configs if provided. | n/a |
| **WebSocketData**    | Renders **real-time WebSocket data** using the agent's endpoint. | `ws://localhost:5556` |
| **PingAgent**        | Provides an input field for **pinging an agent**. | `ws://localhost:5556` |




----------------------------------
Layout config example 
( x axis devided into 6 columns )
w = width
h = height

```
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
