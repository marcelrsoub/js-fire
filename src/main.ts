import Fire from "./module";


const canvas = document.getElementById("view") as HTMLCanvasElement;

const fire = new Fire(canvas);
fire.init();
