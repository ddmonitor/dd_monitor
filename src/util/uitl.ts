import i18n from "@/plugins/i18n";

export function getText(textOrI18n: string) {
    if (textOrI18n.startsWith("i#")) {
        return i18n.t(textOrI18n.replace("i#", ""))
    } else {
        return textOrI18n;
    }
}