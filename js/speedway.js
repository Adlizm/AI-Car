var speedWay = [];
speedWay[0] = [[125, 24],[125, 24],[86, 18],[41, 34],[17, 79],[16, 138],[16, 248],[15, 306],[28, 330],[52, 343],[140, 343],[247, 344],[331, 341],[379, 341],[398, 320],[428, 279],[435, 270],[440, 294],[457, 321],[490, 339],[539, 336],[569, 314],[585, 278],[587, 245],[586, 206],[586, 161],[587, 117],[586, 70],[585, 43],[566, 20],[523, 15],[436, 17],[379, 16],[325, 17],[268, 15],[211, 17],[190, 17],[156, 51],[146, 42],[122, 25]];
speedWay[1] = [[87, 79],[87, 79],[70,85],[55, 98],[52, 114],[52, 153],[54, 195],[53, 235],[54, 273],[54, 285],[64, 293],[114, 294],[156, 293],[194, 294],[254, 293],[305, 293],[339, 294],[348, 293],[358, 281],[390, 240],[414, 209],[436, 178],[450, 160],[465, 141],[460, 139],[428, 159],[400, 168],[379, 169],[372, 214],[353, 250],[329, 269],[301, 278],[277, 278],[257, 270],[242, 263],[223, 242],[221, 240],[195, 241],[168, 241],[157, 252],[132, 263],[94, 253],[76, 231],[71, 187],[84, 159],[101, 140],[113, 133],[117, 107],[110, 88],[86, 78],[87, 79]];
speedWay[2] = [[166, 116],[164, 140],[155, 164],[144, 179],[131, 188],[116, 195],[122, 206],[138, 201],[142, 186],[172, 184],[203, 182],[203, 183],[203, 158],[214, 125],[236, 95],[270, 77],[313, 77],[342, 92],[358, 108],[376, 110],[403, 105],[425, 98],[454, 76],[479, 68],[516, 87],[531, 119],[531, 148],[517, 179],[500, 195],[482, 205],[479, 238],[478, 262],[485, 283],[504, 296],[525, 297],[542, 281],[548, 267],[547, 236],[547, 207],[546, 180],[547, 149],[547, 119],[547, 95],[547, 75],[543, 64],[511, 62],[454, 61],[402, 61],[354, 62],[300, 62],[265, 62],[231, 63],[219, 64],[190, 93],[166, 115]];
speedWay[3] = [[291, 130],[291, 130],[271, 137],[252, 163],[253, 192],[266, 213],[294, 224],[320, 210],[331, 190],[331, 164],[320, 145],[296, 130],[296, 130]];

function lineIsCollide(x0, y0, x1, y1){
	var dx = Math.abs(x1 - x0)
	var dy = Math.abs(y1 - y0)

    var sx = x0 < x1 ? 1 : -1; 
    var sy = y0 < y1 ? 1 : -1;
    var err = dx > dy ? dx/2 : -dy/2;

	while(true){
        if(x0 == x1 && y0 == y1){
            return false;
        }
        if(validsPosition[y0][x0] == 0 || distances[y0][x0] > distanceToDie){
            return true;
        }
        let e2 = err;
        if(e2 > -dx){
            err-=dy;
            x0+=sx;
        }
        if(e2 < dy){
            err+= dx;
            y0+=sy;
        }
    }
}
function getDistanceRaycast(x0, y0, x1, y1){
    var dist = 0;
	var dx = Math.abs(x1 - x0)
	var dy = Math.abs(y1 - y0)

    var sx = x0<x1 ? 1 : -1; 
    var sy = y0<y1 ? 1 : -1;
    var err = dx>dy ? dx/2 : -dy/2;
    //ctx.fillStyle = "rgba(255,0,0,0.2)"; //retira os comentarios para desenhar os raios
	while(true){
        if(!validsPosition[y0][x0] || x0 >= Width || x0 < 0 || y0 >= Height || y0 < 0){
            break;
        }
        let e2 = err;
        if(e2 > -dx){
            err-=dy;
            x0+=sx;
        }
        if(e2 < dy){
            err+= dx;
            y0+=sy;
        }
        dist++;
        //ctx.fillRect(x0-1,y0-1,3,3)
    }
    return dist;
}          
function Curve(points){
	var p = 100;
	var increment = 1/p
	var length = points.length;
	var nCurves = length - 3;
	var x0 = points[0][0]
    var y0 = points[0][1]
    ctx.beginPath();
    ctx.moveTo(x0,y0);
	for(let c = 0 ; c < nCurves; c++){
		let t = 0;
        let x1 = points[c][0];
        let x2 = points[c+1][0];
        let x3 = points[c+2][0];
        let x4 = points[c+3][0];
        let y1 = points[c][1];
        let y2 = points[c+1][1];
        let y3 = points[c+2][1];
        let y4 = points[c+3][1];
		for(let i = 0; i < p; i++){
			let t2 = t*t;
			let t3 = t2 * t;

			let x = ((-t3 + 3*t2 - 3*t + 1)*x1 + (3*t3 - 6*t2 + 4)*x2 + (-3*t3 + 3*t2 + 3*t + 1)*x3+ t3*x4)/6;
			let y = ((-t3 + 3*t2 - 3*t + 1)*y1 + (3*t3 - 6*t2 + 4)*y2 + (-3*t3 + 3*t2 + 3*t + 1)*y3+ t3*y4)/6;
			x = Math.floor(x);
			y = Math.floor(y);

			ctx.lineTo(x,y);
			t = t + increment;
        }
    }
    ctx.closePath();
}
function drawSpeedWay(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,Width,Height);
    var index = 0;
    for(let points of speedWay){
        if(index == 0){
            ctx.fillStyle = "#fff";
        }else{
            ctx.fillStyle = "#000";
        }
        Curve(points);
        ctx.fill();
        index++;
    }
    ctx.fillRect(545,180,42,15);
}
function getPositionsValids(){
    var validsPosition = [];
    drawSpeedWay();
    let img = ctx.getImageData(0,0,Width,Height);
    for(let i = 0; i < Height; i++){
        validsPosition[i] = [];
        for(let j = 0; j < Width; j++){
            validsPosition[i][j] = img.data[(i*Width+j)*4] == 0 ? 0:1;
        }
    }
    return validsPosition;
}
function getDistances(posValids,end){
    var distances = [];
    for(let i = 0; i < Height; i++){
        distances[i] = [];
        for(let j = 0; j < Width; j++){
            distances[i][j] =  posValids[i][j] ? undefined : -1;
        }
    }
    var row = [{x:end.x,y:end.y}];
    distances[end.y][end.x] = 0;
    while(row.length != 0){
        node = row[0];
        row.splice(0,1);
        
        if(distances[node.y+1][node.x] == undefined){
            distances[node.y+1][node.x] = distances[node.y][node.x]+1;
            row.push({y:node.y+1,x:node.x});   
        }
        if(distances[node.y-1][node.x] == undefined){
            distances[node.y-1][node.x] = distances[node.y][node.x]+1;
            row.push({y:node.y-1,x:node.x});   
        }
        if(distances[node.y][node.x+1] == undefined){
            distances[node.y][node.x+1] = distances[node.y][node.x]+1;
            row.push({y:node.y,x:node.x+1});   
        }
        if(distances[node.y][node.x-1] == undefined){
            distances[node.y][node.x-1] = distances[node.y][node.x]+1;
            row.push({y:node.y,x:node.x-1});   
        }
    }
    return distances;
}