//每一关卡前界面
var BeforeLayer = cc.Layer.extend({
    ctor:function (level) {
        this._super();
        var size = cc.winSize;

        var bg = new cc.Sprite("res/bg.png");
        this.addChild(bg, 1);
        bg.x = size.width/2;
        bg.y = size.height/2;

        var levelLabel = new cc.LabelTTF(level, "Microsoft YaHei UI Light",80);
        levelLabel.color = cc.color(0,0,0);
        levelLabel.x = size.width/2;
        levelLabel.y = size.height/2;
        this.addChild(levelLabel, 2);
        levelLabel.opacity = 0;

        levelLabel.runAction(cc.sequence(cc.fadeIn(0.6),cc.fadeOut(0.6)));

        this.scheduleOnce(function () {
            var scene = new cc.Scene();
            var _level = eval("Level"+level);
            scene.addChild(new _level());
            cc.director.runScene(scene);
        },1.5);

        return true;
    }
});

