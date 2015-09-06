/**
 * Created by wxg on 2015/8/26.
 */
var Level6 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;

    },

    addConduit: function () {
        this.type = [[3,0],[2,0],[3,0],[2,0],[0,0],
                    [6,0],[2,0],[3,1],[6,0],[0,0],
                    [5,1],[2,0],[3,0],[6,0],[0,0],
                    [4,0],[2,0],[1,0],[1,0],[0,0],
                    [0,0],[0,0],[0,0],[0,0],[0,0]];

        this.initConduit();
        this.randomConduit();
    },

    getTitle: function () {
        return "Level6";
    },
    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
          { this.onCondition();
                       DCAgent.onEvent('PASSED',1,{
                              time: 30,//耗时30秒
                              level: 'Level 6'
                          })}
    },
    onEliminate: function () {
        this.eliminateOther();
;
    },
    getLevel: function () {
        return 6;
    }
});