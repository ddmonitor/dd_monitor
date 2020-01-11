declare module '*.json' {
    // 不考虑根元素不是对象的JSON
    const content: { [key: string]: any };
    export = content; 
}