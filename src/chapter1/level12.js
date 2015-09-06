/**
 * Created by tangr on 2015/8/21.
 */
var Level12 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;

    },
    addConduit: function () {
        this.type =[
            [3,0],[5,0],[3,0],[4,0],[6,1],[1,0],
            [6,0],[0,0],[1,0],[2,0],[0,0],[6,0],
            [2,0],[2,1],[0,0],[0,0],[3,0],[2,0],
            [3,0],[1,0],[0,0],[0,0],[4,1],[4,0],
            [5,0],[0,0],[3,0],[3,0],[0,0],[6,0],
            [1,0],[6,1],[2,0],[1,0],[5,0],[2,0]
        ];
        this.initConduit();
        this.randomConduit();
    },

    getTitle: function () {
        return "Level12";
    },
    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
        { this.onCondition();
           DCAgent.onEvent('PASSED',1,{
                    time: 30,//耗时30秒
                    level: 'Level 12'
                })}
    },
    onEliminate: function () {
        this.eliminateOther();

    },
    getLevel: function () {
        return 12;
    }
});