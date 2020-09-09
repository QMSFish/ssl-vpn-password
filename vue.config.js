// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    // devServer: {
    //     proxy: { // 配置跨域
    //         '/': {
    //             target: 'http://47.106.120.90:8080/nsttweb/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
    //             ws: false,

    //             changOrigin: true, // 允许跨域
    //             pathRewrite: {
    //                 '^/': '' // 请求的时候使用这个api就可以
    //             }
    //         }
    //     }
    // },
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        },
        // devServer: {
        //     proxy: { // 配置跨域
        //         '/': {
        //             target: 'http://192.168.0.103:8080/SSLVPN/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        //             ws: false,
        //             changOrigin: true, // 允许跨域
        //             pathRewrite: {
        //                 '^/': '' // 请求的时候使用这个api就可以
        //             }
        //         }
        //     }
        // }
    },
}