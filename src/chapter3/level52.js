/**
 * Created by ztc on 2015/8/31.
 */
var Level52 = GameLayer.extend({
	_ball:[],
	ctor: function () {
		this._super();
		this.init();
	},
	init: function () {
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
			[8,0],[6,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[6,0],[8,0],
			[5,0],[2,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0],[5,0],
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
			[5,0],[4,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0],[5,0],
			[8,0],[6,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[6,0],[8,0]
		];
		this.initConduit();
		this.randomConduit();
	},

	getTitle: function () {
		return "Level52";
	},
	afterConnect: function () {
		var node = {column:3.33,row:6.3};
		this._ball = [this.map[0][0],this.map[0][11],this.map[7][0],this.map[7][11]];
		for(var i=0;i<this._ball.length;i++){
			if(!Utils.inOrOut(this.nodelist,node,this._ball[i]) ){
				break ;
			}
			if(i==this._ball.length - 1){
				this.pushIntoList(this.map[0][0]);
				this.pushIntoList(this.map[0][11]);
				this.pushIntoList(this.map[7][0]);
				this.pushIntoList(this.map[7][11]);
				this.onCondition();
				DCAgent.onEvent('PASSED',1,{
					time: 30,//耗时30秒
					level: 'Level 52'
				});
			}
		}
	},
	onEliminate: function () {
		this.eliminateOther();
	},
	getLevel: function () {
		return 52;
	}
});
