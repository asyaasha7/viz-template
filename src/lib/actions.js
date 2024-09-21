// @ts-nocheck
import { URLS } from "./consts";

export async function postData(path, payload) {
    const response = await fetch(`${URLS.BASE}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        return { errro: true, status: response.status, message: 'Failed to post' };
    }

    const data = await response.json();
    return data;
}

export async function getData(path) {
    const response = await fetch(`${URLS.BASE}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        return { errro: true, status: response.status, message: 'Failed to get' };
    }

    const data = await response.json();
    return data;
}
