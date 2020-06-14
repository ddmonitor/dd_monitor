import axios from "@/plugins/axios";
import PageResult from '@/types/model/VO/PageResult';
import { R } from '@/types/model/VO/R';
import { Dictionary } from 'array-proto-ext';

export function getList(current = 1, size = 10) {
    return axios.get<R<PageResult<any>>>("/api/vtb/list", {
        params: {
            current,
            size
        }
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