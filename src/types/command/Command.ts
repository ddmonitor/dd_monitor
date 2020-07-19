import { Dictionary } from 'array-proto-ext';
import { CreateElement, VNode } from 'vue';

export interface Command<T = any> {
    name: string;
    param?: T;
    icon?: string;
    text?: string;
    tooltip?: string | ((h: CreateElement, bind: UICommandBinding) => VNode);
}

export interface CommandExecutor<T extends Command<U>, U = any> {
    execute(command: T, param?: U): void;
}

export interface CommandBinding<T extends Command = Command> {
    command: Command;
    executable: boolean;
    executor?: CommandExecutor<T>;
}

export type ComponentType = "button" | "toggle" | "custom";

export interface UICommandBinding<T extends Command = Command> 
    extends CommandBinding<T> {
        type: ComponentType;
        size?: "small" | "medium" | "mini";
        sort?: number;
        
}

export interface CommandHost {
    readonly bindings: {
        [name: string]: CommandBinding<Command>;
    };
    // CommandHost还会引发一个事件command，参数为Command对象
}