import lang from '../language/lang'
let config = {
    refreshpull:{
        get top_config(){
            let pullcfg=lang.get().pullcfg;
            return {
                pullText: pullcfg.pull_refresh, // 下拉时显示的文字
                triggerText: pullcfg.release_update, // 下拉到触发距离时显示的文字
                loadingText: pullcfg.loading, // 加载中的文字
                doneText: pullcfg.load_finish, // 加载完成的文字
                failText: pullcfg.load_failed, // 加载失败的文字
                loadedStayTime: 400, // 加载完后停留的时间ms
                stayDistance: 50, // 触发刷新后停留的距离
                triggerDistance: 70 // 下拉刷新触发的距离
            }
        },
        get bottom_config(){
            let pullcfg=lang.get().pullcfg;
            return {
                pullText: pullcfg.push_load,
                triggerText: pullcfg.release_update,
                loadingText: pullcfg.loading,
                doneText: pullcfg.load_finish,
                failText: pullcfg.load_failed,
                loadedStayTime: 400,
                stayDistance: 50,
                triggerDistance: 70
            }
        }
    }
}
export default config;