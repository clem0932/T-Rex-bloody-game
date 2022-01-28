const dino = document.getElementById("dino");

started = false;
score = 0;
money = 1000;
multiplier = 1;
multiplier_price = 10;
fly_price = 100;

function increase_multiplier(){
    if (money>=multiplier_price){
        multiplier *= 2;
        multiplier_str.innerHTML = 2*multiplier;
        money -= multiplier_price;
        str_money.innerHTML = money;
        multiplier_price *= 2;
        multiplier_price_str.innerHTML = multiplier_price;
    }
}

function fly(){
    if (money>=fly_price && started) {
        document.getElementById("fly").disabled = true;
        money -= fly_price;
        str_money.innerHTML = money;
        dino.classList.add("fly");
        dino.classList.add("alive");
        dino.classList.remove("grounded");
        duration = 10;
        

        
    }
}



function jump(action,timeout) {
    if (dino.classList != action && started) {
        dino.classList.add(action);
        dino.classList.add("alive");
        dino.classList.remove("grounded")

        setTimeout(function() {
            if (started){
                dino.classList.remove(action);
                dino.classList.add("grounded");
            }
        }, timeout);
    }
}

let isAlive = setInterval(function() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    if (cactusLeft < 63 && cactusLeft > 30 && dinoTop >= 70 && started) {
        stop();
    }
})

function game_over_display(on) {
    if (on) {
        end.classList.remove("invisible");
        end.classList.add("visible");
    } else {
        end.classList.remove("visible");
        end.classList.add("invisible");
    }
}

function active_starter(on) {
    const button = document.getElementById("start");
    if (on) {
        button.classList.remove("disabled");
        button.disabled = false;
    } else {
        button.classList.add("disabled");
        button.disabled = true;
    }
}

function reset(){
    score = 0;
    dino.classList.remove("dead");
    dino.classList.add("grounded"); 
    dino.classList.remove("jump");
    map_roll(false);
    cactus.classList.remove("move");
    game_over_display(false);
    animation_freeze(false);
}


function start() {
    reset();
    started = true;
    map_roll(true);
    active_starter(false);
}

function money_update(){
    money += multiplier*score*0.1;
    money = Math.round(money*10)/10;
    str_money.innerHTML = money;
}

function debug() {
    cactus.classList.add("stop_move");
}

function map_roll(active){
    if (active) {
        ground_image.classList.add("roll");
        main.classList.add("background_roll");
    } else {
        ground_image.classList.remove("roll");
        main.classList.remove("background_roll");
    }
}

function animation_freeze(on) {
    if (on){
        cactus.classList.add("stop_move");
        dino.classList.add("stop_move");
        ground_image.classList.add("stop_move");
        main.classList.add("stop_move");
    }else{
        cactus.classList.remove("stop_move");
        dino.classList.remove("stop_move");
        ground_image.classList.remove("stop_move");
        main.classList.remove("stop_move");
    }   
}

function stop() {
    started = false;
    money_update();
    active_starter(true);
    
    dino.classList.remove("grounded");
    dino.classList.remove("alive")
    dino.classList.add("dead");
    animation_freeze(true);
    game_over_display(true);
}


document.addEventListener("keydown", function(event) {
    jump("jump",450);
});
/*document.addEventListener("mousedown", function(event) {
    jump("jump",450);
});*/

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function move() {
    if (cactus.classList != "move" && started) {
        cactus.classList.add("move");
        cactus.classList.remove("static");

        setTimeout(function() {
            if (started){
                cactus.classList.remove("move");
                cactus.classList.add("static");
            }
        }, 1000);
    }
}


setInterval(function() {
    if (started) {
        alea = getRandomInt(100);
        if (alea <= 20){
            move();
        }
    }
}, 100);


setInterval(function() {
    if (started) {
        score += 1;
        string_score.innerHTML = score;
    }
}, 100);