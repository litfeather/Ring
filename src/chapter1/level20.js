/**
 * Created by tangr on 2015/8/21.
 */
var Level20 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;

    },
    addConduit: function () {
        this.type=[
                   [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[3,0],[2,1],
                   [0,0],[0,0],[2,0],[4,0],[0,0],[2,0],[1,0],[6,0],
                   [0,0],[0,0],[6,0],[5,0],[1,1],[4,0],[2,0],[4,0],
                   [2,0],[5,0],[3,1],[1,0],[3,0],[0,0],[5,1],[0,0],
                   [2,0],[5,0],[2,1],[3,0],[2,0],[0,0],[6,0],[0,0],
                   [0,0],[0,0],[5,0],[6,0],[4,1],[1,0],[1,0],[2,0],
                   [0,0],[0,0],[2,0],[1,0],[0,0],[2,0],[3,0],[6,0],
                   [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2,0],[3,1],];
        this.initConduit();
        this.randomConduit();
    },
    getBg: function () {
        return new cc.Sprite("res/bg.png");
    },

    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
        { this.onCondition();
           DCAgent.onEvent('PASSED',1,{
                    time: 30,//耗时30秒
                    level: 'Level 20'
                })}
    },
    onEliminate: function () {
        this.eliminateOther();
    },
    getLevel: function () {
        return 20;
    }
});