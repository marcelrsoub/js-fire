class Fire {
	canvas: HTMLCanvasElement;
	mouse_x!: number;
	mouse_y!: number;
	ctx: CanvasRenderingContext2D;
	size: number;
	currentFrame: number;
	particles: Particle[];

	constructor(canvas: HTMLCanvasElement) {
		this.size = 20;
		this.mouse_x = 150;
		this.mouse_y = 150;
		this.currentFrame = 0;
		this.particles = [];

		// make canvas fill up parent div
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		canvas.style.display = "block"; // no scrollbars

		this.canvas = canvas;
		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	}

	init() {
		this.mouseTracker();
		requestAnimationFrame(() => this.render());
	}

	mouseTracker() {
		window.addEventListener("mousemove", (event) => {
			this.mouse_x = event.x;
			this.mouse_y = event.y;
		});
		window.addEventListener("touchmove", (event) => {
			this.mouse_x = event.touches[0].pageX;
			this.mouse_y = event.touches[0].pageY;
		});
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	render() {
		this.clearCanvas();

		// draw particles
		if (this.particles.length < 100) {
			this.particles.push(new Particle(this.mouse_x, this.mouse_y, this.size));
		} else {
			this.particles.shift();
			this.particles.push(new Particle(this.mouse_x, this.mouse_y, this.size));
		}

		this.particles.forEach((particle) => particle.render(this.ctx));

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
	render(ctx: CanvasRenderingContext2D) {
		const numOfSeconds = 1;
		const numOfFrames = numOfSeconds * 60;
		const currTime = new Date().getTime();
		const frame = ((currTime - this.init_time) / 1000) * numOfFrames; // from ms to frame number
		ctx.fillStyle = `rgb(250,${200 * (1 - frame / numOfFrames)},0,${
			1 - frame / numOfFrames
		})`;
		ctx.beginPath();

		const randomNumber = Math.random();

		ctx.arc(
			this.init_x + (frame / numOfFrames) * Math.sin(frame * randomNumber) * 2,
			this.init_y - frame * 2,
			this.init_size * Math.abs(1 - frame / numOfFrames),
			0,
			2 * Math.PI
		);
		ctx.fill();
	}
}

export default Fire;
