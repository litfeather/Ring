/**
 * Created by Kenko on 2014/9/14.
 */

var Constant = {
    CONDUIT_WIDTH: 72,
    WIDTH_SIZE: 8,
    HEIGHT_SIZE: 10,
    totalLevel:58,//总关卡
    levelSize:[[0,0],[2,2],[2,3],[4,4],[4,4],[4,5],[5,5],[6,4],[6,5],[6,6],[6,6],//每一关行高，[0,0]是第0关，忽略
                [6,6],[6,6],[6,6],[6,7],[6,7],[8,8],[8,8],[6,10],[8,8],[8,8],//11-20
                [8,10],[8,8],[8,10],[8,4],[4,8],[8,8],[8,8],[8,5],[8,6],[8,4],//21-30
                [8,12],[8,8],[8,12],[8,12],[8,12],[8,12],[8,12],[8,12],[8,12],[8,12],//31-40
                [8,12],[8,12],[3,3],[6,6],[8,7],[6,10],[8,12],[8,7],[8,8],[8,11],//41-50
                [8,12],[8,12],[8,12],[8,12],[8,7],[8,12],[8,12],[8,12]]
};


var lastLevel = cc.sys.localStorage.getItem("lastlevel")?cc.sys.localStorage.getItem("lastlevel"):1;
var curLevel = cc.sys.localStorage.getItem("curlevel")?cc.sys.localStorage.getItem("curlevel"):1;

var lastScene = false;
