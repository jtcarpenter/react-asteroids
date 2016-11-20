export function hitTest(obj1, obj2) {
    var xDist = obj1.pos.x - obj2.pos.x;
    var yDist = obj1.pos.y - obj2.pos.y;
    var dist = Math.sqrt(xDist * xDist + yDist * yDist);
    if (dist < obj1.radius + obj2.radius) {
        return true;
    }
    return false;
}

export function randomNumInRange(min, max) {
    return Math.random() * (max - min) + min;
}

export function calcXDist(rotation, distance) {
    return Math.cos(rotation * Math.PI / 180) * distance;
}

export function calcYDist(rotation, distance) {
    return Math.sin(rotation * Math.PI / 180) * distance;
}

export let screen = {
    _width: null,
    _height: null,

    get width() {
        if (!this._width) {
            this.resize();
        }
        return this._width;
    },

    get height() {
        if (!this._height) {
            this.resize();
        }
        return this._height;
    },

    resize: function() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
    }
}
