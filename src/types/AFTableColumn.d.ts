declare module "af-table-column" {
    import Vue, { PluginFunction } from "vue";

    const AFTableColumn: Vue & {
        install: PluginFunction<any>;
        [key: string]: any
    };
    export default AFTableColumn;

}