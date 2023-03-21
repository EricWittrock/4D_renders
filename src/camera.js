class Camera3D {
    constructor() {
        this.pos = new Vector(0,0,-4); // apeture position
        this.focalLength = 4;
    }
    projectPoint(v) {
        let dv = v.sub(this.pos); // vector from apeture to point

        // TODO get focal length to work
        //let sensorHit = Vector.planeIntersect(this.norm, this.pos.add(this.norm.scale(this.focalLength)), dv.norm());

        let sensorHit = Vector.intersectDimension(3, dv.add(this.pos.scale(-this.focalLength)), dv.norm().scale(-1))

        // use x coord for depth
        //sensorHit.x = dv.mag();

        return sensorHit;
    }
}