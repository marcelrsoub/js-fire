import Fire from "./module";

window.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById("view") as HTMLCanvasElement;
    if (canvas) {
        const fire = new Fire(canvas);
        fire.init();
    }
});
