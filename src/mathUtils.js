class Vector {
    constructor(x, y, z, w) { 
        if(typeof x === "object") {
            this.pos = x;
        }else{
            this.pos = [];
            this.pos.push(x);
            if(y !== undefined) this.pos.push(y);
            if(z !== undefined) this.pos.push(z);
            if(w !== undefined) this.pos.push(w);
        }
        this.dim = this.pos.length;
    }
    get x() { return this.pos[0]; }
    get y() { return this.pos[1]; }
    get z() { return this.pos[2]; }
    get w() { return this.pos[3]; }

    set x(x) { this.pos[0] = x; }
    set y(y) { this.pos[1] = y; }
    set z(z) { this.pos[2] = z; }
    set w(w) { this.pos[3] = w; }

    add(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        let pos = [];
        for(let i = 0; i < this.dim; i++) {
            pos.push(this.pos[i] + v.pos[i]);
        }
        return new Vector(pos);
    }
    sub(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        let pos = [];
        for(let i = 0; i < this.dim; i++) {
            pos.push(this.pos[i] - v.pos[i]);
        }
        return new Vector(pos);
    }
    mul(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        let pos = [];
        for(let i = 0; i < this.dim; i++) {
            pos.push(this.pos[i] * v.pos[i]);
        }
        return new Vector(pos);
    }
    div(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        let pos = [];
        for(let i = 0; i < this.dim; i++) {
            pos.push(this.pos[i] / v.pos[i]);
        }
        return new Vector(pos);
    }
    scale(s) {
        let pos = [];
        for(let i = 0; i < this.dim; i++) {
            pos.push(this.pos[i] * s);
        }
        return new Vector(pos);
    }
    dot(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        let dot = 0;
        for(let i = 0; i < this.dim; i++) {
            dot += this.pos[i] * v.pos[i];
        }
        return dot;
    }
    cross(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        if(this.dim == 2){
            return this.x * v.y - this.y * v.x;
        }
        if(this.dim == 3){
            return new Vector(
                this.y * v.z - this.z * v.y,
                this.z * v.x - this.x * v.z,
                this.x * v.y - this.y * v.x
            );
        }
        throw new Error("Cross product is only defined for 2D and 3D vectors");
    }
    mag() {
        let mag = 0;
        for(let i = 0; i < this.dim; i++) {
            mag += this.pos[i] * this.pos[i];
        }
        return Math.sqrt(mag);
    }
    mag2() {
        let mag = 0;
        for(let i = 0; i < this.dim; i++) {
            mag += this.pos[i] * this.pos[i];
        }
        return mag;
    }
    norm() {
        let mag = this.mag();
        let pos = [];
        for(let i = 0; i < this.dim; i++) {
            pos.push(this.pos[i] / mag);
        }
        return new Vector(pos);
    }
    copy() {
        return new Vector(this.pos.slice());
    }
    matMult(m) {
        if(m.cols !== this.dim) throw new Error("Matrix dimensions do not match: " + this.dim + " != " + m.cols);
        let pos = [];
        for(let i = 0; i < m.rows; i++) {
            let sum = 0;
            for(let j = 0; j < m.cols; j++) {
                sum += this.pos[j] * m.data[i][j];
            }
            pos.push(sum);
        }
        return new Vector(pos);
    }

    toString() {
        return "(" + this.pos.join(", ") + ")";
    }

    // capital letters are for in-place operations
    Add(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        for(let i = 0; i < this.dim; i++) {
            this.pos[i] += v.pos[i];
        }
        return this;
    }
    Sub(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        for(let i = 0; i < this.dim; i++) {
            this.pos[i] -= v.pos[i];
        }
        return this;
    }
    Mul(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        for(let i = 0; i < this.dim; i++) {
            this.pos[i] *= v.pos[i];
        }
        return this;
    }
    Div(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        for(let i = 0; i < this.dim; i++) {
            this.pos[i] /= v.pos[i];
        }
        return this;
    }
    Scale(s) {
        for(let i = 0; i < this.dim; i++) {
            this.pos[i] *= s;
        }
        return this;
    }
    Cross(v) {
        if(v.dim !== this.dim) throw new Error("Vector dimensions do not match: " + this.dim + " != " + v.dim);
        if(this.dim == 3){
            this.x = this.y * v.z - this.z * v.y;
            this.y = this.z * v.x - this.x * v.z;
            this.z = this.x * v.y - this.y * v.x;
            return this;
        }
        throw new Error("This function is only defined for 3D vectors");
    }
    Norm() {
        let mag = this.mag();
        for(let i = 0; i < this.dim; i++) {
            this.pos[i] /= mag;
        }
        return this;
    }
    MatMult(m) {
        if(m.cols !== this.dim) throw new Error("Matrix dimensions do not match: " + this.dim + " != " + m.cols);
        let pos = [];
        for(let i = 0; i < m.rows; i++) {
            let sum = 0;
            for(let j = 0; j < m.cols; j++) {
                sum += this.pos[j] * m.data[i][j];
            }
            pos.push(sum);
        }
        this.pos = pos;
        return this;
    }

    static dist(v1, v2) {
        if(v1.dim !== v2.dim) throw new Error("Vector dimensions do not match: " + v1.dim + " != " + v2.dim);
        let dist = 0;
        for(let i = 0; i < v1.dim; i++) {
            dist += (v1.pos[i] - v2.pos[i]) * (v1.pos[i] - v2.pos[i]);
        }
        return Math.sqrt(dist);
    }
    static dist2(v1, v2) {
        if(v1.dim !== v2.dim) throw new Error("Vector dimensions do not match: " + v1.dim + " != " + v2.dim);
        let dist = 0;
        for(let i = 0; i < v1.dim; i++) {
            dist += (v1.pos[i] - v2.pos[i]) * (v1.pos[i] - v2.pos[i]);
        }
        return dist;
    }

    /*static planeIntersect(planeNorm, rayPos, rayNorm) {
        if(planeNorm.dim !== 3) throw new Error("planeNorm must be a 3D vector");
        if(rayPos.dim !== 3) throw new Error("rayPos must be a 3D vector");
        if(rayNorm.dim !== 3) throw new Error("rayDir must be a 3D vector");
        let denom = planeNorm.dot(rayNorm);
        if(denom == 0) return null;
        let t = planeNorm.dot(planeNorm) / denom;
        return rayPos.add(rayNorm.scale(t));
        
    }*/
    
    static intersectDimension(dim, rayPos, rayDir){
        if(rayDir.dim != rayPos.dim) throw new Error("dimension of rayPod = "+rayPos.dim+", dimension of rayDir = "+rayDir.dim);
        if(dim != rayPos.dim) throw new Error("dim should be the last dimension of the ray | dim="+dim+", raydim="+rayPos.dim);
        let len = rayPos.pos[dim-1]/rayDir.pos[dim-1];
        return new Vector(rayPos.add(rayDir.scale(len)).pos.slice(0,-1));
    }
}


