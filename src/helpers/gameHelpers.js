export function hitTest(obj1, obj2) {
    var xDist = obj1.pos.x - obj2.pos.x;
    var yDist = obj1.pos.y - obj2.pos.y;
    var dist = Math.sqrt(xDist * xDist + yDist * yDist);
    if (dist < obj1.radius + obj2.radius) {
        return true;
    }
    return false;
}
