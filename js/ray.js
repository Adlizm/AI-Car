class Ray{
    constructor(pos,tetha){
        this.pos = pos;
        this.tetha = tetha;
        this.direct = this.setDirection();
    }
    setRay(dt,pos){
        this.pos = pos;
        this.tetha += dt;
        this.direct = this.setDirection();
    }
    setDirection(){
        return {
            x: Math.floor(Math.cos(this.tetha)*Diagonal + this.pos.x),
            y: Math.floor(Math.sin(this.tetha)*Diagonal + this.pos.y),
        };
    }
    getDistance(){
        let x = Math.floor(this.pos.x);
        let y = Math.floor(this.pos.y);
        return getDistanceRaycast(x,y,this.direct.x,this.direct.y);
    }
}