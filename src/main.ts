import Fire from "./module";

const canvas = document.getElementById("view") as HTMLCanvasElement;
if (canvas) {
	const fire = new Fire(canvas);
	fire.init();
}
