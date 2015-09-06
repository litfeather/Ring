/**
 * Created by tangr on 2015/8/21.
 */
var Level25 = GameLayer.extend({
    tipsLabel:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        var line1 = new cc.Sprite(res.line_png);
        var line2 = new cc.Sprite(res.line_png);
        line1.rotation = 90;
        line2.rotation = 90;
        line1.x = this.mapPanel.x + Constant.levelSize[this.level][0]*Constant.CONDUIT_WIDTH/2;
        line1.y = this.mapPanel.y - 30;
        line2.x = this.mapPanel.x + Constant.levelSize[this.level][0]*Constant.CONDUIT_WIDTH/2;
        line2.y = this.mapPanel.y + Constant.levelSize[this.level][1]*Constant.CONDUIT_WIDTH + 30;
        this.addChild(line1,2);
        this.addChild(line2,2);
        line1.opacity = 0;
        line2.opacity = 0;
        line1.runAction(cc.sequence(cc.scaleBy(0.1,1,0.7),cc.fadeIn(1),cc.fadeOut(1),cc.fadeIn(1),cc.fadeOut(1)));
        line2.runAction(cc.sequence(cc.scaleBy(0.1,1,0.7),cc.fadeIn(1),cc.fadeOut(1),cc.fadeIn(1),cc.fadeOut(1)));
    },
    addConduit: function () {
        this.type = [
            [0,0],[0,0],[0,0],[0,0],[3,0],[5,0],[4,0],[0,0],
            [0,0],[3,0],[4,0],[0,0],[5,1],[4,0],[2,0],[1,0],
            [6,1],[1,0],[2,0],[5,0],[1,0],[2,0],[0,0],[4,1],
            [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]
           ];
        this.initConduit();
        this.randomConduit();
    },

    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
        { this.onCondition();
           DCAgent.onEvent('PASSED',1,{
                    time: 30,
                    level: 'Level 25'
                })}
    },
    onEliminate: function () {
        this.eliminateOther();
    },
    getLevel: function () {
        return 25;
    }
});