import axios from "@/plugins/axios";
import PageResult from '@/types/model/VO/PageResult';
import { QueryItem } from '@/types/model/VO/QueryItem';
import { R } from '@/types/model/VO/R';
import { BasicTree } from '@/types/common/Tree';

export function getList(query: QueryItem[] = [], current = 1, size = 10) {
    return axios.request<R<PageResult<any>>>({
        url: "/api/system/metaobject/list",
        method: "POST",
        params: {
            current,
            size
        },
        data: query
    });
}

export function getDetail(id: number) {
    return axios.get<R>("/api/system/metaobject/detail", {
        params: {
            id
        }
    });
}

export function update(data: any) {
    return axios.request<R>({
        url: "/api/system/metaobject/submit",
        method: "POST",
        data
    });
}

export function remove(ids: number[]) {
    return axios.request<R>({
        url: "/api/system/metaobject/delete",
        method: "POST",
        data: ids
    });
}

export function tree() {
    return axios.get<R<BasicTree[]>>("/api/system/metaobject/tree");
}