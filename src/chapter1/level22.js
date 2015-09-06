/**
 * Created by tangr on 2015/8/21.
 */
var Level22 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;
    },
    addConduit: function () {
        this.type = [[1,1],[5,0],[6,0],[6,0],[5,0],[5,0],[6,0],[3,0],
                     [6,0],[0,0],[0,0],[0,0],[3,0],[1,0],[0,0],[5,0],
                     [5,0],[2,0],[2,0],[4,0],[2,0],[5,1],[0,0],[6,0],
                     [4,1],[1,0],[4,0],[4,0],[0,0],[6,0],[3,0],[2,0],
                     [2,0],[2,1],[3,0],[1,0],[0,0],[5,0],[3,0],[2,0],
                     [6,0],[4,0],[3,0],[4,0],[1,0],[5,1],[0,0],[5,0],
                     [5,0],[0,0],[0,0],[0,0],[4,0],[4,0],[0,0],[6,0],
                     [4,1],[6,0],[5,0],[6,0],[5,0],[5,0],[6,1],[3,0]];
        this.initConduit();
        this.randomConduit();
    },

    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
        { this.onCondition();
           DCAgent.onEvent('PASSED',1,{
                    time: 30,//耗时30秒
                    level: 'Level 22'
                })}
    },
    onEliminate: function () {
        this.eliminateOther();
    },
    getLevel: function () {
        return 22;
    }
});