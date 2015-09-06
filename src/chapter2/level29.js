/**
 * Created by ztc on 2015/8/26.
 */
var Level29 = GameLayer.extend({
	ctor: function () {
		this._super();
		this.init();
	},
	init: function () {
		var line3 = new cc.Sprite(res.line_png);
		var line4 = new cc.Sprite(res.line_png);
		line3.rotation = 90;
		line4.rotation = 90;
		line3.x = this.mapPanel.x + Constant.levelSize[this.level][0]*Constant.CONDUIT_WIDTH/2;
		line3.y = this.mapPanel.y - 30;
		line4.x = this.mapPanel.x + Constant.levelSize[this.level][0]*Constant.CONDUIT_WIDTH/2;
		line4.y = this.mapPanel.y + Constant.levelSize[this.level][1]*Constant.CONDUIT_WIDTH + 30;
		this.addChild(line3,2);
		this.addChild(line4,2);
		line3.opacity = 0;
		line4.opacity = 0;
		line3.runAction(cc.sequence(cc.scaleBy(0.1,1,0.7),cc.fadeIn(1),cc.fadeOut(1),cc.fadeIn(1),cc.fadeOut(1)));
		line4.runAction(cc.sequence(cc.scaleBy(0.1,1,0.7),cc.fadeIn(1),cc.fadeOut(1),cc.fadeIn(1),cc.fadeOut(1)));

	},
	addConduit: function () {
		this.type = [
			[5,0],[2,1],[0,0],[0,0],[1,1],[5,0],
			[0,0],[2,0],[4,0],[3,0],[1,0],[0,0],
			[0,0],[0,0],[6,0],[5,0],[0,0],[0,0],
			[0,0],[1,1],[1,0],[6,0],[0,0],[0,0],
			[0,0],[2,0],[4,0],[6,0],[0,0],[0,0],
			[0,0],[0,0],[6,0],[5,0],[0,0],[0,0],
			[0,0],[3,0],[1,0],[2,0],[4,0],[0,0],
			[5,0],[3,1],[0,0],[0,0],[4,1],[6,0],
			];
		this.initConduit();
		this.randomConduit();
	},

	getTitle: function () {
		return "Level29";
	},
    afterConnect: function () {
        if(this.hasPassed(this.getFixedNode()))
        { this.onCondition();
           DCAgent.onEvent('PASSED',1,{
                    time: 30,//耗时30秒
                    level: 'Level 29'
                })}
    },
	onEliminate: function () {
		this.eliminateOther();
	},
	getLevel: function () {
		return 29;
	}
});

