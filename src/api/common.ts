import { Dictionary } from 'array-proto-ext';

export interface RequestOptions {
    method: "GET" | "POST" | "HEAD";
    url: string;
    headers?: Dictionary<string>;
    params?: Dictionary<any>;
    data?: string;
}

export async function GM_Request<T = any>(xhr: RequestOptions) {
    return new Promise<T>((resolve, reject) => {
        (window as any).$GM_XHR({
            ...xhr,
            onload: (res: XMLHttpRequest) => {
                if (res.status.toString().startsWith("2")) {
                    try {
                        resolve(JSON.parse(res.responseText));
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(res.response);
                }
            },
            onerror: (e: any) => {
                reject(e);
            }
        });
    });
}