/**
 * Created by Kenko on 2014/9/14.
 */

var Conduit = cc.Sprite.extend({

    type: 0,
    column: 0,
    row: 0,
    canRotate:true,
    fixed:0,//是否固定

    ctor: function (type, column, row, fixed) {
        switch(type){
            case 1:
                if(fixed) this._super(res.curly_fixed);
                else this._super(res.curly_png);
                this.rotation=0;break;
            case 2:
                if(fixed) this._super(res.curly_fixed);
                else this._super(res.curly_png);
                this.rotation=90;break;
            case 3:
                if(fixed) this._super(res.curly_fixed);
                else this._super(res.curly_png);
                this.rotation=180;break;
            case 4:
                if(fixed) this._super(res.curly_fixed);
                else this._super(res.curly_png);
                this.rotation=270;break;
            case 5:
                if(fixed) this._super(res.straight_fixed);
                else this._super(res.straight_png);
                this.rotation=90;break;
            case 6:
                if(fixed) this._super(res.straight_fixed);
                else this._super(res.straight_png);
                this.rotation=0;break;
            case 7:
                this._super(res.targetBlack_png);break;
            case 8:
                 this._super(res.targetBlue_png);break;
            case 9:
                this._super(res.targetRed_png);break;
            default : this._super();break;
        }
        this.init(type, column, row, fixed);
    },

    init: function (type, column, row, fixed) {
        this.type = type;
        this.column = column;
        this.row = row;
        this.fixed = fixed;
    }
});


Conduit.createRandomType = function (column, row, fixed) {
    return new Conduit(Math.ceil(Math.random()*6), column, row, fixed);
};