import axios from "@/plugins/axios";
import PageResult from '@/types/model/VO/PageResult';
import { R } from '@/types/model/VO/R';
import { BasicTree } from '@/types/common/Tree';

export function getList(current = 1, size = 10) {
    return axios.get<R<PageResult<any>>>("/api/group/list", {
        params: {
            current,
            size
        }
    });
}

export function getDetail(id: number) {
    return axios.get<R>("/api/group/detail", {
        params: {
            id
        }
    });
}

export function getTree() {
    return axios.get<R<BasicTree[]>>("/api/group/tree", {
        params: {
            
        }
    });
}