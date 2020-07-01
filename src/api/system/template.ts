import axios from "@/plugins/axios";
import PageResult from '@/types/model/VO/PageResult';
import { QueryItem } from '@/types/model/VO/QueryItem';
import { R } from '@/types/model/VO/R';
import { BasicTree } from '@/types/common/Tree';

export function getList(query: QueryItem[] = [], current = 1, size = 10) {
    // return axios.request<R<PageResult<any>>>({
    //     url: "/api/vtb/list",
    //     method: "POST",
    //     params: {
    //         current,
    //         size
    //     },
    //     data: query
    // });
    return Promise.resolve({
        data: {
            success: true,
            data: {
                current: 1,
                total: 2,
                size: 10,
                data: [
                    {
                        id: 1,
                        name: "Row 1"
                    },
                    {
                        id: 2,
                        name: "Row 2"
                    }
                ]
            }
        }
    });
}

export function getDetail(id: number) {
    return axios.get<R>("/api/template/detail", {
        params: {
            id
        }
    });
}

export function update(data: any) {
    return axios.request<R>({
        url: "/api/template/update",
        method: "POST",
        data
    });
}

export function remove(id: number) {
    return axios.post<R>("/api/template/delete", undefined, {
        params: {
            id
        }
    });
}

export function tree() {
    return axios.get<R<BasicTree[]>>("/api/template/tree", {
        params: {
            
        }
    });
}