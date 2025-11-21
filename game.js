const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

function loop(){
    ctx.fillStyle="#87CEFA";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="black";
    ctx.font="40px Arial";
    ctx.fillText("🐧 Penguin Coop Demo",50,80);
    requestAnimationFrame(loop);
}
loop();