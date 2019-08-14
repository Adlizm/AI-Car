class Car{
    constructor(pos,angleOfVision,neural){
        this.pos = new Vector(pos.x,pos.y);
        this.vel = new Vector(0,-1);
        this.acc = new Vector(0,-1);
        this.angleOfVision = angleOfVision;
        this.qntRays = shape[0] -1;
        this.tetha = this.vel.getAngle();
        this.width = 20;
        this.height = 12;
        this.rays = [];
        let wid = this.width/2,hei = this.height/2;
        this.vertexs = [
            [-wid,-hei],
            [ wid,-hei],
            [ wid, hei],
            [-wid, hei]
        ];

        let dt = this.angleOfVision/this.qntRays;
        let initAng = this.tetha - this.angleOfVision/2 + dt/2;
        for(let i = 0; i < this.qntRays; i++){
            this.rays[i] = new Ray(this.pos,initAng);
            initAng += dt;
        }
        this.neural = neural ? neural: new NeuralNet(shape);
        this.isDeath = false;
        this.fitness;
    }
    update(){
        if(!this.isDeath){
            let ang = this.vel.getAngle();
            let values = this.getValues()           //pega distancias de cada ray a parede  
            let predict = this.prediction(values);  //usa rede neural com base nos valores das distancias                  
            this.setDirection(predict);             //altera a velocidade, angulo e posicao do carro
            
            this.vel.add(this.acc);
            this.vel.limit(3);
            this.tetha = this.vel.getAngle();
            this.pos.add(this.vel);

            this.updateRays(this.tetha - ang);      //alterar os rays para uma nova direção
            

            this.pos.add(this.vel);
            let vertexs = this.getVertexs();        //pega os vertices do carro com nova rotação e posição
            if(this.isCollided(vertexs)){
                this.isDeath = true;
            }
        }
    }
    copy(){
        return new Car(begin,this.angleOfVision,this.neural.copy());
    }
    setDirection(index){
        let direct;
        if(index == 0){                                 //A
            direct = Vector.ang(this.tetha - Math.PI/2) 
        }else if(index == 1){                           //W
            direct = Vector.ang(this.tetha);
        }else if(index == 2){                           //D
            direct = Vector.ang(this.tetha + Math.PI/2);
        }else{                                          //S
            direct = Vector.ang(-this.tetha);
        }
        this.acc = direct.mult(0.5);
    }
    isCollided(vertexs){
        for(let i = 0; i<4 ;i++){
            let nextIndex = (i+1)%4;
            if(lineIsCollide(vertexs[i][0],vertexs[i][1],vertexs[nextIndex][0],vertexs[nextIndex][1])){
                return true;
            }
        }
        return false;
    }
    getValues(){
        let values = [];
        for(let ray of this.rays){
            values.push(ray.getDistance());
        }
        values.push(this.vel.length());
        return values;
    }
    calcFitness(){
        let y = Math.floor(this.pos.y), x = Math.floor(this.pos.x);
        let dist = distances[y][x];
        let fit = (distanceToBegin - dist);
        this.fitness = fit <= 0 ? 0: Math.floor(Math.pow(fit,1.5));
        
        return this.fitness;
    }
    updateRays(dt){
        for(let ray of this.rays){
            ray.setRay(dt,this.pos);
        }
    }
    getVertexs(){
        let matVertex = new Matrix(4,2,(i,j) => this.vertexs[i][j] );
        let matRotate = Matrix.rotateT(this.tetha);  
        let vertexs = Matrix.mult(matVertex,matRotate);
        for(let i = 0; i < vertexs.rows; i++){
            vertexs.matrix[i][0] = Math.floor(vertexs.matrix[i][0] + this.pos.x);
            vertexs.matrix[i][1] = Math.floor(vertexs.matrix[i][1] + this.pos.y);
        }
        return vertexs.matrix;
    }
    prediction(value){
        let predict = this.neural.prediction(value);
        let {index} = predict.maxValue();
        return index.col;
    }
    draw(){
        if(!this.isDeath){
            ctx.save();
            ctx.translate(this.pos.x,this.pos.y);
            ctx.rotate(this.tetha);
            ctx.drawImage(carImg,-this.width/2,-this.height/2,this.width,this.height);
            ctx.restore();
        }
    }
}