/**
 * Created by wxg on 2015/8/26.
 */
var Level9 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;

    },
    addConduit: function () {
        this.type =  [[0,0],[0,0],[1,1],[3,0],[0,0],[0,0],
                     [0,0],[0,0],[5,0],[6,0],[0,0],[0,0],
                     [4,0],[5,0],[4,0],[2,0],[6,0],[2,1],
                     [4,1],[6,0],[1,0],[2,0],[5,0],[3,0],
                     [0,0],[0,0],[5,0],[6,0],[0,0],[0,0],
                     [0,0],[0,0],[3,0],[3,1],[0,0],[0,0]];
        this.initConduit();
        this.randomConduit();
    },

    getTitle: function () {
        return "Level9";
    },
    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
          { this.onCondition();
               DCAgent.onEvent('PASSED',1,{
                      time: 30,//耗时30秒
                      level: 'Level 9'
                  })}
    },
    onEliminate: function () {
        this.eliminateOther();

    },
    getLevel: function () {
        return 9;
    }
});