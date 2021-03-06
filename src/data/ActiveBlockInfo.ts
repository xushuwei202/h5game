/**
 * Created by jgg on 2015/1/28.
 * 活动 Block 的数据结构
 */

module data{
    export class ActiveBlockInfo{

        private _currentType:string   = "";
        private _ablockMap:Array<any> = null;
        private _isDie:boolean = false;
        private _point:egret.Point;

        private _body:egret.Sprite;

        private _checkList:Array<data.CheckPoint>;


        public constructor(){
            this._point = new egret.Point(0,0);
            this._body  = new egret.Sprite();

            this._checkList = new Array<data.CheckPoint>();
        }

        public setActiveBlockType(aType:string):void{
            this._currentType = aType;

        }

        public getActiveBlockType():string{
            return this._currentType;
        }

        public setABlockMap(value:Array<any>):void{

            this._ablockMap = value;
            this.creatBlockMap();
        }


        public getX():number{
            return this._body.x;
        }

        public getY():number{
            return this._body.y;
        }

        public getWidth():number{

            return this._ablockMap[0].length * config.GameConfig.BLOCK_WIDTH;
        }

        public getHeight():number{

            return this._ablockMap.length * config.GameConfig.BLOCK_HIEGHT;
        }

        public getBody():egret.Sprite{
            return this._body;
        }

        /**
         * 是否死亡
         * @param value
         */
        public setIsDie(value:boolean):void{
            this._isDie = value;
        }

        public getIsDie():boolean{
            return this._isDie;
        }


        public setXY(x:number,y:number):void{
            this._body.x = x;
            this._body.y = y;
        }



        /**
         * 创建Active Block View
         */
        private creatBlockMap():void{

            var arrPoint:Array<data.ABlockPoint> = null;
            var aPoint:data.ABlockPoint = null;

            for(var row:number=0; row<this._ablockMap.length; row++){
                arrPoint = this._ablockMap[row];
                for(var col:number=0; col<arrPoint.length;col++){
                    aPoint = arrPoint[col];
                    this._body.addChild(aPoint.getImg())
                    aPoint.setXY(row*aPoint.getWidth(),col*aPoint.getHeight());
                }
            }
        }




        public updata():void{
            if(this._isDie) return;
        }


        /**
         * 全局坐标
         * @returns {Point}
         */
        public getGlobalPoint():egret.Point{
            return this._point;
        }



        /**
         * 对映到大地图中的行数
         * @returns {number}
         */
        private getRowForGlobal():number{
            return this.getX()/config.GameConfig.BLOCK_HIEGHT;
        }

        /**
         * 对映到大地图中的列数
         * @returns {number}
         */
        private getColForGlobal():number{
            return this.getY()/config.GameConfig.BLOCK_WIDTH;
        }


        /**
         * 要检测的点
         * @returns {Array<data.CheckPoint>}
         */
        public getCheckList():any{

            if(this._checkList.length != 0){
                return this._checkList;
            }

            var arrPoint:Array<data.ABlockPoint> = null;
            var aPoint:data.ABlockPoint = null;
            var globalRow:number = 0;
            var globalCol:number = 0;

            for(var row:number=0; row<this._ablockMap.length; row++){
                globalRow = row+this.getRowForGlobal();
                arrPoint = this._ablockMap[row];
                for(var col:number=0; col<arrPoint.length;col++){
                    globalCol = col + this.getColForGlobal();
                    aPoint = arrPoint[col];
                    this._checkList.push(new data.CheckPoint(globalRow,globalCol,aPoint.getBlock()));
                }
            }

            return this._checkList;
        }




        public destroy():void{
            //todo
        }




    }//end export

}//end module
