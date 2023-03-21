class Camera3D {
    constructor() {
        this.pos4 = new Vector(0,0,-2,-3); // apeture position
        this.pos = new Vector(0,0,-4); // apeture position
        this.focalLength = 4;
    }
    projectPoint(v) {
        //let dv = v.sub(this.pos); // vector from apeture to point
        let dv4 = v.sub(this.pos4); // vector from apeture to point

        // TODO get focal length to work
        //let sensorHit = Vector.planeIntersect(this.norm, this.pos.add(this.norm.scale(this.focalLength)), dv.norm());

        let cubeHit = Vector.intersectDimension(4, dv4.add(this.pos4.scale(-this.focalLength)), dv4.norm().scale(-1))
        cubeHit.Scale(1).Add(new Vector(0,0,0));
        let dv = cubeHit.sub(this.pos);
        let planeHit = Vector.intersectDimension(3, dv.add(this.pos.scale(-this.focalLength)), dv.norm().scale(-1))

        // use x coord for depth
        //sensorHit.x = dv.mag();

        return planeHit;
    }
}