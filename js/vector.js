class Vector{
	constructor(x=0,y=0){
		this.x = x;
		this.y = y;
	}
	add(vector){
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}
	sub(vector){
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}
	mult(scale){
		this.x *= scale;
		this.y *= scale;
		return this;
	}
	limit(number){
		if(this.length() > number){
			this.normalize().mult(number);
		}
		return this;
	}
	div(scale){
		this.x /= scale;
		this.y /= scale;
		return this;
	}
	copy(){
		var copy = new Vector(this.x,this.y);
		return copy;
	}
	length(){
		var tam = this.x*this.x + this.y*this.y;
		return Math.sqrt(tam);
	}
	normalize(){
		this.div(this.length());
		return this;
	}
	getAngle(){
		let len = this.length();
		let cos = this.x/len;
		let ang = Math.acos(cos);
		return this.y >= 0 ? ang: -ang;	//considerando que o eixo y é invertido
	}
	PScalar(vector){
		return this.x*vector.x + this.y*vector.y;
	}
	static ang(t){
		return new Vector(Math.cos(t),Math.sin(t));
	}
}