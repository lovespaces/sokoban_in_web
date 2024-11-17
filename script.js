const game_doc = document.getElementsByClassName('game');
const blocks = ["O", "X", "B", "Y"];
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
    if(event.code === 'Space'){
        if(document.querySelector('#tutorial')){
            document.querySelector('#tutorial').remove();
            game_doc[0].style.visibility = "visible";
            game_doc[0].insertAdjacentHTML(
                'beforebegin',
                '<p id="streak">0</p>'
            );
            game_doc[0].insertAdjacentHTML(
                'beforeend',
                '<p id="description">W, A, S, D = Move "Y"<br>Carry "B" to "X"<br> <br>Press [ Space ] to reset the map.<br><span id="warning">the streak will lose if you reset the map.<br>also, you can\'t save your streak data.</span></p>'
            );
            createMap();
        }else if(document.querySelector('#description')){
            streak = 0;
            document.getElementById('streak').innerHTML = streak;
            game_doc[0].innerHTML = "";
            game_doc[0].insertAdjacentHTML(
                'beforeend',
                '<p id="description">W, A, S, D = Move "Y"<br>Carry "B" to "X"<br> <br>Press [ Space ] to reset the map.<br><span id="warning">the streak will lose if you reset the map.<br>also, you can\'t save your streak data.</span></p>'
            );
            createMap();
        }else if(document.querySelector('#you_win')){
            document.getElementById('you_win').remove();
            game_doc[0].innerHTML = "";
            game_doc[0].insertAdjacentHTML(
                'beforeend',
                '<p id="description">W, A, S, D = Move "Y"<br>Carry "B" to "X"<br> <br>Press [ Space ] to reset the map.<br><span id="warning">the streak will lose if you reset the map.<br>also, you can\'t save your streak data.</span></p>'
            );
            createMap();
        }
    }
});


document.addEventListener('keydown', event => {
    if(!document.querySelector('#tutorial') && !document.querySelector('#you_win')){
        if(["KeyW","KeyA","KeyS","KeyD"].includes(event.code)){
        map[player_x][player_y] = "&nbsp;";
        switch (event.code) {
            case 'KeyW':
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
                break;
            case 'KeyA':
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
                }
                break;
            case 'KeyS':
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
                }
                break;             
            case 'KeyD':
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
                }
                break;
        }
        map[player_x][player_y] = "Y";
        game_doc[0].innerHTML = "";
        showMap();
        if (!map.some(subArray => subArray.includes("X"))){
            game_doc[0].insertAdjacentHTML(
                'beforeend',
                '<p id="you_win">Hooray! You have carried all the boxes to the goals!<br> <br>Press [ Space ] to create another map.</p>'
            );
            streak++;
            document.getElementById('streak').innerHTML = streak;
        }else{
            game_doc[0].insertAdjacentHTML(
                'beforeend',
                '<p id="description">W, A, S, D = Move "Y"<br>Carry "B" to "X"<br> <br>Press [ Space ] to reset the map.<br><span id="warning">the streak will lose if you reset the map.<br>also, you can\'t save your streak data.</span></p>'
            );
        }
        }
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
    if(streak >= 3){
        box_amount = getRandom(streak) + 1;
        if(streak >= 7){
            box_amount = getRandom(5) + getRandom(5) + 2;
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