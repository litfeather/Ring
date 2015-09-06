/**
 * Created by wxg on 2015/8/26.
 */
var Level5 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;


    },

    addConduit: function () {
        this.type = [[0,0],[2,0],[6,1],[4,0],[0,0],
                    [0,0],[2,0],[4,0],[6,0],[0,0],
                    [0,0],[2,0],[3,1],[6,0],[0,0],
                    [0,0],[1,0],[5,0],[2,0],[0,0]];
        this.initConduit();
        this.randomConduit();
    },

    getTitle: function () {
        return "Level5";
    },
    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
          { this.onCondition();
                       DCAgent.onEvent('PASSED',1,{
                              time: 30,//耗时30秒
                              level: 'Level 5'
                          })}
    },
    onEliminate: function () {
        this.eliminateOther();

    },
    getLevel: function () {
        return 5;
    }
});