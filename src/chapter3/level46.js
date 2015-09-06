/**
 * Created by ztc on 2015/8/28.
 */
var Level46 = GameLayer.extend({
	_ball:[],
	ctor: function () {
		this._super();
		this.init();
	},
	init: function () {

	},
	addConduit: function () {
		this.type = [
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[3,0],[4,0],[2,0],[4,0],[1,0],[3,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[1,0],[4,0],[1,0],[3,0],[2,0],[3,0],[1,0],[4,0],[0,0],[0,0],
			[0,0],[0,0],[3,0],[1,0],[7,0],[0,0],[0,0],[7,0],[4,0],[1,0],[0,0],[0,0],
			[0,0],[0,0],[4,0],[2,0],[7,0],[0,0],[0,0],[7,0],[2,0],[3,0],[0,0],[0,0],
			[0,0],[0,0],[1,0],[2,0],[4,0],[3,0],[1,0],[4,0],[2,0],[3,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[1,0],[2,0],[4,0],[2,0],[3,0],[1,0],[0,0],[0,0],[0,0],
			[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]
		];
		this.initConduit();
		this.randomConduit();
	},

	getTitle: function () {
		return "Level46";
	},
	afterConnect: function () {
		var node = {column:3.33,row:11.3};
		var node1 = {column:5.33,row:0.3};
		this._ball = [this.map[3][4],this.map[4][7]];
		for(var i=0;i<this._ball.length;i++){
			if(!Utils.inOrOut(this.nodelist,node,this._ball[i]) || !Utils.inOrOut(this.nodelist,node1,this._ball[i])){
				break ;
			}
			if(i==this._ball.length - 1){
				this.pushIntoList(this.map[3][4]);
				this.pushIntoList(this.map[3][7]);
				this.pushIntoList(this.map[4][4]);
				this.pushIntoList(this.map[4][7]);
				this.onCondition();
	            DCAgent.onEvent('PASSED',1,{
					time: 30,//耗时30秒
					level: 'Level 46'
				  });
			}
		}
	},
	onEliminate: function () {
		this.eliminateOther();
	},
	getLevel: function () {
		return 46;
	}
});

