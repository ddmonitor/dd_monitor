import { $log, ctx } from '../index';

async function request<T = any>(xhr: Partial<XhrOptions>) {
    return new Promise<T>((resolve, reject) => {

        if (!xhr.headers) {
            xhr.headers = {};
        }
        xhr.headers["Referer"] = "https://www.bilibili.com";
        GM_xmlhttpRequest({
            ...xhr,
            onload: res => {
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
            onerror: e => {
                reject(e);
            }
        });
    });
}

async function getUserInfo(uid: string) {
    const data = await request({
        method: "GET",
        url: `https://api.bilibili.com/x/space/acc/info?mid=${uid}`
    });
    console.log(data);
    return data;

}

async function getLiveInfo(uid: string) {
    const data = await request({
        method: "GET",
        url: `https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld?mid=${uid}`
    });
    console.log(data);
    return data;
}


export default {
    test: /(localhost:8080\/#\/|ddmonitor\.github\.io)/,
    mode: "top",
    inject() {
        self.addEventListener("message",  e => {
            onMessage(e);
        });
    }
}

async function onMessage(e: MessageEvent) {
    try {
        if (e.data.type === "M_GET_BILI_USER") {
            if (typeof e.data.data !== "object") {
                postMessage({
                    type: "M_GET_BILI_USER",
                    source: ctx.name,
                    data: await getUserInfo(e.data.data)
                }, e.origin);
            }
            
        } else if (e.data.type === "M_GET_BILI_LIVE") {
            if (typeof e.data.data !== "object") {
                postMessage({
                    type: "M_GET_BILI_LIVE",
                    source: ctx.name,
                    data: await getLiveInfo(e.data.data)
                }, e.origin);
            }
        }
    } catch (error) {
        console.error(error)
        postMessage({
            type: "M_ERROR",
            source: ctx.name,
            data: error ? (error.message || error) : "Unknow error"
        }, e.origin);
    }
}