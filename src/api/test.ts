import axios from "@/plugins/axios";
import Mock from "mockjs";

if (process.env.VUE_APP_MOCK == "true") {
    debugger;
    Mock.mock(/\/test/, "get", {
        code: 200,
        msg: "ok",
        success: true,
        data: {
            "name|1": [
                "mea", "aqua", "马自立"
            ]
        }
    });
}

export function test() {
    return axios.get("/api/test");
}