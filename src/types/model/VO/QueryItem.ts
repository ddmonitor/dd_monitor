export type QueryCondition = 
    "eq" | "ne" | "gt" | "lt" | "ge" | "le" |
    "like" | "in" ;

export interface QueryItem {
    property: string;
    condition: QueryCondition;
    value: any;
}