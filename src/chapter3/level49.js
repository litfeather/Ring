/**
 * Created by ztc on 2015/8/28.
 */
var Level49 = GameLayer.extend({
	_ball:[],
	ctor: function () {
		this._super();
		this.init();
	},
	init: function () {

	},
	addConduit: function () {
		this.type = [
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[1,0],[5,0],[2,1],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[5,0],[0,0],[2,0],[6,0],[5,0],[2,1],[0,0],
			[0,0],[0,0],[0,0],[6,0],[3,0],[9,0],[1,0],[6,0],[4,0],[0,0],
			[0,0],[0,0],[0,0],[5,0],[5,0],[0,0],[6,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[6,0],[0,0],[9,0],[2,0],[5,0],[2,1],[0,0],
			[0,0],[0,0],[0,0],[2,0],[5,0],[6,0],[6,0],[5,0],[3,0],[0,0],
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]
		];
		this.initConduit();
		this.randomConduit();
	},

	getTitle: function () {
		return "Level49";
	},
	afterConnect: function () {
		var node = {column:3.33,row:11.3};
		var node1 = {column:4.33,row:0.3};
		this._ball = [this.map[3][5],this.map[5][5]];
		for(var i=0;i<this._ball.length;i++){
			if(!Utils.inOrOut(this.nodelist,node,this._ball[i]) || !Utils.inOrOut(this.nodelist,node1,this._ball[i])){
				break ;
			}
			if(i==this._ball.length - 1){
				this.pushIntoList(this.map[3][5]);
				this.pushIntoList(this.map[5][5]);
				this.onCondition();
				DCAgent.onEvent('PASSED',1,{
					time: 30,//耗时30秒
					level: 'Level 49'
				});
			}
		}
	},
	onEliminate: function () {
		this.eliminateOther();
	},
	getLevel: function () {
		return 49;
	}
});


