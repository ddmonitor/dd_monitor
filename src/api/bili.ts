import PageResult from '@/types/model/VO/PageResult';
import { R } from '@/types/model/VO/R';
import { ComponentMessageEvent } from '@/types/message/message';

export function getUserInfo(uid: string) {
    return new Promise<any>((resolve, reject) => {
        const listener = (e: ComponentMessageEvent) => {
            if (e.data.type === "M_GET_BILI_USER") {
                if (typeof e.data.data === "object") {
                    window.removeEventListener("message", listener);
                    resolve(e.data.data);
                    return;
                }
            } else if (e.data.type === "M_ERROR") {
                window.removeEventListener("message", listener);
                reject(e.data.data);
                return;
            }
        };
        window.addEventListener("message", listener);
        postMessage({
            type: "M_GET_BILI_USER",
            data: uid
        }, "*");
    });
}

export function getLiveInfo(uid: string) {
    return new Promise<any>((resolve, reject) => {
        const listener = (e: ComponentMessageEvent) => {
            if (e.data.type === "M_GET_BILI_LIVE") {
                if (typeof e.data.data === "object") {
                    window.removeEventListener("message", listener);
                    resolve(e.data.data);
                    return;
                }
            } else if (e.data.type === "M_ERROR") {
                window.removeEventListener("message", listener);
                reject(e.data.data);
                return;
            }
        };
        window.addEventListener("message", listener);
        postMessage({
            type: "M_GET_BILI_LIVE",
            data: uid
        }, "*");
    });
}
