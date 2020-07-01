import axios from "@/plugins/axios";
import PageResult from '@/types/model/VO/PageResult';
import { QueryItem } from '@/types/model/VO/QueryItem';
import { R } from '@/types/model/VO/R';
import { Dictionary } from 'array-proto-ext';

export function getList(query: QueryItem[] = [], current = 1, size = 10) {
    return axios.request<R<PageResult<any>>>({
        url: "/api/vtb/list",
        method: "POST",
        params: {
            current,
            size
        },
        data: query
    });
}

export function getDetail(id: number) {
    return axios.get<R>("/api/vtb/detail", {
        params: {
            id
        }
    });
}

export function query(query: Dictionary<any> = {}, current = 1, size = 10) {
    return axios.post<R<PageResult<any>>>("/api/vtb/query", query, {
        params: {
            current,
            size
        },
        
    });
}