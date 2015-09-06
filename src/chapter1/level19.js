/**
 * Created by tangr on 2015/8/21.
 */
var Level19 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;

    },
    addConduit: function () {
        this.type=[[0,0],[0,0],[3,0],[4,0],[0,0],[0,0],[0,0],[0,0],
                   [0,0],[3,0],[2,0],[4,1],[1,0],[0,0],[0,0],[0,0],
                   [0,0],[3,0],[1,0],[0,0],[2,0],[2,1],[0,0],[0,0],
                   [0,0],[3,0],[3,1],[0,0],[0,0],[2,0],[3,0],[0,0],
                   [0,0],[1,0],[2,1],[0,0],[0,0],[1,1],[1,0],[0,0],
                   [0,0],[2,0],[3,0],[0,0],[1,0],[4,0],[0,0],[0,0],
                   [0,0],[2,0],[2,0],[2,0],[3,1],[0,0],[0,0],[0,0],
                   [0,0],[0,0],[1,0],[2,0],[0,0],[0,0],[0,0],[0,0],];
        this.initConduit();
        this.randomConduit();
    },

    getTitle: function () {
        return "Level19";
    },
    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
        { this.onCondition();
           DCAgent.onEvent('PASSED',1,{
                    time: 30,//耗时30秒
                    level: 'Level 19'
                })}
    },
    onEliminate: function () {
        this.eliminateOther();
    },
    getLevel: function () {
        return 19;
    }
});