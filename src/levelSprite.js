/**
 * Created by tangr on 2015/8/28.
 */
var LevelSprite = cc.Sprite.extend({
    level:null,
    ctor: function (type,level) {
        this.level = level;

        var size = cc.size(720, 1280);
        var label = new cc.LabelTTF(level, "Microsoft YaHei UI Light", 50);

        switch (type){
            case 1:this._super(res.unlockLevel_png);label.setColor(cc.color(0,0,0));break;
            case 2:this._super(res.curLevel_png);label.setColor(cc.color(255,255,255));break;
            case 3:this._super(res.lockLevel_png);label.setColor(cc.color(139,138,138));break;
            default :this._super();break;
        }
        label.setPosition(this.width / 2, this.height / 2);
        this.addChild(label);
        if(level<=lastLevel)
            this.addListener();
    },
    addListener: function () {
        cc.eventManager.addListener({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : false,
            onTouchBegan  : this.onTouchBegan,
            onTouchMoved  : this.onTouchMoved,
            onTouchEnded  : this.onTouchEnded
        }, this);
    },
    onTouchBegan: function (touch, event) {
        var target = this.target;
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var size = target.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return false;
        }

        target._touchOffset = touch.getLocation();
        return true;
    },
    onTouchMoved : function (touch, event) {

    },
    onTouchEnded : function (touch, event) {
        var target = this.target;

        var isEffective = target.checkTouch(target._touchOffset, touch.getLocation());
        if (isEffective){
            target.startGame();
            target._touchOffset = cc.p(0, 0);
        }
    },
    checkTouch : function(pos1, pos2){
        var offsetX = Math.abs(pos2.x - pos1.x);
        var offsetY = Math.abs(pos2.y - pos1.y);
        return (offsetX <= this.width / 3 && offsetY <= this.height / 3) ? true : false;
    },
    startGame: function () {
        var scene = new cc.Scene();
        scene.addChild(new BeforeLayer(this.level));
        cc.director.runScene(scene);
    }
});