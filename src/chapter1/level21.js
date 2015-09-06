/**
 * Created by tangr on 2015/8/21.
 */
var Level21 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;
    },
    addConduit: function () {
        this.type = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
                     [4,0],[5,0],[6,1],[5,0],[6,0],[6,0],[5,0],[6,1],[6,0],[2,0],
                     [4,1],[2,0],[3,0],[1,0],[1,1],[2,1],[3,0],[1,0],[2,0],[3,1],
                     [0,0],[5,0],[5,0],[6,0],[6,0],[5,0],[5,0],[6,0],[5,0],[0,0],
                     [0,0],[5,0],[6,0],[5,0],[5,0],[6,0],[5,0],[6,0],[5,0],[0,0],
                     [0,0],[5,0],[6,0],[5,0],[6,0],[5,0],[5,0],[6,0],[5,0],[0,0],
                     [0,0],[4,0],[3,1],[1,0],[3,0],[2,0],[3,0],[4,1],[4,0],[0,0],
                     [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
        this.initConduit();
        this.randomConduit();
    },

    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
        { this.onCondition();
           DCAgent.onEvent('PASSED',1,{
                    time: 30,//耗时30秒
                    level: 'Level 21'
                })}
    },
    onEliminate: function () {
        this.eliminateOther();
    },
    getLevel: function () {
        return 21;
    }
});