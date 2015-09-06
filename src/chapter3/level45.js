/**
 * Created by ztc on 2015/8/28.
 */
var Level45 = GameLayer.extend({
	_ball:[],
	ctor: function () {
		this._super();
		this.init();
	},
	init: function () {

	},
	addConduit: function () {
		this.type = [
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[1,0],[5,0],[6,0],[5,0],[2,0],[0,0],
			[0,0],[5,0],[0,0],[7,0],[0,0],[5,0],[0,0],
			[0,0],[6,0],[0,0],[6,0],[0,0],[6,0],[0,0],
			[0,0],[5,0],[0,0],[5,0],[0,0],[5,0],[0,0],
			[0,0],[6,0],[0,0],[7,0],[0,0],[6,0],[0,0],
			[0,0],[4,0],[6,0],[5,0],[6,0],[3,0],[0,0],
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]
		];
		this.initConduit();
		this.randomConduit();
	},

	getTitle: function () {
		return "Level45";
	},
	afterConnect: function () {
		var node = {column:0.33,row:10.3};
		var node1 = {column:7.33,row:0.3};
		this._ball = [this.map[2][3],this.map[5][3]];
		for(var i=0;i<this._ball.length;i++){
			if(!Utils.inOrOut(this.nodelist,node,this._ball[i]) || !Utils.inOrOut(this.nodelist,node1,this._ball[i])){
				break ;
			}
			if(i==this._ball.length - 1){
				this.pushIntoList(this.map[2][3]);
				this.pushIntoList(this.map[5][3]);
				this.onCondition();
                DCAgent.onEvent('PASSED',1,{
					time: 30,//耗时30秒
					level: 'Level 45'
				});
			}
		}
	},
	onEliminate: function () {
		this.eliminateOther();
	},
	getLevel: function () {
		return 45;
	}
});

