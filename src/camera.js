class Camera3D {
    constructor() {
        this.pos = new Vector(-10,0,0);
        this.norm = new Vector(1,0,0);
        this.focalLength = 0.5;
    }
    projectPoint(v) {
        let dv = v.sub(this.pos);
        let sensorHit = Vector.planeIntersect(this.norm, this.pos.add(this.norm.scale(this.focalLength)), dv.norm());

        // use x coord for depth
        sensorHit.x = dv.mag();
        
        return sensorHit;
    }
}