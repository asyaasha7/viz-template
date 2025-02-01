export const PATH = {
    RFQ: '/api/rfq',
    ACCEPT: 'accept'
}

export const URL_BASE = 'http://localhost:5000';
export const URL_BASE_TWO = 'http://localhost:5555';
export const URL_PREFIX = 'api';

export const URLS = {
    BASE: URL_BASE,
    LAYOUT: `${URL_BASE}/${URL_PREFIX}/layout`, // endpoint to fetch layort configs
    AGENT_INFO: `${URL_BASE_TWO}/${URL_PREFIX}/agent-info`, // endpoint to fetch agent stats
    WEBSOCKET: 'ws://localhost:5556'
}

export const QUOTE = {
    amount_out: null,
    ask_token_id: null,
    bid_token_id: null,
    chain_id: null,
    seller_wallet_address: null,
}

export const CREATE_RFQ_PAYLOAD = {
    amount_in: null,
    token_id: null,
    chain_id: null,
    wallet_address: null,
}