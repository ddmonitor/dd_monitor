import { Vue, Component, Prop, PropSync, Ref, Watch } from "vue-property-decorator";
import { Dictionary } from 'array-proto-ext';
import { ColumnConfig } from './DTable';

@Component
export default class DCardList<T extends {} = Dictionary<any>> extends Vue { 

}