class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for(let i = 0; i < rows; i++) {
            this.data.push([]);
            for(let j = 0; j < cols; j++) {
                this.data[i].push(0);
            }
        }
    }

    static fromArray(arr) {
        let rows = arr.length;
        let cols = arr[0].length;
        let m = new Matrix(rows, cols);
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                m.data[i][j] = arr[i][j];
            }
        }
        return m;
    }
    static rotationX3D(angle) {
        let m = new Matrix(3, 3);
        m.data = [
            [1, 0, 0],
            [0, Math.cos(angle), -Math.sin(angle)],
            [0, Math.sin(angle), Math.cos(angle)]
        ];
        return m;
    }
    static rotationY3D(angle) {
        let m = new Matrix(3, 3);
        m.data = [
            [Math.cos(angle), 0, Math.sin(angle)],
            [0, 1, 0],
            [-Math.sin(angle), 0, Math.cos(angle)]
        ];
        return m;
    }
    static rotationZ3D(angle) {
        let m = new Matrix(3, 3);
        m.data = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ];
        return m;
    }

    static rotationY4D(angle){
        let m = new Matrix(4,4);
        m.data = [
            [1,0,0,0],
            [0, Math.cos(angle), Math.sin(angle), 0],
            [0, -Math.sin(angle), Math.cos(angle), 0],
            [0,0,0,1]
        ]
        return m;
    }

    static rotationX4D(angle){
        let m = new Matrix(4,4);
        m.data = [
            [Math.cos(angle),-Math.sin(angle),0,0],
            [Math.sin(angle), Math.cos(angle), 0, 0],
            [0,1,0,0],
            [0,0,0,1]
        ]
        return m;
    }

    static rotationW4D(angle){
        let m = new Matrix(4,4);
        m.data = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,Math.cos(angle),-Math.sin(angle)],
            [0,0,Math.sin(angle), Math.cos(angle)],
            
        ]
        return m;
    }
}