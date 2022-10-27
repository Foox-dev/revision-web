let blobSize = 100;
let blobs = [];

let curSounds = 0;
const playSound = (sound, volume=0.5, rate=1) => {
  if(curSounds <= 3){ // only play a max of 3 sfx at once
    let aud = new Audio(`${sound}`)
    aud.autoplay = true;
    aud.src = sound;
    aud.volume = (parseFloat(volume)>1?1:parseFloat(volume)||1);
    aud.playbackRate = rate||1;
    curSounds++;
    aud.onended = function(){ aud.remove(); curSounds--; }
  }  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

class Blob {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5 + Math.random() * 50;
    this.dead = false;
  }
  run() {
    let r = atan2(height/2 - this.y, width/2 - this.x);
    this.x += cos(r) * this.size / 5;
    this.y += sin(r) * this.size / 5;
    if(dist(this.x, this.y, width/2, height/2) < blobSize/2) {
      let a1 = ((this.size / 2)*(this.size / 2)) * Math.PI;
      let a2 = ((blobSize / 2)*(blobSize / 2)) * Math.PI;
      let ans = Math.sqrt((a1 + a2)/Math.PI);
      playSound("click.mp3", 0.25)
      blobSize = ans * 2;
      this.dead = true;
    }
    fill(255, 175, 0);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size)
  }
}

let animVar = 0;
let shakeX = 0;
let shakeY = 0;
let time = 3;
let score = 0;
let speed = 0.25;
function draw() {
  if(blobSize > 0) background(255)
  translate(random(0, shakeX), random(0, shakeY));
  shakeX += -shakeX/5;
  shakeY += -shakeY/5;
  animVar += (blobSize - animVar)/10
  noStroke();
  fill(255, 175, 0);
  ellipse(width/2, height/2, animVar, animVar);


  
  textSize(50);
  stroke(0);
  fill(255);
  if(blobSize < 0) noFill();
  strokeWeight(3);
  textAlign(CENTER, CENTER);
  textFont("Impact")
  text("Click the screen", width/2, 50);
  textSize(25);
  text("You can't let Danial shrink away to nothing", width/2, 150);
  text(score, 50, height - 50);

  textAlign(CENTER, CENTER);
  if(time > 0) text(time, width/2, height/2);
  if(frameCount % 50 === 0 && time > 0) time--;

  blobs = blobs.filter(x => !x.dead);
  blobs.forEach(blob => blob.run());
  if(time === 0 && blobSize > -1) blobSize -= speed;
  if(frameCount % 25 === 0 && blobSize > 0 && time === 0) score ++;
  speed += 0.0005;

  if(blobSize < 0) {
    fill(255)
    background(0, 0, 0, 10);
    stroke(0);
    strokeWeight(5);
    text("Danial has shrinked to nothing :(\nYou got a score of " + score, width/2, height/2)
  }
}

function mouseClicked(){
  if(time > 0) return;
  let b = new Blob(mouseX, mouseY);
  playSound('click.mp3', 0.5, 2)
  shakeX = b.size/2;
  shakeY = b.size/2;
  blobs.push(b)
}