const game_doc = document.getElementsByClassName('game');
const ui_settings_format = '<div class="ui_settings"><input type="checkbox" name="settings" value="wasd_key" id="show_wasd_key"> Pop Up WASD Key</div>'
const wasd_key = document.getElementsByClassName('wasd_buttons');
const blocks = ["O", "X", "B", "Y"];
const description = '<p id="description">W, A, S, D = Move "Y"<br>Carry "B" to "X"<br> <br>Press [ R ] or Click <span id="bold">SOKOBAN</span> above<br>to reset the map.<br><span id="warning">the streak will be lost if you reset the map.</span></p>';
const wasd_key_pattern = '<div class="wasd_buttons"><p class="w_key"><button id="key">w</button></p><p class="asd_key"><button id="key">a</button>\n<button id="key">s</button>\n<button id="key">d</button></p></div>';
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
let key_timeout;
let interval_W;


window.addEventListener('load', function(){
    if (window.navigator.userAgent.includes("Mobile")){
        document.querySelector('#tutorial').insertAdjacentHTML(
            'beforebegin',
            '<button onclick="gameStart()" id="start_button">start</button>'
        );
        document.querySelector('#tutorial').innerHTML = 'Tap [ start ] button or Tap <span id="bold">SOKOBAN</span> above<br>to start the game.';
        description = '<p id="description">W, A, S, D = Move "Y"<br>Carry "B" to "X"<br> <br>Tap <span id="bold">SOKOBAN</span> above<br>to reset the map.<br><span id="warning">the streak will be lost if you reset the map.</span></p>';
    };
  });


function checkKeys(key){
    if(document.querySelector('#description')){
        switch (key){
            case "w":
                KeyW();
                break;
            case "a":
                KeyA();
                break;
            case "s":
                KeyS();
                break;
            case "d":
                KeyD();
                break;
        }
    }
}


function addHoldEvent(){
    document.querySelectorAll('#key').forEach(element => {
        element.addEventListener('mousedown', () => HoldEvent(element));
        element.addEventListener('mouseup', deleteTimeout);
        element.addEventListener('touchstart', (event) => {
            if (event.cancelable) {
                event.preventDefault();
            }
            HoldEvent(element);
        });
        element.addEventListener('touchend', deleteTimeout);
    })
}


function HoldEvent(element){
    checkKeys(element.textContent);
    if(document.querySelector('#description')){
        key_timeout = setTimeout(() => {
            interval_W = setInterval(() => {
                checkKeys(element.textContent); // 関数を実行
            }, 50);
        }, 500);
    }
}


function deleteTimeout(){
    if(key_timeout){
        clearTimeout(key_timeout);
    }
    if(interval_W){
        clearInterval(interval_W);
    }
}


document.addEventListener('keydown', event => {
    if(event.code === 'Space'){
        if(!document.querySelector('#description')){
            gameStart();
        }
    }else if(event.code === 'KeyR'){
        streak = 0;
        document.getElementById('streak').innerHTML = streak;
        game_doc[0].innerHTML = "";
        createMap();
    }
});


function gameStart(){
    if(document.querySelector('#tutorial')){
        document.querySelector('#tutorial').remove();
        game_doc[0].insertAdjacentHTML(
            'beforebegin',
            ui_settings_format
        );
        const show_wasd_key = document.getElementById('show_wasd_key');
        show_wasd_key.addEventListener("change", () => {
            if (show_wasd_key.checked) {
                if(!wasd_key[0]){
                    game_doc[0].insertAdjacentHTML(
                        'afterend',
                        wasd_key_pattern
                    )
                    addHoldEvent();
                    document.querySelector('#sokoban_title').style.marginTop = "37.5px";
                }
            } else {
                wasd_key[0].remove();
                document.querySelector('#sokoban_title').style.marginTop = "0px";
            }
        });
        if(document.querySelector('#start_button')){
            document.querySelector('#start_button').remove();
            show_wasd_key.checked = true;
        }
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
                addHoldEvent()
        }
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
                addHoldEvent()
        }
    }else if(document.querySelector('#description')){
        streak = 0;
        document.getElementById('streak').innerHTML = streak;
    }
    game_doc[0].innerHTML = "";
    createMap();
}


document.addEventListener('keydown', event => {
    if(["KeyW","KeyA","KeyS","KeyD",'ArrowUp','ArrowLeft','ArrowDown','ArrowRight'].includes(event.code)){
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            KeyW();
            break;
        case 'KeyA':
        case 'ArrowLeft':
            KeyA();
            break;
        case 'KeyS':
        case 'ArrowDown':
            KeyS();
            break;             
        case 'KeyD':
        case 'ArrowRight':
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
        deleteTimeout();
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
