/**
 * Created by ztc on 2015/8/29.
 */
var Level51 = GameLayer.extend({
	_ball:[],
	ctor: function () {
		this._super();
		this.init();
	},
	init: function () {

	},
	addConduit: function () {
		this.type = [
			[0,0],[0,0],[1,0],[5,0],[1,0],[0,0],[0,0],[0,0],[0,0],[1,1],[2,1],[0,0],
			[0,0],[1,1],[1,0],[7,0],[1,0],[5,0],[5,0],[5,0],[5,0],[1,0],[1,0],[1,0],
			[0,0],[4,1],[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[7,0],[1,0],[1,0],
			[0,0],[0,0],[5,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0],[1,0],
			[0,0],[1,1],[1,0],[0,0],[1,0],[5,0],[5,0],[5,0],[5,0],[5,0],[5,0],[1,0],
			[0,0],[4,1],[1,0],[0,0],[5,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[5,0],[7,0],[1,0],[5,0],[5,0],[5,0],[2,1],[0,0],[0,0],[0,0],
			[0,0],[0,0],[1,0],[5,0],[5,0],[5,0],[5,0],[5,0],[3,1],[0,0],[0,0],[0,0]
		];
		this.initConduit();
		this.randomConduit();
	},

	getTitle: function () {
		return "Level51";
	},
	afterConnect: function () {
		var node = {column:0.33,row:11.3};
		var node1 = {column:5.33,row:0.3};
		this._ball = [this.map[1][3],this.map[2][9],this.map[6][3]];
		for(var i=0;i<this._ball.length;i++){
			if(!Utils.inOrOut(this.nodelist,node,this._ball[i]) || !Utils.inOrOut(this.nodelist,node1,this._ball[i])){
				break ;
			}
			if(i==this._ball.length - 1){
				this.pushIntoList(this.map[1][3]);
				this.pushIntoList(this.map[2][9]);
				this.pushIntoList(this.map[6][3]);
				this.onCondition();
				DCAgent.onEvent('PASSED',1,{
					time: 30,//耗时30秒
					level: 'Level 51'
				});
			}
		}
	},
	onEliminate: function () {
		this.eliminateOther();
	},
	getLevel: function () {
		return 51;
	}
});
