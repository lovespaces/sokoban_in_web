const game_doc = document.getElementsByClassName('game');
const ui_settings = document.getElementsByClassName('ui_settings');
const show_wasd_key = document.getElementById('show_wasd_key');
const wasd_key = document.getElementsByClassName('wasd_buttons');
const blocks = ["O", "X", "B", "Y"];
const description = '<p id="description">W, A, S, D = Move "Y"<br>Carry "B" to "X"<br> <br>Press [ Space ] or Click <span id="bold">SOKOBAN</span> above<br>to reset the map.<br><span id="warning">the streak will lose if you reset the map.<br>also, you can\'t save your streak data.</span></p>';
const wasd_key_pattern = '<div class="wasd_buttons"><p class="w_key"><button onclick="KeyW()">w</button></p><p class="asd_key"><button onclick="KeyA()">a</button>\n<button onclick="KeyS()">s</button>\n<button onclick="KeyD()">d</button></p></div>';
let map_string = "";
let map = [
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
];
let streak = 0;


document.addEventListener('keydown', event => {
    console.log(event.code);
    if(event.code === 'Space'){
        gameStart();
    }
});


function gameStart(){
    if(document.querySelector('#tutorial')){
        document.querySelector('#tutorial').remove();
        ui_settings[0].style.visibility = "visible";
        game_doc[0].style.visibility = "visible";
        game_doc[0].insertAdjacentHTML(
            'beforebegin',
            '<p id="streak">0</p>'
        );
        game_doc[0].insertAdjacentHTML(
            'afterend',
            description
        );
        if (show_wasd_key.checked) {
                game_doc[0].insertAdjacentHTML(
                    'afterend',
                    wasd_key_pattern
                )
        }
    }else if(document.querySelector('#description')){
        streak = 0;
        document.getElementById('streak').innerHTML = streak;
    }else if(document.querySelector('#you_win')){
        document.getElementById('you_win').remove();
        game_doc[0].insertAdjacentHTML(
            'afterend',
            description
        );
        if (show_wasd_key.checked) {
                game_doc[0].insertAdjacentHTML(
                    'afterend',
                    wasd_key_pattern
                )
        }
    }
    game_doc[0].innerHTML = "";
    createMap();
}


document.addEventListener('keydown', event => {
    if(["KeyW","KeyA","KeyS","KeyD"].includes(event.code)){
    switch (event.code) {
        case 'KeyW':
            KeyW();
            break;
        case 'KeyA':
            KeyA();
            break;
        case 'KeyS':
            KeyS();
            break;             
        case 'KeyD':
            KeyD();
            break;
    }
    }
});


function movingY(){
    map[player_x][player_y] = "Y";
    game_doc[0].innerHTML = "";
    showMap();
    if (!map.some(subArray => subArray.includes("X"))){
        document.getElementById('description').remove();
        if(wasd_key[0]){
            wasd_key[0].remove();
        }
        game_doc[0].insertAdjacentHTML(
            'afterend',
            '<p id="you_win">Hooray! You have carried all the boxes to the goals!<br> <br>Press [ Space ] or Click <span id="bold">SOKOBAN</span><br>to create another map.</p>'
        );
        streak++;
        document.getElementById('streak').innerHTML = streak;
    }
}


function KeyW(){
    if(!document.querySelector('#tutorial') && !document.querySelector('#you_win')){
    map[player_x][player_y] = "&nbsp;";
    if (map[player_x + 1][player_y] !== "O") {
        if(map[player_x + 1][player_y] !== "X"){
            if(map[player_x + 1][player_y] == "B"){
                if(map[player_x + 2][player_y] !== "O"){
                    if(map[player_x + 2][player_y] !== "B"){
                        if(map[player_x + 2][player_y] == "X"){
                            map[player_x + 2][player_y] = "&nbsp;";
                        }else{
                            map[player_x + 2][player_y] = "B";
                        }
                        player_x++;
                    }
                }
            }else{
                player_x++;
            }
        }
    };
    movingY();
    }
}


