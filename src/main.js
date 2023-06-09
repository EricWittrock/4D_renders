let camera = new Camera3D();
let rotationMat = Matrix.rotationY3D(0.01);
let points = [];

function setup() {
    createCanvas(400, 400);

    /*for(let i = -1; i <= 1; i++) { // 3d cube points
        for(let j = -1; j<= 1; j++) {
            for(let k = -1; k<= 1; k++) {
                if(i*j*k == 0) continue;
                points.push(new Vector(i,j,k));
            }
        }
    }*/

    for(let i = -1; i <= 1; i++) { // 4d cube points
        for(let j = -1; j<= 1; j++) {
            for(let k = -1; k<= 1; k++) {
                for(let l = -1; l<= 1; l++) {
                    if(i*j*k*l == 0) continue;
                    points.push(new Vector(i,j,k,l));
                }
            }
        }
    }
}


function draw() {
    background(25);

    /*let projected = [];
    for(let i = 0; i < points.length; i++) {
        let p3 = points[i].matMult(Matrix.rotationY3D(frameCount/100)).matMult(Matrix.rotationX3D(frameCount/230));
        let p = camera.projectPoint(p3).scale(10).add(new Vector(200,200));
        projected.push(p);
    }*/

    let projected = [];
    for(let i = 0; i < points.length; i++) {
        let p3 = points[i].matMult(Matrix.rotationY4D(frameCount/100)).matMult(Matrix.rotationW4D(frameCount/100)).matMult(Matrix.rotationX4D(frameCount/100));
        let p = camera.projectPoint(p3).scale(3).add(new Vector(200,200));
        projected.push(p);
    }

    //projected.sort((a,b) => b.x - a.x);
    //let points2 = points.map((i,n)=>[points[n].x, points[n].y, points[n].z, projected[n].x]).sort((a,b) => b[3] - a[3]);
    //points = points2.map(i=>new Vector(i[0], i[1], i[2]));

    for(let i = 0; i < projected.length; i++) {
        let p = projected[i];
        // draw lines between adjacent points
        for(let j = 0; j < projected.length; j++) {
            if(i == j) continue;
            let p2 = points[i];
            let p3 = points[j];
            if(Vector.dist2(p2, p3) < 4.0001){

                //var grad = window.drawingContext.createLinearGradient(p.x, p.y, projected[j].x, projected[j].y);
                //grad.addColorStop(0, heatMap((p.x-3000)/2000));
                //grad.addColorStop(1, heatMap((projected[j].x-3000)/2000));
                //window.drawingContext.strokeStyle = grad;
                stroke(255);
                strokeWeight(1);

                line(p.x, p.y, projected[j].x, projected[j].y);
            }
        }
    }
}

function heatMap(lambda){
    let r = 1-lambda;
    let g = r;
    let b = r;
    return `rgb(${r*255},${g*255},${b*255})`;
}