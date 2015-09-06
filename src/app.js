////////////OMG
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var layer = new cc.LayerColor(cc.color(255,255,255),size.width,size.height);
        this.addChild(layer);

        var helloLabel = new cc.LabelTTF("main", "Arial",30);
        helloLabel.color = cc.color(0,0,0);
        helloLabel.x = size.width/2;
        helloLabel.y = size.height - helloLabel.getContentSize().height;
        this.addChild(helloLabel, 5);

        var menuStart = new cc.MenuItemFont("start game", function () {
            var scene = new cc.Scene();
            scene.addChild(new BeforeLayer(1));
            cc.director.runScene(scene);
        },this);
        menuStart.fontSize = 45;
        menuStart.fontName = "Arial";
        menuStart.color = cc.color(0,0,0);
        var menu = new cc.Menu(menuStart);
        this.addChild(menu);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