function KeyA(){
    if(!document.querySelector('#tutorial') && !document.querySelector('#you_win')){
    map[player_x][player_y] = "&nbsp;";
    if (map[player_x][player_y - 1] !== "O") {
        if(map[player_x][player_y - 1] !== "X"){
            if(map[player_x][player_y - 1] == "B"){
                if(map[player_x][player_y - 2] !== "O"){
                    if(map[player_x][player_y - 2] !== "B"){
                        if(map[player_x][player_y - 2] == "X"){
                            map[player_x][player_y - 2] = "&nbsp;";
                        }else{
                            map[player_x][player_y - 2] = "B";
                        }
                        player_y--;
                    }
                }
            }else{
                player_y--;
            }
        }
    };
    movingY();
    }
}


function KeyS(){
    if(!document.querySelector('#tutorial') && !document.querySelector('#you_win')){
    map[player_x][player_y] = "&nbsp;";
    if (map[player_x - 1][player_y] !== "O") {
        if(map[player_x - 1][player_y] !== "X"){
            if(map[player_x - 1][player_y] == "B"){
                if(map[player_x - 2][player_y] !== "O"){
                    if(map[player_x - 2][player_y] !== "B"){
                        if(map[player_x - 2][player_y] == "X"){
                            map[player_x - 2][player_y] = "&nbsp;";
                        }else{
                            map[player_x - 2][player_y] = "B";
                        }
                        player_x--;
                    }
                }
            }else{
                player_x--;
            }
        }
    };
    movingY();
    }
}


function KeyD(){
    if(!document.querySelector('#tutorial') && !document.querySelector('#you_win')){
    map[player_x][player_y] = "&nbsp;";
    if (map[player_x][player_y + 1] !== "O") {
        if(map[player_x][player_y + 1] !== "X"){
            if(map[player_x][player_y + 1] == "B"){
                if(map[player_x][player_y + 2] !== "O"){
                    if(map[player_x][player_y + 2] !== "B"){
                        if(map[player_x][player_y + 2] == "X"){
                            map[player_x][player_y + 2] = "&nbsp;";
                        }else{
                            map[player_x][player_y + 2] = "B";
                        }
                        player_y++;
                    }
                }
            }else{
                player_y++;
            }
        }
    };
    movingY();
    }
}


show_wasd_key.addEventListener("change", () => {
    if (show_wasd_key.checked) {
        if(!wasd_key[0]){
            game_doc[0].insertAdjacentHTML(
                'afterend',
                wasd_key_pattern
            )
        }
    } else {
        wasd_key[0].remove();
    }
});


function getRandom(max) {
    return Math.floor(Math.random() * max);
}


function resetMap(){
    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 13; j++){
            if(i == 0 || i == 9){
                map[i][j] = "O";
            }else if(j == 0 || j == 12){
                map[i][j] = "O";
            }else{
                map[i][j] = "&nbsp;";
            }
        }
    }
}


function showMap(){
    for (let i = 0; i < 10; i++){
        map_string = "";
        for (let j = 0; j < 13; j++){
            if(j == 12){
                map_string += map[i][j];
            }else{
                map_string += map[i][j] + "&nbsp;";
            }
        };
        game_doc[0].insertAdjacentHTML(
            'afterbegin',
            map_string + "<br>"
        )
    };
}


function createMap(){
    resetMap();
    player_x = getRandom(8) + 1;
    player_y = getRandom(11) + 1;
    map[player_x][player_y] = "Y";
    box_amount = getRandom(2) + 1;
    while(true){
        if(streak >= 3){
            box_amount = getRandom(streak) + 1;
        }else if(streak >= 7){
            box_amount = getRandom(7) + 2;
        }else if(streak >= 10){
            box_amount = getRandom(streak);
            if(box_amount >= 15){
                box_amount -= -((streak / 2) * 10)
            }
        }
        if(box_amount <= 0){
            continue;
        }else{
            break;
        }
    }
    for (let i = 0; i < box_amount; i++){
        while(true){
            box_x = getRandom(8) + 1;
            box_y = getRandom(11) + 1;
            if(blocks.includes(map[box_x][box_y])){
                continue;
            }else if(box_x <= 1 || box_y <= 1 || box_x >= 7 || box_y >= 10){
                continue;
            }else {
                break;
            }
        }
        map[box_x][box_y] = "B";
        while(true){
            goal_x = getRandom(8) + 1;
            goal_y = getRandom(11) + 1;
            if (blocks.includes(map[goal_x][goal_y])){
                continue;
            }else {
                break;
            }
        }
        map[goal_x][goal_y] = "X";
    }
    showMap();
}
