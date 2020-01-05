declare module '*.json' {
    const content: { [key: string]: any };
    export = content; 
}