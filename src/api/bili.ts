import PageResult from '@/types/model/VO/PageResult';
import { R } from '@/types/model/VO/R';
import { ComponentMessageEvent, ScriptMessageEvent, MessageData } from '@/types/message/message';
import { Dictionary } from 'array-proto-ext';

export interface RequestOptions {
    method: "GET" | "POST" | "HEAD";
    url: string;
    headers?: Dictionary<string>;
    params?: Dictionary<any>;
    data?: string;
}
export interface BiliResponse<T = any> {
    code: number;
    message: string;
    data: T;
    ttl: number;
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

async function biliApi(options: RequestOptions) {
    (options.headers || (options.headers = {}))["Referer"] = "https://www.bilibili.com";

    if (options.params) {
        
        options.url += !options.url.includes("?") ? "?" : "&";
        options.url += options.params
            .mapItem((v, k) => `${k}=${v}`)
            .join("&");
        delete options.params;
    }

    const data = await GM_Request<BiliResponse>(options);
    console.log(data);
    return data;
}


export function getUserInfo(mid: number) {
    return biliApi({
        method: "GET",
        url: `https://api.bilibili.com/x/space/acc/info`,
        params: {
            mid
        }
    });
}

export function getLiveInfo(mid: number) {
    return biliApi({
        method: "GET",
        url: `https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld`,
        params: {
            mid
        }
    });
}

export function checkLoginState() {
    return biliApi({
        method: "GET",
        url: `https://api.bilibili.com/x/web-interface/nav`
    });
}

export function followList(current = 1, size = 20) {
    return biliApi({
        method: "GET",
        url: `https://api.live.bilibili.com/xlive/web-ucenter/user/following`,
        params: {
            page: current,
            page_size: size
        }
    });
}
