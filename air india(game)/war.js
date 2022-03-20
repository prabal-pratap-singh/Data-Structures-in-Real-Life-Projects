function load_img(){
    enemy_img = new Image();
    enemy_img.src = "images/b.webp";


    plane_img = new Image();
    plane_img.src = "images/plane.webp";

   
    india_img = new Image();
    india_img.src = "images/i.png";
    
    object_img= new Image();
    object_img.src = "images/u6.webp";

}

function init(){
    canvas = document.getElementById("mycanvas");
    W = canvas.width = 900;
    H = canvas.height = 511;

    // To draw on canvas
    pen = canvas.getContext("2d");
    game_over = false;

    e1 = {
		x : 200,
		y : 50,
		w : 50,
		h : 50,
		speed : 40,
	};
	e2 = {
		x : 400,
		y : 150,
		w : 50,
		h : 50,
		speed : 60,
	};
	e3 = {
		x : 600,
		y : 20,
		w : 50,
		h : 50,
		speed : 80,
	};
    
    enemy = [e1,e2,e3];

    plane = {
		x : 20,
		y : H/2,
		w : 100,
		h : 70,
		speed : 40,
        moving  : false,
        health : 100,
	};
    
	india = {
		x : W-100,
		y : H/2,
		w : 100,
		h : 120,
        };
        object={
                x : 10,
                y : H-90,
                w : 100,
                h : 90,
         };
    
    // When we click the mouse
    canvas.addEventListener("mousedown", function(){ plane.moving = true;})

    // When we release our click from the mouse
    canvas.addEventListener("mouseup", function(){
        plane.moving = false;
    })
}

function isOverlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y) {
    return true
    }
    
    return false;
    
}

function draw(){
    // To erase previous frame
    pen.clearRect(0, 0, W, H);

    // To display all enemies
    for (var i = 0; i < enemy.length; i++){
        pen.drawImage(enemy_img, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }

    //draw the player
    pen.drawImage(plane_img, plane.x, plane.y, plane.w, plane.h);

    //draw the gem
    pen.drawImage(india_img, india.x, india.y, india.w, india.h);

   //draw object
    pen.drawImage(object_img, object.x, object.y, object.w, object.h);
}

function update(){

    
    if (plane.moving == true){
        plane.x += plane.speed;
    }

    
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(enemy[i],plane)){
            plane.health -= 50;
            if(plane.health>=50){
               console.log(plane.health);
               game_over = false;
               alert("everyone dies!......pls try again")
               init();
            }
            if(player.health <0){
                console.log(plane.health);
                game_over = true;
                alert("Game Over" + plane.health);
            }
        }
    }
    
    //overlap overlap
    if(isOverlap(plane,india)){
        
        console.log("You Won");
        alert("You landed successfully!");
        game_over = true;
        return;
    }

    // move the box downwards
    // update each enemy by same logic
    for (var i = 0; i < enemy.length; i++){
        enemy[i].y += enemy[i].speed;

        if (( enemy[i].y >= (H-enemy[i].h) ) || ( enemy[i].y < 0 )){
            enemy[i].speed *= -1;
        }
    }
}

function gameloop(){
    if(game_over == true){
        clearInterval(f);
    }
    draw();
    update();
}

load_img();
init();

var f = setInterval(gameloop, 100);