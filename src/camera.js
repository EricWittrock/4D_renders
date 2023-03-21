class Camera3D {
    constructor() {
        this.pos = new Vector(-10,0,0); // apeture position
        this.norm = new Vector(1,0,0);
        this.focalLength = 0.5;
    }
    projectPoint(v) {
        let dv = v.sub(this.pos); // vector from apeture to point

        // TODO get focal length to work
        //let sensorHit = Vector.planeIntersect(this.norm, this.pos.add(this.norm.scale(this.focalLength)), dv.norm());

        let sensorHit = Vector.intersectDimension(3, v, dv.norm().scale(-1))

        // use x coord for depth
        //sensorHit.x = dv.mag();

        return sensorHit;
    }
}