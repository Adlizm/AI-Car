class Population{
    constructor(size,mutationRate,reprodutionRate){
        this.size = size;
        this.mutationRate = mutationRate;
        this.reprodutionRate = reprodutionRate;
        this.allDeath = false;
        this.best = undefined;
        this.geracion = 0;
        this.cars = [];
        this.velLeaser = 1;
        for(let i = 0; i<size; i++){
            this.cars.push(new Car(begin,Math.PI));
        }
    }
    getBestCar(){
        if(!this.best){
            this.best = this.cars[0];
        }
        this.best = this.cars.reduce((best,car) => {
            return best.fitness >= car.fitness ? best : car;
        },this.best);
    }
    calcAllFitness(){
        let sum = 0;
        for(let car of this.cars){
            sum += car.calcFitness();
        }
        return sum;
    }
    mutate(car){
        for(let weigth of car.neural.weight){
            for(let i = 0; i < weigth.rows; i++){
                for(let j = 0; j < weigth.cols; j++){
                    if(Math.random() < this.mutationRate){
                        let num = Math.floor(Math.random()*200 - 100);
                        weigth.matrix[i][j] = num;
                    }
                }
            }
        }
    }
    getParent(num){
        for(let car of this.cars){
            num -= car.fitness;
            if(num <= 0){
                return car;
            }
        }
    }
    newPopulation(){
        let newCars = [];
        let sum = this.calcAllFitness();
        this.getBestCar();
        newCars.push(this.best.copy());
        for(let i = 1; i < this.size; i++){
            if(Math.random() > this.reprodutionRate)
                continue;
            let num = Math.floor(Math.random()*sum);
            let mother = this.getParent(num);
            let child = new Car(begin,this.best.angleOfVision, 
                NeuralNet.crossover(this.best.neural,mother.neural));
            this.mutate(child);
            newCars.push(child);
        }
        this.cars = newCars;
        this.size = newCars.length;
    }
    UpdateDraw(){
        if(this.allDeath){
            this.newPopulation();
            this.geracion++;
            this.allDeath = false;
            this.velLeaser = 1;
            distanceToDie = distanceToBegin+20;
        }else{
            this.allDeath = true;
            for(let car of this.cars){
                car.update();
                car.draw();
                if(!car.isDeath){
                    this.allDeath = false;
                }
            }
            this.velLeaser += 0.02;
            distanceToDie = Math.floor(distanceToDie - this.velLeaser) ;
            ctx.fillStyle = "#0ff";
            for(let y = 0; y < Height; y++){
                for(let x = 0; x < Width; x++){
                    if(distances[y][x] == distanceToDie){
                        ctx.fillRect(x-1,y-1,3,3);
                    }
                }
            }
        }
    }
}