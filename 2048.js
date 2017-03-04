var game = {
    data:[],
    rn:4,
    cn:4,
    state:0,
    RUNNING:1,
    GAMEOVER:0,
    score:0,
    isGameOver:function(){
        if(!this.isFull()){
            return false;
        }else{
            for(var row=0;row<this.rn;row++){
                for(var col=0;col<this.cn;col++){
                    if(col<this.cn-1){
                        if(this.data[row][col]==this.data[row][col+1]){
                            return false;
                        }
                    }
                    if(row<this.rn-1){
                        if(this.data[row][col]==this.data[row+1][col]){
                            return false;
                        }
                    }
                }
            }
            return true;
        }
    },
    start:function(){
        this.state=this.RUNNING;
        var div = document.getElementById('gameOver');
        div.style.display = "none";
        this.data=[
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        this.score = 0;

        this.randomNum();
        this.randomNum();
        this.updateView();
    },
    isFull:function(){
        for(var row=0;row<this.rn;row++){
            for(var col=0;col<this.cn;col++){
                if(this.data[row][col]==0){
                    return false;
                }
            }
        }
        return true;
    },
    randomNum:function(){
        if(!this.isFull()){
            while(true){
                var row = parseInt(Math.random()*this.rn);
                var col = parseInt(Math.random()*this.cn);
                if(this.data[row][col]==0){
                    this.data[row][col]=Math.random()<0.5?2:4;
                    break;
                }
            }
        }
    },
    updateView:function(){
        for(var row=0;row<this.rn;row++){
            for(var col=0;col<this.cn;col++){
                var div = document.getElementById('c'+row+col);
                var curr = this.data[row][col];
                div.innerHTML=curr!=0?curr:"";
                div.className=curr!=0?"cell n"+curr:"cell";
            }
        }
        var span = document.getElementById('score');
        span.innerHTML = this.score;

        if(this.isGameOver()){
            this.state = this.GAMEOVER;
            var div = document.getElementById('gameOver');
            var span = document.getElementById('finalScore');
            span.innerHTML = this.score;
            div.style.display = "block";
        }
    },
    getRightNext:function(row,col){
        for(var nextc=col+1;nextc<this.cn;nextc++){
            if(this.data[row][nextc]!=0){
                return nextc;
            }
        }
        return -1;
    },
    moveLeftInRow:function(row){
        for(var col=0;col<this.cn-1;col++){
            var nextc = this.getRightNext(row,col);
            if(nextc == -1){
                break;
            }else{
                if(this.data[row][col] == 0){
                    this.data[row][col] = this.data[row][nextc];
                    this.data[row][nextc] = 0;
                    col--;
                }else if(this.data[row][col] == this.data[row][nextc]){
                    this.data[row][col] *= 2;
                    this.data[row][nextc] = 0;
                    this.score += this.data[row][col];
                }
            }
        }
    },
    moveLeft:function(){
        var oldStr = this.data.toString();
        for(var row=0;row<this.rn;row++){
            this.moveLeftInRow(row);
        }
        var newStr = this.data.toString();
        if(oldStr != newStr){
            this.randomNum();
            this.updateView();
        }
    },
    moveRight:function(){
        var oldStr = this.data.toString();
        for(var row=0;row<this.rn;row++){
            this.moveRightInRow(row);
        }
        var newStr = this.data.toString();
        if(oldStr != newStr){
            this.randomNum();
            this.updateView();
        }
    },
    moveRightInRow:function(row){
        for(var col=this.cn-1;col>0;col--){
            var nextc = this.getLeftNext(row,col);
            if(nextc == -1){
                break;
            }else{
                if(this.data[row][col]==0){
                    this.data[row][col] = this.data[row][nextc];
                    this.data[row][nextc] = 0;
                    col++;
                }else if(this.data[row][col]==this.data[row][nextc]){
                    this.data[row][col] *= 2;
                    this.data[row][nextc] = 0;
                    this.score += this.data[row][col];
                }
            }
        }
    },
    getLeftNext:function(row,col){
        for(var nextc=col-1;nextc>=0;nextc--){
            if(this.data[row][nextc]!=0){
                return nextc;
            }
        }
        return -1;
    },
    getDownNext:function(row,col){
        for(var nextr=row+1;nextr<this.rn;nextr++){
            if(this.data[nextr][col]!=0){
                return nextr;
            }
        }
        return -1;
    },
    moveUpInCol:function(col){
        for(var row=0;row<this.rn-1;row++){
            var nextr = this.getDownNext(row,col);
            if(nextr==-1){
                break;
            }else{
                if(this.data[row][col]==0){
                    this.data[row][col] = this.data[nextr][col];
                    this.data[nextr][col] = 0;
                    row--;
                }else if(this.data[row][col]==this.data[nextr][col]){
                    this.data[row][col] *= 2;
                    this.data[nextr][col] = 0;
                    this.score += this.data[row][col];
                }
            }
        }
    },
    moveUp:function(){
        var oldStr = this.data.toString();
        for(var col=0;col<this.cn;col++){
            this.moveUpInCol(col);
        }
        var newStr = this.data.toString();
        if(oldStr!=newStr){
            this.randomNum();
            this.updateView();
        }
    },
    moveDownInCol:function(col){
        for(var row=this.rn-1;row>0;row--){
            var nextr = this.getUpNext(row,col);
            if(nextr==-1){
                break;
            }else{
                if(this.data[row][col]==0){
                    this.data[row][col] = this.data[nextr][col];
                    this.data[nextr][col] = 0;
                    row++;
                }else if(this.data[row][col]==this.data[nextr][col]){
                    this.data[row][col] *= 2;
                    this.data[nextr][col] = 0;
                    this.score += this.data[row][col];
                }
            }
        }
    },
    moveDown:function(){
        var oldStr = this.data.toString();
        for(var col=0;col<this.cn;col++){
            this.moveDownInCol(col);
        }
        var newStr = this.data.toString();
        if(oldStr!=newStr){
            this.randomNum();
            this.updateView();
        }
    },
    
    getUpNext:function(row,col){
        for(var nextr=row-1;nextr>=0;nextr--){
            if(this.data[nextr][col]!=0){
                return nextr;
            }
        }
        return -1;
    }
}
/*以上为game的所有属性函数*/
window.onload=function(){
    game.start();
    document.onkeydown=function(){
        if(game.state==game.RUNNING){
            var e=window.event||arguments[0];
            if(e.keyCode==37){
                game.moveLeft();
            }else if(e.keyCode==39){
                game.moveRight();
            }else if(e.keyCode==38){
                game.moveUp();
            }else if(e.keyCode==40){
                game.moveDown();
            }else if(e.keyCode==13){
                game.start();
            }
        }
    }
}