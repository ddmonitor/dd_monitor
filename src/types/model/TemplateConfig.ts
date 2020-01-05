import { TemplateMode } from './TemplateMode';
import { GridConfig } from './GridConfig';

/**
 * 模板配置基类型
 */
export interface TemplateConfig<T extends TemplateMode> {
    mode: T;
    grids: GridConfig[];
}