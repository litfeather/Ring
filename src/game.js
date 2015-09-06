/**
 * Created by tangr on 2015/8/21.
 */
var GameLayer = cc.Layer.extend({
    size:null,
    mapPanel:null,
    map:null,
    mainnode:null,
    nodelist:[],
    udlrConnected:true,//上下左右连通
    level:0,//当前关卡
    type:null,//二维数组，储存每一关的形状
    tipsLabel:null,
    mark:true,
    through:false,
    autoHide:null,
    touchListener:null,
    mouseListener:null,

    ctor: function () {
        this._super();
        this.size = cc.winSize;
        this._init();
    },
    _init: function () {
        this.level = this.getLevel();

        var bg = this.getBg();
        this.addChild(bg, 1);
        bg.x = this.size.width/2;
        bg.y = this.size.height/2;


        this.checkLevel();
        this.addMenu();
        this.initPanel();
        this.addConduit();
        this.addListener();

    },
    checkLevel: function () {
        curLevel = this.level;
        cc.sys.localStorage.setItem("curlevel" ,curLevel);
        //if(this.level > lastLevel){
        //    lastLevel = this.level;
            cc.sys.localStorage.setItem("lastlevel" ,58);
        //}
    },
    initPanel: function () {
        var clippingPanel = new cc.ClippingNode();
        this.addChild(clippingPanel, 2);
        this.mapPanel = new cc.Layer();
        this.mapPanel.x = (this.size.width - Constant.CONDUIT_WIDTH*Constant.levelSize[this.level][0])/2;
        this.mapPanel.y = (this.size.height - Constant.CONDUIT_WIDTH*Constant.levelSize[this.level][1])/2;
        clippingPanel.addChild(this.mapPanel, 1);

        var stencil = new cc.DrawNode();
        stencil.drawRect(cc.p(this.mapPanel.x,this.mapPanel.y), cc.p(this.mapPanel.x+Constant.CONDUIT_WIDTH*Constant.levelSize[this.level][0],this.mapPanel.y+Constant.CONDUIT_WIDTH*Constant.levelSize[this.level][1]),
            cc.color(0,0,0), 1, cc.color(0,0,0));
        clippingPanel.stencil = stencil;
    },
    addConduit: function () {

    },
    initConduit: function () {
        this.map = [];
        var index=0;
        for (var i = 0; i < Constant.levelSize[this.level][0]; i++) {
            var column = [];
            for (var j = 0; j < Constant.levelSize[this.level][1]; j++) {
                if(this.getLevel() < 3||this.type[index][1] == 1){
                    var conduit = new Conduit(this.type[index][0],i,j,this.type[index][1]);
                    this.mapPanel.addChild(conduit);
                    conduit.x = Constant.CONDUIT_WIDTH/2 + i*Constant.CONDUIT_WIDTH;
                    conduit.y = Constant.CONDUIT_WIDTH/2 + j*Constant.CONDUIT_WIDTH;
                    column.push(conduit);
                }else{
                    if(this.type[index][0] < 5 &&this.type[index][0] > 0){
                        var type = Math.round(Math.random()*3)+1;
                        var conduit = new Conduit(type,i,j,this.type[index][1]);
                        this.mapPanel.addChild(conduit);
                        conduit.x = Constant.CONDUIT_WIDTH/2 + i*Constant.CONDUIT_WIDTH;
                        conduit.y = Constant.CONDUIT_WIDTH/2 + j*Constant.CONDUIT_WIDTH;
                        column.push(conduit);
                    }else if(this.type[index][0]>=5 && this.type[index][0]<7){
                        var type = Math.round(Math.random())+5;
                        var conduit = new Conduit(type,i,j,this.type[index][1]);
                        this.mapPanel.addChild(conduit);
                        conduit.x = Constant.CONDUIT_WIDTH/2 + i*Constant.CONDUIT_WIDTH;
                        conduit.y = Constant.CONDUIT_WIDTH/2 + j*Constant.CONDUIT_WIDTH;
                        column.push(conduit);
                    }else{
                        var conduit = new Conduit(this.type[index][0],i,j,this.type[index][1]);
                        this.mapPanel.addChild(conduit);
                        conduit.x = Constant.CONDUIT_WIDTH/2 + i*Constant.CONDUIT_WIDTH;
                        conduit.y = Constant.CONDUIT_WIDTH/2 + j*Constant.CONDUIT_WIDTH;
                        column.push(conduit);
                    }
                }
                index++;
            }
            this.map.push(column);
        }
    },
    randomConduit: function () {//随机生成其他部分的数组
        for (var i = 0; i < Constant.levelSize[this.level][0]; i++) {
            for (var j = 0; j < Constant.levelSize[this.level][1]; j++) {
                if(this.map[i][j].type==0){
                    var conduit = Conduit.createRandomType(i,j,0);
                    this.mapPanel.removeChild(this.map[i][j]);
                    this.mapPanel.addChild(conduit);
                    conduit.x = Constant.CONDUIT_WIDTH/2 + i*Constant.CONDUIT_WIDTH;
                    conduit.y = Constant.CONDUIT_WIDTH/2 + j*Constant.CONDUIT_WIDTH;
                    this.map[i][j] = conduit;
                }
            }
        }
    },
    addListener: function () {
        if("touches" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this._onTouchBegan.bind(this)
            }, this.mapPanel);
        } else {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: this._onMouseDown.bind(this)
            }, this.mapPanel);
        }
    },
    _onTouchBegan: function (touch, event) {
        var column = Math.floor((touch.getLocation().x - this.mapPanel.x)/Constant.CONDUIT_WIDTH);
        var row = Math.floor((touch.getLocation().y - this.mapPanel.y)/Constant.CONDUIT_WIDTH);
        if(column>=Constant.levelSize[this.level][0]||row>=Constant.levelSize[this.level][1]||column<0||row<0){
            if(!this.mark&&(touch.getLocationY() > this.mainMenu.getPositionY()+50)){
                this.showMainMenu();
                console.log("hide menus by user");
            }
            return false;
        }
        this.changeType(this.map[column][row],this);
        return true;
    },
    _onMouseDown: function (event) {
        var column = Math.floor((event.getLocationX() - this.mapPanel.x)/Constant.CONDUIT_WIDTH);
        var row = Math.floor((event.getLocationY() - this.mapPanel.y)/Constant.CONDUIT_WIDTH);
        if(column>=Constant.levelSize[this.level][0]||row>=Constant.levelSize[this.level][1]||column<0||row<0){
            if(!this.mark&&(event.getLocationY() > this.mainMenu.getPositionY()+50)){
                this.showMainMenu();
                console.log("hide menus by user");
            }
           return false;
        }
        this.changeType(this.map[column][row],this);
    },
    changeType: function (node,mainthis) {
        if(node.canRotate&&!node.fixed){
            var effect = eval("res.turn"+Math.ceil(Math.random()*4)+"_mp3");
            cc.audioEngine.playEffect(effect);
            node.canRotate = false;
            if(node.type==1||node.type==2||node.type==3||node.type==4){
                var action = cc.rotateBy(0.15,90);
                var afer = cc.callFunc(function(){
                    node.type = node.type%4 + 1;
                    mainthis.isConnect(node);
                    node.canRotate = true;
                },node);
                node.runAction(cc.sequence(action,afer));
            }else if(node.type==5){
                var action = cc.rotateBy(0.15,90);
                var afer = cc.callFunc(function(){
                    node.type=6;
                    mainthis.isConnect(node);
                    node.canRotate = true;
                },node);
                node.runAction(cc.sequence(action,afer));
            }
            else if(node.type==6){
                var action = cc.rotateBy(0.15,90);
                var afer = cc.callFunc(function(){
                    node.type=5;
                    mainthis.isConnect(node);
                    node.canRotate = true;
                },node);
                node.runAction(cc.sequence(action,afer));
            }
        }
    },
    isConnect: function (node) {//是否成环
        this.nodelist = [];
        this.mainnode = node;
        this.pushIntoList(node);
        var type = node.type;
        switch(type){
            case 1:this.checkRight(node);this.checkUp(node);break;
            case 2:this.checkRight(node);this.checkDown(node);break;
            case 3:this.checkDown(node);this.checkLeft(node);break;
            case 4:this.checkUp(node);this.checkLeft(node);break;
            case 5:this.checkRight(node);this.checkLeft(node);break;
            case 6:this.checkDown(node);this.checkUp(node);break;
            default : break;
        }
        //this.scheduleOnce(this.checkLight,0.1);
        this.checkLight();
    },
    checkLight: function(){
        //console.log("nodelist length:"+this.nodelist.length);
        for(var i =0;i < Constant.levelSize[this.level][0];i++){
            for(var j = 0;j < Constant.levelSize[this.level][1];j++){
                var k = 0;
                var num = -1;
                var conduit = this.map[i][j];
                for(k in this.nodelist){
                    var conduit0 = this.nodelist[k];
                    if((conduit.column == conduit0.column)&&(conduit.row == conduit0.row)){
                        //console.log("ni dao shi lai a");
                        num = k;
                        break;
                    }
                }
                if(num == -1){
                    this.doBlackOut(conduit);
                }else{
                    this.doLight(conduit);
                }
            }
        }
    },
    doBlackOut: function(conduit){
        switch(conduit.type){
            case 1: if(conduit.fixed) break;//conduit.setTexture(res.curly_fixed);
                    else conduit.setTexture(res.curly_png);
                    conduit.rotation = 0;break;
            case 2: if(conduit.fixed) break;//conduit.setTexture(res.curly_fixed);
                    else conduit.setTexture(res.curly_png);
                    conduit.rotation = 90;break;
            case 3: if(conduit.fixed) break;//conduit.setTexture(res.curly_fixed);
                    else conduit.setTexture(res.curly_png);
                    conduit.rotation = 180;break;
            case 4: if(conduit.fixed) break;//conduit.setTexture(res.curly_fixed);
                    else conduit.setTexture(res.curly_png);
                    conduit.rotation = 270;break;
            case 5: if(conduit.fixed) break;//conduit.setTexture(res.straight_fixed);
                    else conduit.setTexture(res.straight_png);
                    conduit.rotation = 90;break;
            case 6: if(conduit.fixed) break;//conduit.setTexture(res.straight_fixed);
                    else conduit.setTexture(res.straight_png);
                    conduit.rotation = 0;break;
            default: break;
        }
    },
    doLight: function(conduit){
        switch(conduit.type){
            case 1: if(conduit.fixed) break;//conduit.setTexture("res/lightPic/curly_fixed_light.png");
                    else conduit.setTexture("res/lightPic/curly_light.png");
                    conduit.rotation = 0;break;
            case 2: if(conduit.fixed) break;//conduit.setTexture("res/lightPic/curly_fixed_light.png");
                    else conduit.setTexture("res/lightPic/curly_light.png");
                    conduit.rotation = 90;break;
            case 3: if(conduit.fixed) break;//conduit.setTexture("res/lightPic/curly_fixed_light.png");
                    else conduit.setTexture("res/lightPic/curly_light.png");
                    conduit.rotation = 180;break;
            case 4: if(conduit.fixed) break;//conduit.setTexture("res/lightPic/curly_fixed_light.png");
                    else conduit.setTexture("res/lightPic/curly_light.png");
                    conduit.rotation = 270;break;
            case 5: if(conduit.fixed) break;//conduit.setTexture("res/lightPic/straight_fixed_light.png");
                    else conduit.setTexture("res/lightPic/straight_light.png");
                    conduit.rotation = 90;break;
            case 6: if(conduit.fixed) break;//conduit.setTexture("res/lightPic/straight_fixed_light.png");
                    else conduit.setTexture("res/lightPic/straight_light.png");
                    conduit.rotation = 0;break;
            default: break;
        }
    },
    checkLeft: function (node) {
        var left;
        if(node.column==0){
            if(this.udlrConnected)
                left = this.map[Constant.levelSize[this.level][0]-1][node.row];
            else
                return false;
        }
        else
            left = this.map[node.column-1][node.row];

        if(left.type==2){
            this.pushIntoList(left);//do not change the location of this code ,unless you add another judgment statement
            if(left==this.mainnode){
                this.afterConnect();
            }else
                this.checkDown(left);
        }
        else if(left.type==1){
            this.pushIntoList(left);
            if(left==this.mainnode){
                this.afterConnect();
            }else
                this.checkUp(left);
        }
        else if(left.type==5){
            this.pushIntoList(left);
            if(left==this.mainnode){
                this.afterConnect();
            }else
                this.checkLeft(left);
        }
        else
            return false;
    },
    checkRight: function (node) {
        var right;
        if(node.column==Constant.levelSize[this.level][0]-1){
            if(this.udlrConnected)
                right = this.map[0][node.row];
            else
                return false;
        }
        else
            right = this.map[node.column+1][node.row];
        if(right.type==3){
            this.pushIntoList(right);
            if(right==this.mainnode){
                this.afterConnect();
            }else
                this.checkDown(right);
        }
        else if(right.type==4){
            this.pushIntoList(right);
            if(right==this.mainnode){
                this.afterConnect();
            }else
                this.checkUp(right);
        }
        else if(right.type==5){
            this.pushIntoList(right);
            if(right==this.mainnode){
                this.afterConnect();
            }else
                this.checkRight(right);
        }
        else
            return false;
    },
    checkUp: function (node) {
        var up;
        if(node.row==Constant.levelSize[this.level][1]-1){
            if(this.udlrConnected)
                up = this.map[node.column][0];
            else
                return false;
        }
        else
            up = this.map[node.column][node.row+1];
        if(up.type==6){
            this.pushIntoList(up);
            if(up==this.mainnode){
                this.afterConnect();
            }else
                this.checkUp(up);
        }
        else if(up.type==3){
            this.pushIntoList(up);
            if(up==this.mainnode){
                this.afterConnect();
            }else
                this.checkLeft(up);
        }
        else if(up.type==2){
            this.pushIntoList(up);
            if(up==this.mainnode){
                this.afterConnect();
            }else
                this.checkRight(up);
        }
        else
            return false;
    },
    checkDown: function (node) {
        var down;
        if(node.row==0){
            if(this.udlrConnected)
                down = this.map[node.column][Constant.levelSize[this.level][1]-1];
            else
                return false;
        }
        else
            down = this.map[node.column][node.row-1];
        if(down.type==6){
            this.pushIntoList(down);
            if(down==this.mainnode){
                this.afterConnect();
            }else
                this.checkDown(down);
        }
        else if(down.type==4){
            this.pushIntoList(down);
            if(down==this.mainnode){
                this.afterConnect();
            }else
                this.checkLeft(down);
        }
        else if(down.type==1){
            this.pushIntoList(down);
            if(down==this.mainnode){
                this.afterConnect();
            }else
                this.checkRight(down);
        }
        else
            return false;
    },
    pushIntoList: function (node) {//把环上的每一个元素加入到nodelist
        if(this.nodelist.indexOf(node)<0){
            this.nodelist.push(node);
        }

    },
    afterConnect: function () {//连成环后事件

    },
    onCondition: function () {//连成环后事件（得先规定条件，level里用）
        cc.audioEngine.playMusic(res.toy_mp3,false);
        cc.eventManager.removeListeners(cc.EventListener.MOUSE);
        cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
        this.onEliminate();
	    //this.showMenu_hold();
        this.redToBlack();
        this.through = true;
        //console.log(this.through);
        if(this.type==1||this.type==2||this.type==24||this.type==43)
            //this.finishListener();
            this.nextLevel();
        else
            this.scheduleOnce(function(){
                //this.finishListener();
                this.nextLevel();
            },0.7);
    },
    finishListener: function () {
        if("touches" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this.nextLevel.bind(this)
            }, this);
        } else {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: this.nextLevel.bind(this)
            }, this);
        }
    },
    nextLevel: function(event) {
        //if((event.getLocationY() <= this.mainMenu.getPositionY() + 50)&&
        //    (event.getLocationY() > 50)){
        //    return;
        //}else{
        //    cc.eventManager.removeListeners(cc.EventListener.MOUSE);
        //    cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
            //cc.audioEngine.playMusic("res/toy.mp3",false);
            this.eliminateSelf();
            //this.hideMenu();
            this.nodelist = [];
            if(this.tipsLabel){
                this.tipsLabel.runAction(cc.fadeOut(0.7));
                this.tipsLabel = null;
            }
            this.scheduleOnce(function(){
                var scene = new cc.Scene();
                if(this.level == Constant.totalLevel)
                    return false;
                scene.addChild(new BeforeLayer(this.level+1));
                cc.director.runScene(scene);
            },0.7);
        //}
    },
    onEliminate: function () {

    },
    eliminateOther: function () {//消除环外其他元素
        for (var i = 0; i < Constant.levelSize[this.level][0]; i++) {
            for (var j = 0; j < Constant.levelSize[this.level][1]; j++) {
                for(var k = 0; k<this.nodelist.length; k++){
                    if(this.nodelist[k].column==i&&this.nodelist[k].row==j){
                        break;
                    }
                    if(k == this.nodelist.length-1&& this.map[i][j].type<7)
                        this.map[i][j].runAction(cc.fadeOut(0.7));
                        this.map[i][j].retain();
                }
            }
        }
    },
    eliminateSelf: function () {//消除自己
        for(var i=0;i<this.nodelist.length;i++){
            this.nodelist[i].runAction(cc.fadeOut(0.7));
        }
    },
    getFixedNode: function () {//获取固定节点的坐标
        var array = [];
        for(var i=0;i<this.type.length;i++){
            var array1 = [];
            if(this.type[i][1]==1){
                array1[0] = parseInt(i/Constant.levelSize[this.level][1]);
                array1[1] = i%Constant.levelSize[this.level][1];
                array.push(array1)
            }
        }
        return array;
    },
    redToBlack: function () {
        var ary = this.getFixedNode();
        for(var m=0;m<ary.length;m++){
            var array = ary[m];
            var x = array[0];
            var y = array[1];
            var type = this.map[x][y].type;
            this.mapPanel.removeChild(this.map[x][y]);
            var conduit = new Conduit(type,x,y,0);
            this.doLight(conduit);
            conduit.x = Constant.CONDUIT_WIDTH/2 + x*Constant.CONDUIT_WIDTH;
            conduit.y = Constant.CONDUIT_WIDTH/2 + y*Constant.CONDUIT_WIDTH;
            this.mapPanel.addChild(conduit);
            this.pushIntoList(conduit);
        }
    },
    hasPassed: function (list) {//是否经过了几个固定节点
        for(var i=0;i<list.length;i++){
            for(var j=0;j<this.nodelist.length;j++){
                if(list[i][0]==this.nodelist[j].column&&list[i][1]==this.nodelist[j].row)
                break;
                if(j==this.nodelist.length-1)
                    return false;
            }
        }
        return true;
    },
    autoEliminate: function () {//自动检测刚开始是否成环
        for(i=Constant.HEIGHT_SIZE-1;i>=0;i--)
            for(j=0;j<Constant.WIDTH_SIZE;j++)
                this.isConnect(this.map[j][i]);
    },
    addMenu: function(){
        this.preLevel = new cc.MenuItemImage(res.iconPre_png,
                        res.iconPre_png,res.iconPreUnavilable_png,this.jumpToPre,this);
        this.preLevel.setPosition(this.width/2-150,60);

        this.preLevel.opacity = 0;
        this.preLevel.setEnabled(false);

        this.levelChoice = new cc.MenuItemImage(res.iconLevel_png,
                        res.iconLevel_png,this.jumpToMain,this);
        this.levelChoice.setPosition(this.width/2-50,60);

        this.levelChoice.opacity = 0;
        this.levelChoice.setEnabled(false);

        this.nextLevelBtn = new cc.MenuItemImage(res.iconNext_png,
                        res.iconNext_png,res.iconNextUnavilable_png,this.jumpToNext,this);
        this.nextLevelBtn.setPosition(this.width/2+150,60);

        this.nextLevelBtn.opacity = 0;
        this.nextLevelBtn.setEnabled(false);

        this.mainMenu = new cc.MenuItemImage(res.iconCircle_png,
                        res.iconCircle_png,this.showMenus,this);
        this.mainMenu.setPosition(this.width/2,60);


        this.shareMenu = new cc.MenuItemImage(res.iconShare_png,
                        res.iconShare_png,this.shareTo,this);
        this.shareMenu.setPosition(this.width/2+50,60);

        this.shareMenu.opacity = 0;
        this.shareMenu.setEnabled(false);

        var menu = new cc.Menu(this.preLevel,this.levelChoice,this.nextLevelBtn,this.shareMenu,this.mainMenu);
        this.addChild(menu,3);
        menu.x = menu.y = 0;
    },
    jumpToPre: function(){
        console.log("pre");
        var scene = new cc.Scene();
        if(this.level == 1)
            return false;
        scene.addChild(new BeforeLayer(this.level-1));
        cc.director.runScene(scene);
    },
    jumpToNext: function(){
        if(this.tipsLabel){
            this.tipsLabel.runAction(cc.fadeOut(1));
            this.tipsLabel = null;
        }
        this.scheduleOnce(function(){
            var scene = new cc.Scene();
            if(this.level == Constant.totalLevel)
                return false;
            scene.addChild(new BeforeLayer(this.level+1));
            cc.director.runScene(scene);
        },0.1);
    },
    jumpToMain: function () {
        lastScene = true;
        cc.director.pushScene(new LevelSelectScene());
    },
    showMenus: function(){
        console.log("Level:" + this.getLevel() + " show menus for 5s ");

        var _this = this;
        var sequence = cc.sequence(cc.fadeOut(0.1),cc.callFunc(function(){
            _this.levelChoice.setEnabled(true);
            _this.shareMenu.setEnabled(true);

            if(_this.getLevel() != 1){
                _this.preLevel.setEnabled(true);
            }
            if(_this.getLevel() < lastLevel||_this.through){
                _this.nextLevelBtn.setEnabled(true);
                //console.log(this.through);
            }
            var showAction = cc.fadeIn(0.1);
            _this.mainMenu.setVisible(false);
            _this.preLevel.runAction(showAction);
            _this.levelChoice.runAction(showAction.clone());
            _this.nextLevelBtn.runAction(showAction.clone());
            _this.shareMenu.runAction(showAction.clone());
        }));
        this.mainMenu.runAction(sequence);
        this.mark = false;
        if(this.autoHide!=null){
            clearTimeout(this.autoHide);
        }
        this.autoHide= setTimeout(function(){
            if(!this.mark){
                _this.showMainMenu();
                console.log("hide menus automatic");
            }
        },5000);
    },
    showMainMenu: function(){
        if(this.mark){
            //console.log("menus has been hidden!");
            return;
        }else{
        this.mark = true;
        this.levelChoice.runAction(cc.fadeOut(0.2));
        this.nextLevelBtn.runAction(cc.fadeOut(0.2));
        this.shareMenu.runAction(cc.fadeOut(0.2));

        this.preLevel.setEnabled(false);
        this.levelChoice.setEnabled(false);
        this.nextLevelBtn.setEnabled(false);
        this.shareMenu.setEnabled(false);

        var _this = this;
        var sequence = cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
            _this.mainMenu.setVisible(true);
            _this.mainMenu.runAction(cc.fadeIn(0.5));

        }));
        this.preLevel.runAction(sequence);
        }

    },

    showMenu_hold:function(){
          this.mainMenu.setEnabled(false);
          this.levelChoice.setEnabled(true);
          this.shareMenu.setEnabled(true);
          this.nextLevelBtn.setEnabled(true);
          if(this.getLevel() != 1){
              this.preLevel.setEnabled(true);
          }
          this.mainMenu.opacity = 0;
          this.preLevel.runAction(cc.fadeIn(1));
          this.levelChoice.runAction(cc.fadeIn(1));
          this.nextLevelBtn.runAction(cc.fadeIn(1));
          this.shareMenu.runAction(cc.fadeIn(1));
    },
    hideMenu:function(){

        this.preLevel.runAction(cc.fadeOut(1));
        this.levelChoice.runAction(cc.fadeOut(1));
        this.nextLevelBtn.runAction(cc.fadeOut(1));
        this.shareMenu.runAction(cc.fadeOut(1));

        this.preLevel.setEnabled(false);
        this.levelChoice.setEnabled(false);
        this.nextLevelBtn.setEnabled(false);
        this.shareMenu.setEnabled(false);


    },
    shareTo: function(){
        console.log("share");
    },
    getBg: function () {
        return new cc.Sprite(res.bg_png);
    },
    getTitle: function () {
        
    },
    getLevel: function () {

    }
});