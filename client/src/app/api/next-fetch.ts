interface FetchAttr {
    service: Service;
    route: string;
    method?: "get" | "post";
    headersMap?: any;
    body?: any;
}

type Service = 'auth' | 'programs' | 'exercises';

const servicePortsMap: Record<Service, number> = {
    'auth': 4000,
    'programs': 4001,
    'exercises': 4002
}

servicePortsMap['auth']

export default async ({service, route, method = "get", headersMap, body}: FetchAttr) => {
    if(typeof window === 'undefined') {
        //server
        const { headers } = require('next/headers');
        const headersList = headers();
        const serverUrl = `http://${service}:${servicePortsMap[service]}${route}`;
        const serverHeaders = {
            "Content-Type": "application/json",
            ...headersMap,
        };

        console.log('url ', serverUrl)
        const request = fetch(serverUrl, { method, headers: serverHeaders, body: JSON.stringify(body) });
        return request;
    } else {
        //client
        console.log('from front end... ', route)
        return fetch(route, { method, headers: headersMap, body: JSON.stringify(body) });
    }
}