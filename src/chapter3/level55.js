/**
 * Created by ztc on 2015/8/31.
 */
var Level55 = GameLayer.extend({
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

	},
	addConduit: function () {
		this.type = [
			[0,0],[1,0],[2,1],[0,0],[1,1],[1,0],[0,0],[0,0],[1,0],
			[0,0],[0,0],[5,0],[0,0],[5,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[5,0],[0,0],[5,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[5,0],[0,0],[5,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[5,0],[7,0],[5,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[1,0],[5,0],[1,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[1,0],[5,0],[1,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[1,0],[1,0],[7,0],[1,0],[1,0],[0,0],[0,0],[1,0]
		];
		this.initConduit();
		this.randomConduit();
	},

	getTitle: function () {
		return "Level55";
	},
	afterConnect: function () {
		var node = {column:0.33,row:9.3 };
		var node1 = {column:6.33,row:0.3 };
		this._ball = [this.map[4][3],this.map[7][3]];
		for(var i=0;i<this._ball.length;i++){
			if(!Utils.inOrOut(this.nodelist,node,this._ball[i]) || !Utils.inOrOut(this.nodelist,node1,this._ball[i])){
				break ;
			}
			if(i==this._ball.length - 1){
				this.pushIntoList(this.map[4][3]);
				this.pushIntoList(this.map[7][3]);
				this.onCondition();
				DCAgent.onEvent('PASSED',1,{
					time: 30,//耗时30秒
					level: 'Level 55'
				});
			}
		}
	},
	onEliminate: function () {
		this.eliminateOther();
	},
	getLevel: function () {
		return 55;
	}
});

