/**
 * Created by ztc on 2015/8/29.
 */

var Level47 = GameLayer.extend({
	_ball:[],
	ctor: function () {
		this._super();
		this.init();
	},
	init: function () {

	},
	addConduit: function () {
		this.type = [
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[4,0],[6,0],[5,0],[1,0],[0,0],
			[0,0],[0,0],[2,0],[5,0],[3,0],[0,0],[0,0],[6,0],[0,0],[9,0],[5,0],[0,0],
			[0,0],[0,0],[3,0],[2,0],[6,0],[1,0],[4,0],[5,0],[1,0],[5,0],[4,0],[0,0],
			[0,0],[0,0],[0,0],[6,0],[2,0],[3,0],[4,0],[1,0],[5,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[5,0],[3,0],[2,0],[1,0],[4,0],[6,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[2,0],[3,0],[5,0],[4,0],[1,0],[6,0],[4,0],[6,0],[1,0],[0,0],
			[0,0],[0,0],[3,0],[6,0],[2,0],[0,0],[0,0],[5,0],[0,0],[9,0],[6,0],[0,0],
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0],[5,0],[6,0],[4,0],[0,0]
		];
		this.initConduit();
		this.randomConduit();
	},

	getTitle: function () {
		return "Level47";
	},
	afterConnect: function () {
		var node = {column:0.33,row:11.3};
		var node1 = {column:7.33,row:0.3};
		this._ball = [this.map[1][9],this.map[6][9]];
		for(var i=0;i<this._ball.length;i++){
			if(!Utils.inOrOut(this.nodelist,node,this._ball[i]) || !Utils.inOrOut(this.nodelist,node1,this._ball[i])){
				break ;
			}
			if(i==this._ball.length - 1){
				this.pushIntoList(this.map[1][9]);
				this.pushIntoList(this.map[6][9]);
				this.onCondition();
				DCAgent.onEvent('PASSED',1,{
					time: 30,//耗时30秒
					level: 'Level 47'
				});
			}
		}
	},
	onEliminate: function () {
		this.eliminateOther();
	},
	getLevel: function () {
		return 47;
	}
});



