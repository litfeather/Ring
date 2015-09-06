/**
 * Created by tangr on 2015/8/21.
 */
var Level3 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;
        this.tipsLabel = new cc.LabelTTF("必须连接所有红色节点才能过关", "Microsoft YaHei UI Light",30);
        this.tipsLabel.color = cc.color(0,0,0);
        this.tipsLabel.x = this.size.width/2;
        this.tipsLabel.y = this.size.height*6/7;
        this.addChild(this.tipsLabel, 1);


    },
    addConduit: function () {
        this.type = [[1,1],[6,0],[5,0],[2,1],
                     [5,0],[0,0],[0,0],[6,0],
                     [6,0],[0,0],[0,0],[6,0],
                     [4,1],[5,0],[6,0],[3,1]];
        this.initConduit();
        this.randomConduit();
    },

    getTitle: function () {
        return "Level3";
    },
    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
           { this.onCondition();
            DCAgent.onEvent('PASSED',1,{
                time: 30,
                level: 'Level 3'
            });
            }
    },
    onEliminate: function () {
        this.eliminateOther();
    },
    getLevel: function () {
        return 3;
    }
});