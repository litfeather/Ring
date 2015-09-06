/**
 * Created by tangr on 2015/8/21.
 */
var Level2 = GameLayer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;

    },
    addConduit: function () {
        this.type = [[3,0],[5,0],[4,0],
                     [2,0],[5,0],[1,0]];
        this.initConduit();
    },

    getTitle: function () {
        return "Level2";
    },
    afterConnect: function () {
        this.onCondition();
        DCAgent.onEvent('PASSED',1,{
                			time: 30,//耗时30秒
                			level: 'Level 2'
                		});
    },
    onEliminate: function () {
        this.eliminateOther();

    },
    getLevel: function () {
        return 2;
    }
});