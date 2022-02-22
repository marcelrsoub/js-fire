"use strict";
/*
TODO: 8bit style circle at the center
DONE: circle around mouse being tracked
TODO: particles flowing up from fire source
*/
class Fire {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.setupCanvas();
        this.size = 10;
    }
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cv_width = this.canvas.width;
        this.cv_height = this.canvas.height;
        this.mouseTracking();
    }
    mouseTracking() {
        this.canvas.addEventListener("mousemove", (event) => {
            const mouse_x = event.x;
            const mouse_y = event.y;
            this.clearCanvas();
            this.renderSource(mouse_x, mouse_y);
        });
    }
    clearCanvas() {
        var _a;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.cv_width, this.cv_height);
    }
    renderSource(mouse_x, mouse_y) {
        if (this.ctx) {
            this.ctx.fillStyle = "cyan";
            this.ctx.beginPath();
            this.ctx.arc(mouse_x, mouse_y, this.size, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
}
const canvas = document.getElementById("view");
const fire = new Fire(canvas);