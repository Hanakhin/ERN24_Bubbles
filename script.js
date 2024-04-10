console.log('tesssssst')

const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random(min,max){
    return Math.floor(Math.random()*(max - min + 1))+min;
}

function randomColor(){
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
}

class Ball {
    constructor(x,y,velX,velY,color,size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color;
        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            2*Math.PI
        )
        
        ctx.fill();

    }

    update(){
        if((this.x + this.size) >= width){
            this.velX = -(this.velX)
        }
        if((this.x - this.size)<=0){
            this.velX = Math.abs(this.velX)
        }

        if((this.y + this.size)>=height){
            this.velY = -(this.velY)
        }
        if((this.y - this.size)<=0){
            this.velY= Math.abs(this.velY)
        }

        this.x += this.velX;
        this.y += this.velY;
    }
    collisionDetection(){

        for(const ball of balls){
            if(this !== ball){
                const dx = this.x - ball.x;
                const dy = this.x - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if(distance < this.size + ball.size ){
                    this.velX = -this.velX;
                    this.velY = -this.velY;
                    ball.velX = -ball.velX;
                    ball.velY = -ball.velY;

                    ball.color = this.color = randomColor();
                }
            }
        }
    }

}

const balls = [];

while(balls.length < 40){
    const size = random(2, 10)
    const vitesseX = random(-10, 10)
    const vitesseY = random(-10, 10)
    const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    vitesseX === 0 ? 1 : vitesseX,
    vitesseY === 0 ? 1 : vitesseY,
    randomColor(),
    size
    );
    balls.push(ball)
}


function loop(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(
        0,
        0,
        width,
        height
    );

    for(const ball of balls ){
        ball.draw();
        ball.update();
        ball.collisionDetection();
    }

    requestAnimationFrame(loop)
}
console.log(balls)
loop();