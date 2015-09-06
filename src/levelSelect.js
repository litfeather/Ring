/**
 * Created by tangr on 2015/8/29.
 */
var LevelSelectLayer = cc.Layer.extend({
    scrollView:null,
    ctor: function () {
        this._super();
        var size = cc.winSize;

        var bg = new cc.Sprite(res.bg_png);
        this.addChild(bg, 0);
        bg.x = size.width/2;
        bg.y = size.height/2;

        this.scrollView = new ccui.ScrollView();
        this.addChild(this.scrollView);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setBounceEnabled(false);
        this.scrollView.setContentSize(cc.size(720,140*7));
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.y = this.scrollView.height;

        var scrollViewSize = this.scrollView.getContentSize();
        this.scrollView.setInnerContainerSize(cc.size(scrollViewSize.width, scrollViewSize.height / 7 * 15));
        this.scrollView.y = (size.height-7*140)/2;

        var startX = (size.width - 4*140)/2;
        var statrY = this.scrollView.y + 14*140;
        if(lastLevel==1){
            var node = new LevelSprite(2,curLevel);
            node.x = startX + 140*((curLevel-1)%4) + 70;
            node.y = statrY - 140*parseInt((curLevel-1)/4) - 70;
            this.scrollView.addChild(node);

            for(var i=Number(curLevel)+1;i<=Constant.totalLevel;i++){
                var node = new LevelSprite(3,i);
                node.x = startX + 140*((i-1)%4) + 70;
                node.y = statrY - 140*parseInt((i-1)/4) - 70;
                this.scrollView.addChild(node);
            }
        }else{
            var node = new LevelSprite(2,curLevel);
            node.x = startX + 140*((curLevel-1)%4) + 70;
            node.y = statrY - 140*parseInt((curLevel-1)/4) - 70;
            this.scrollView.addChild(node);

            for(var i=1;i<=lastLevel;i++){
                if(i==curLevel)
                    continue;
                var node = new LevelSprite(1,i);
                node.x = startX + 140*((i-1)%4) + 70;
                node.y = statrY - 140*parseInt((i-1)/4) - 70;
                this.scrollView.addChild(node);
            }

            for(var i=Number(lastLevel)+1;i<=Constant.totalLevel;i++){
                var node = new LevelSprite(3,i);
                node.x = startX + 140*((i-1)%4) + 70;
                node.y = statrY - 140*parseInt((i-1)/4) - 70;
                this.scrollView.addChild(node);
            }
        }



        var backMenu = new cc.MenuItemImage(res.iconCircle_png,
            res.iconCircle_png,this.back,this);
        backMenu.setPosition(size.width/2,60);

        var menu = new cc.Menu(backMenu);
        this.addChild(menu,3);
        menu.x = menu.y = 0;
    },
    back: function () {
        if(lastScene)
            cc.director.popScene();
        else{
            var scene = new cc.Scene();
            scene.addChild(new BeforeLayer(curLevel));
            cc.director.runScene(scene);
        }
    }
});

var LevelSelectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LevelSelectLayer();
        this.addChild(layer);
    }
});