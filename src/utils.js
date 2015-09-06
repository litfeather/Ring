/**
 * Created by tangr on 2015/8/19.
 */
var Utils = {//判断包围
    direction : function(point1,point2,point3){
        var x1 = point2.column-point1.column;
        var y1 = point2.row-point1.row;
        var x2 = point3.column-point1.column;
        var y2 = point3.row-point1.row;
        return x1*y2-x2*y1;
    },
    segmentIntersect : function(point1,point2,point3,point4){
        var d1=this.direction(point3,point4,point1);//p3p4,p3p1
        var d2=this.direction(point3,point4,point2);//p3p4,p3p2
        var d3=this.direction(point1,point2,point3);
        var d4=this.direction(point1,point2,point4);

        if(d1*d2<0 && d3*d4<0)
            return true;
        else
            return false;
    },
    inOrOut: function (list,node,props) {
        var count = 0;
        for(var i=0;i<list.length-1;i++){
            if(Math.abs(list[i].column - list[i+1].column)<=1 && Math.abs(list[i].row - list[i+1].row)<=1){
                if(this.segmentIntersect(node,props,list[i],list[i+1]))
                    count++;
            }
        }
        if(Math.abs(list[list.length-1].column - list[0].column)<=1 && Math.abs(list[list.length-1].row - list[0].row)<=1) {
            if (this.segmentIntersect(node, props, list[list.length - 1], list[0]))
                count++;
        }
        if(count%2==0)
            return false;
        else
            return true;
    }
}; 