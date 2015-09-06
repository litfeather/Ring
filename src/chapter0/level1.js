/**
 * Created by tangr on 2015/8/21.
 */
var Level1 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.udlrConnected = false;

        this.tipsLabel = new cc.LabelTTF("试着连成一个闭环", "Microsoft YaHei UI Light",30);
        this.tipsLabel.color = cc.color(0,0,0);
        this.tipsLabel.x = this.size.width/2;
        this.tipsLabel.y = this.size.height*6/7;
        this.addChild(this.tipsLabel, 1);
    },
    addConduit: function () {
        this.type = [[3,0],[4,0],
                     [2,0],[1,0]];
        this.initConduit();
    },
    afterConnect: function () {
        this.onCondition();
        DCAgent.onEvent('PASSED',1,{
        			time: 30,//耗时30秒
        			level: 'Level 1'
        		});
    },
    onEliminate: function () {
        this.eliminateOther();
        this.tipsLabel.setString("点击进入下一关");
    },
//    getBg: function () {
//        return new cc.Sprite("res/bg.png");
//    },
    getTitle: function () {
        return "Level1";
    },
    getLevel: function () {
        return 1;
    }
});