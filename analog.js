var canvas= document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var radius = canvas.height/2;
ctx.translate(radius,radius);
radius = radius * 0.90;
setInterval(drawclock, 1000);

function drawclock() {
    drawface(ctx,radius);
    drawnumbers(ctx,radius);
    drawtime(ctx,radius);
}

//_____display clockface____
function drawface(ctx,radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    var grad;
    grad = ctx.createRadialGradient(0,0,radius*0.9,0,0,radius*1);
    grad.addColorStop(0,'white');
    grad.addColorStop(0.5,'black');
    grad.addColorStop(1,'black');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0,0,radius*0.08,0,2*Math.PI)
    ctx.fillStyle= 'white'
    ctx.fill();
}

//____display numbers_____
function drawnumbers(ctx,radius) {
    var ang;
    var num;
    ctx.textAling = "center";
    ctx.font= radius*0.1 + "px poppinst";
    ctx.textBaseline = "middle"
    for (num=1;num<13;num++){
        ang = num * Math.PI/6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(),0,0)
        ctx.rotate(ang);
        ctx.translate(0,radius *0.85);
        ctx.rotate(-ang);
    }
}

//_____calculate time_____
function drawtime(ctx,radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
// ____hour____
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawhand(ctx,hour,radius*0.5,radius*0.07);
// ___minute____
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawhand(ctx,minute,radius*0.76,radius*0.06);
// ____second____
    second = (second*Math.PI/30);
    drawhand(ctx,second,radius*0.9,radius*0.02);
}

//____display hands_____
function drawhand(ctx, pos,length,width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}