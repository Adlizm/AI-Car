class Matrix{
    constructor(rows,cols,value){
        if(!(rows > 0 && cols > 0)){
            throw "Number of rows and columns need be positive";
        }
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];
        for(let i = 0; i< this.rows; i++){
            this.matrix[i] = [];
            for(let j = 0; j< this.cols; j++){
                this.matrix[i][j] = value ? value(i,j) : 0;
            }
        }
    }
    add(B){return Matrix.add(this,B);}
    mult(B){return Matrix.mult(this,B);}
    maxValue(){return Matrix.maxValue(this)}
    minalue(){return Matrix.minValue(this)}

    static maxValue(A){
        var max = A.matrix[0][0];
        var index = {row:0,col:0};
        for(let i = 0; i < A.rows; i++){
            for(let j=0; j < A.cols; j++){
                if(A.matrix[i][j] > max){
                    max = A.matrix[i][j];
                    index.row = i;
                    index.col = j;
                }
            }
        }
        return {max,index};
    }
    static minValue(A){
        var min = A.matrix[0][0];
        var index = {row:0,col:0};
        for(let i = 0; i < A.rows; i++){
            for(let j=0; j < A.cols; j++){
                if(A.matrix[i][j] < min){
                    min = A.matrix[i][j];
                    index.row = i;
                    index.col = j;
                }
            }
        }
        return {min,index};
    }
    static add(A,B){
        if(!(A instanceof Matrix && B instanceof Matrix)){
            throw "A our B isn't a Matrix";
        }else if(!(A.rows == B.rows && A.cols == B.cols)){
            throw "Number of rows and columns of A and B are different";
        }
        const func = (i,j) => {
            return A.matrix[i][j] + B.matrix[i][j];
        }
        return  new Matrix(A.rows,A.cols,func);
    }
    static mult(A,B){
        if(!(A instanceof Matrix && B instanceof Matrix)){
            throw "A our B isn't a Matrix";
        }else if(A.cols != B.rows){
            throw "Number of columns from A is different from Number of rows from B";
        }
        const func = (i,j) => {
            var value = 0
            for(let k = 0; k< A.cols; k++){
               value += A.matrix[i][k]*B.matrix[k][j];
            }
            return value;
        }
        return new Matrix(A.rows,B.cols,func);
    }
    static ones(rows,cols){
        const func = () => 1;
        return new Matrix(rows,cols,func);
    }
    static indentity(rows){
        const func = (i,j) => i==j ? 1:0;
        return new Matrix(rows,rows,func);
    }
    static random(rows,cols,min=0,max=1){
        const dv = max-min;
        const func = () =>  Math.random()*dv + min;
        return new Matrix(rows,cols,func);
    }
    static randomInt(rows,cols,min,max){    
        const dv = max-min;
        const func = () =>  Math.floor(Math.random()*dv + min);
        return new Matrix(rows,cols,func);
    }
    static rotate(ang){
        var sin = Math.sin(ang);
        var cos = Math.cos(ang);
        var matrix = 
        [ [ cos, sin],
          [-sin, cos] ];
        return new Matrix(2,2,(i,j) => matrix[i][j]);
    }
    static rotateT(ang){
        var sin = Math.sin(ang);
        var cos = Math.cos(ang);
        var matrix = 
        [ [ cos,-sin],
          [ sin, cos] ];
        return new Matrix(2,2,(i,j) => matrix[i][j]);
    }
}