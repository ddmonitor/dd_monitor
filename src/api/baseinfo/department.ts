import axios from "@/plugins/axios";
import PageResult from '@/types/model/VO/PageResult';
import { QueryItem } from '@/types/model/VO/QueryItem';
import { R } from '@/types/model/VO/R';
import { BasicTree, TreeItem } from '@/types/common/Tree';

export function getList(query: QueryItem[] = [], current = 1, size = 10) {
    return axios.request<R<PageResult<any>>>({
        url: "/api/baseinfo/department/list",
        method: "POST",
        params: {
            current,
            size
        },
        data: query
    });
}

export function getDetail(id: number) {
    return axios.get<R>("/api/baseinfo/department/detail", {
        params: {
            id
        }
    });
}

export function update(data: any) {
    return axios.request<R>({
        url: "/api/baseinfo/department/submit",
        method: "POST",
        data
    });
}

export function remove(ids: number[]) {
    return axios.post<R>("/api/baseinfo/department/delete", ids, {
        params: {
            
        }
    });
}

export function tree() {
    return axios.get<R<TreeItem<string>[]>>("/api/baseinfo/department/tree", {
        params: {
            
        }
    });
}