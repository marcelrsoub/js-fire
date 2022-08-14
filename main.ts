/*
TODO: 8bit style circle at the center
TODO: particles flowing up from fire source
*/

class Fire {
	canvas: HTMLCanvasElement;
	cv_width!: number;
	cv_height!: number;
	mouse_x!: number;
	mouse_y!: number;
	ctx: CanvasRenderingContext2D;
	size: number;
	currentFrame: number;
	particles: Particle[];

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.size = 20;
		this.mouse_x = 150;
		this.mouse_y = 150;
		this.currentFrame = 0;
		this.particles = [];
		this.init();
	}

	init() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.cv_width = this.canvas.width;
		this.cv_height = this.canvas.height;
		this.mouseTracker();
		requestAnimationFrame(() => this.render());
	}

	mouseTracker() {
		this.canvas.addEventListener("mousemove", (event) => {
			this.mouse_x = event.x;
			this.mouse_y = event.y;
			// this.clearCanvas();
			// this.renderSource(mouse_x, mouse_y);
		});
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.cv_width, this.cv_height);
	}

	render() {
		this.clearCanvas();
		if (this.currentFrame >= 60) {
			this.currentFrame = 0;
			// this.particles = [];
		}
		//draw source
		this.ctx.fillStyle = "orange";
		this.ctx.beginPath();
		this.ctx.arc(this.mouse_x, this.mouse_y, this.size, 0, 2 * Math.PI);
		this.ctx.fill();

		// draw particles
		if (this.particles.length < 100) {
			this.particles.push(new Particle(this.mouse_x, this.mouse_y, this.size));
		} else {
			this.particles.shift();
			this.particles.push(new Particle(this.mouse_x, this.mouse_y, this.size));
		}
		this.particles.forEach((particle) =>
			particle.render(this.currentFrame, this.ctx)
		);

		// this.drawParticle(this.mouse_x, this.mouse_y);

		this.currentFrame += 1;
		requestAnimationFrame(() => this.render());
	}
}

class Particle {
	init_x: number;
	init_y: number;
	init_time: number;
	init_size: number;

	constructor(init_x: number, init_y: number, init_size: number = 20) {
		this.init_x = init_x + 3 * Math.random();
		this.init_y = init_y;
		this.init_time = new Date().getTime();
		this.init_size = init_size;
	}
	render(currentFrame: number, ctx: CanvasRenderingContext2D) {
		const currTime = new Date().getTime();
		const frame = ((currTime - this.init_time) / 1000) * 60;
		ctx.fillStyle = `rgb(250,${250 - (frame / 60) * 250},0,${1 - frame / 60})`;
		ctx.beginPath();

		const randomNumber = Math.random();

		ctx.arc(
			this.init_x + Math.sin((frame / 4) * randomNumber),
			this.init_y - (frame * this.init_size) / 7,
			this.init_size / (frame / 20 + 1),
			0,
			2 * Math.PI
		);
		ctx.fill();
	}
}

const canvas = document.getElementById("view") as HTMLCanvasElement;

const fire = new Fire(canvas);
