/**
 * Created by ztc on 2015/8/31.
 */
var Level43 = GameLayer.extend({
	ctor: function () {
		this._super();
		this.init();
	},
	init: function () {
		this.tipsLabel = new cc.LabelTTF("一个闭环围住所有小球才可过关", "Microsoft YaHei UI Light",30);
		this.tipsLabel.color = cc.color(0,0,0);
		this.tipsLabel.x = this.size.width/2;
		this.tipsLabel.y = this.size.height*6/7;
		this.addChild(this.tipsLabel, 1);
	},
	addConduit: function () {
		this.type = [[3,0],[5,0],[4,0],
			[5,0],[7,0],[5,0],
			[3,0],[5,0],[4,0]];
		this.initConduit();
	},

	getTitle: function () {
		return "Level43";
	},
	afterConnect: function () {
		var node = {column:0.33,row:Constant.HEIGHT_SIZE};
		var ball = this.map[1][1];
		if(Utils.inOrOut(this.nodelist,node,ball)){
			this.onCondition();
		}
	},
	onEliminate: function () {
		this.map[1][1].runAction(cc.fadeOut(1));
		this.eliminateSelf();
	},
	getLevel: function () {
		return 43;
	}
});

