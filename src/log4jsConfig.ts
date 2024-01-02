

import log4js from "log4js";

log4js.configure({
    appenders: {
        cheese: {
            type: 'dateFile',
            filename: 'log.log',
            encoding: 'utf-8',
            // 配置 layout，此处使用自定义模式 pattern
            layout: {
                type: "coloured",
                // type: "pattern"
                // 配置模式
                // pattern:"[date:%d] [level:%p] [category:%c] [host:%h] [pid:%z] [data:%m]"
            },
            pattern: "-yyyy-MM-dd",
            keepFileExt: true,
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['cheese'], level: "trace" }
    }
})

// var logger = log4js.getLogger();
// logger.info("Time:", new Date());
//
// console.log("done");

export let _log4js = log4js
