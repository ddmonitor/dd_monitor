import axios from "@/plugins/axios";
import PageResult from '@/types/model/VO/PageResult';
import { QueryItem } from '@/types/model/VO/QueryItem';
import { R } from '@/types/model/VO/R';

export function getList(query: QueryItem[] = [], current = 1, size = 10) {
    return axios.request<R<PageResult<any>>>({
        url: "/api/system/metaref/list",
        method: "POST",
        params: {
            current,
            size
        },
        data: query
    });
}

export function getDetail(id: number) {
    return axios.get<R>("/api/system/metaref/detail", {
        params: {
            id
        }
    });
}

export function update(data: any) {
    return axios.request<R>({
        url: "/api/system/metaref/submit",
        method: "POST",
        data
    });
}

export function remove(ids: number[]) {
    return axios.request<R>({
        url: "/api/system/metaref/delete",
        method: "POST",
        data: ids
    });
}

export function getRefList(refKey: string, current = 1, size = 100) {
    return axios.request<R<PageResult<any>>>({
        url: "/api/system/metaref/reference/" + refKey,
        method: "POST",
        params: {
            current,
            size
        }
    });
}
