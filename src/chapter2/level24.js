/**
 * Created by tangr on 2015/8/21.
 */
var Level24 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {


        this.tipsLabel = new cc.LabelTTF("可穿越闪烁边界连成闭环通关", "Microsoft YaHei UI Light",30);
        this.tipsLabel.color = cc.color(0,0,0);
        this.tipsLabel.x = this.size.width/2;
        this.tipsLabel.y = this.size.height*6/7;
        this.addChild(this.tipsLabel, 1);

        var line1 = new cc.Sprite(res.line_png);
        var line2 = new cc.Sprite(res.line_png);
        line1.x = this.mapPanel.x - 30;
        line1.y = this.mapPanel.y + Constant.levelSize[this.level][1]*Constant.CONDUIT_WIDTH/2;
        line2.x = this.mapPanel.x + Constant.levelSize[this.level][0]*Constant.CONDUIT_WIDTH + 30;
        line2.y = this.mapPanel.y + Constant.levelSize[this.level][1]*Constant.CONDUIT_WIDTH/2;
        this.addChild(line1,2);
        this.addChild(line2,2);
        line1.opacity = 0;
        line2.opacity = 0;
        line1.runAction(cc.sequence(cc.fadeIn(1),cc.fadeOut(1),cc.fadeIn(1),cc.fadeOut(1)));
        line2.runAction(cc.sequence(cc.fadeIn(1),cc.fadeOut(1),cc.fadeIn(1),cc.fadeOut(1)));
    },
    addConduit: function () {
        this.type =[
            [0,0],[5,1],[0,0],[0,0],
            [0,0],[2,0],[4,0],[0,0],
            [0,0],[0,0],[6,0],[0,0],
            [1,0],[6,1],[1,0],[0,0],
            [6,0],[0,0],[0,0],[0,0],
            [4,0],[4,0],[0,0],[0,0],
            [0,0],[6,0],[0,0],[0,0],
            [0,0],[5,1],[0,0],[0,0],
            ];
        this.initConduit();
        this.randomConduit();
    },

    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
        { this.onCondition();
           DCAgent.onEvent('PASSED',1,{
                    time: 30,//耗时30秒
                    level: 'Level 24'
                })}
    },
    onEliminate: function () {
        this.eliminateOther();
        this.tipsLabel.runAction(cc.fadeOut(1));
    },
    getLevel: function () {
        return 24;
    }
});