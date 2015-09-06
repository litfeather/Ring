/**
 * Created by tangr on 2015/8/21.
 */
var Level18 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;

        //this.tipsLabel = new cc.LabelTTF("16", "Microsoft YaHei UI Light",30);
        //this.tipsLabel.color = cc.color(0,0,0);
        //this.tipsLabel.x = this.size.width/2;
        //this.tipsLabel.y = this.size.height/7;
        //this.addChild(this.tipsLabel, 1);
    },
    addConduit: function () {
        this.type=[[1,0],[6,0],[5,0],[5,0],[6,0],[6,1],[5,0],[5,0],[6,0],[2,0],
                   [4,1],[5,0],[6,0],[6,0],[6,0],[5,0],[6,0],[3,0],[3,0],[4,0],
                   [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[6,0],[5,1],[0,0],
                   [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[5,1],[6,0],[0,0],
                   [1,1],[6,0],[5,0],[6,0],[5,0],[6,0],[5,0],[3,0],[4,0],[1,0],
                   [1,0],[5,0],[6,0],[6,0],[6,1],[5,0],[6,0],[5,0],[5,0],[3,0]];
        this.initConduit();
        this.randomConduit();
    },

    getTitle: function () {
        return "Level18";
    },
    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
        { this.onCondition();
           DCAgent.onEvent('PASSED',1,{
                    time: 30,//耗时30秒
                    level: 'Level 18'
                })}
    },
    onEliminate: function () {
        this.eliminateOther();
    },
    getLevel: function () {
        return 18;
    }
});