import { Command } from "@/types/command/Command";
import { Dictionary } from 'array-proto-ext';
import { QueryItem } from '@/types/model/VO/QueryItem';

export const AddCommand: Command<Dictionary<any>> = {
    name: "crud.add",
    text: "actions.crud.add",
    icon: "fa fa-plus"
};
export const EditCommand: Command<Dictionary<any>> = {
    name: "crud.edit",
    text: "actions.crud.edit",
    icon: "fas fa-edit"
};
export const DeleteCommand: Command<number | number[]> = {
    name: "crud.delete",
    text: "actions.crud.delete",
    icon: "fa fa-trash"
};
export const ViewCommand: Command<Dictionary<any>> = {
    name: "crud.view",
    text: "actions.crud.view",
    icon: "fa fa-eye"
};
export const SearchCommand: Command<QueryItem[]> = {
    name: "crud.search",
    text: "actions.crud.search",
    icon: "fa fa-search"
};