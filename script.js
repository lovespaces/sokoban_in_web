var map = [];
var map_string = "";
var player_x = 0;
var player_y = 0;
var streak = -1;
var objectives_count = 0;

$("#start_game").click(
    function() {
        if(streak == -1){
            streak = 0;
        };
        if(!($(".in-game").length)){
            startGame();
        } // 現時点では、ゲームクリア時のみクリック可能だがこれから変える可能性はある
    }
);

$("body").on("keydown", function(event){
    if(["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(event.key)){
        if($(".in-game").length){
            movePlayer(event.key);
        };
    }else if(event.code == "Space"){
        if(!($(".in-game").length)){
            if(streak == -1){
                streak = 0;
            };
            startGame();
        }
    }else if(event.code == "KeyR"){
        if($(".in-game").length){
            streak = 0;
        };
        startGame();
    };
});

function startGame(){
    createMap();
    if($(".non-game").length){
        $("#map").removeClass("non-game");
    };
    $("#tutorial").remove();
    $("#map").addClass("in-game");
    $("#streak").text(streak);
    $("#description").html("Rキーでリセット");
}

function createMap(){
    // マップ作成
    setMapLength();
    resetMap();
    setObjectives();
    showMap();
};

function checkGameOver(){
    if(objectives_count == 0){
        streak++;
        $("#streak").text(streak);
        $("#map").removeClass("in-game");
        $("#map").addClass("non-game");
        $("#description").html("ゲームクリア！<br>SpaceもしくはSOKOBANを押すことで次のゲームに移動できます。");
    }
}

function movePlayer(key){
    // プレイヤーを動かす
    let temp_x = player_x;
    let temp_y = player_y;
    switch(key){
        case "w":
        case "ArrowUp":
            temp_y -= 1;
            break;
        case "a":
        case "ArrowLeft":
            temp_x -= 1;
            break;
        case "s":
        case "ArrowDown":
            temp_y += 1;
            break;
        case "d":
        case "ArrowRight":
            temp_x += 1;
            break;
    }
    if(map[temp_y][temp_x]){
        if(map[temp_y][temp_x] == "&nbsp;"){
            map[player_y][player_x] = "&nbsp;";
            map[temp_y][temp_x] = "Y";
            player_x = temp_x;
            player_y = temp_y;
        }else if(map[temp_y][temp_x] == "M"){
            moveObjectives(temp_x, temp_y, key);
        };
    };
    showMap();
    $("#map").addClass("in-game");
    checkGameOver();
};

function moveObjectives(x, y, dir){
    // 二個運べるようにするため、anotherとして変数を別に追加しておく
    let obj_x = x;
    let obj_y = y
    let another_x = x;
    let another_y = y;
    switch(dir){
        case "w":
        case "ArrowUp":
            obj_y -= 1;
            another_y -= 2;
            break;
        case "a":
        case "ArrowLeft":
            obj_x -= 1;
            another_x -= 2;
            break;
        case "s":
        case "ArrowDown":
            obj_y += 1;
            another_y += 2;
            break;
        case "d":
        case "ArrowRight":
            obj_x += 1;
            another_x += 2;
            break;
    }
    const block = map[obj_y][obj_x];
    if(!(block == "O")){
        map[player_y][player_x] = "&nbsp;";
        map[obj_y][obj_x] = "M";
        map[y][x] = "Y";
        if(block == "M"){
            if(map[another_y][another_x] == "&nbsp;"){
                if(map[another_y][another_x] != "O"){
                    map[another_y][another_x] = "M";
                }
            }else if(map[another_y][another_x] == "X"){
                map[another_y][another_x] = "&nbsp;";
                objectives_count--;
            }else{
                map[player_y][player_x] = "Y";
                map[obj_y][obj_x] = "M";
                map[y][x] = "M";
                return;
            };
        }else if(block == "X"){
            map[obj_y][obj_x] = "&nbsp;";
            objectives_count--;
        }
        player_x = x;
        player_y = y;
    };
};

function setObjectives(){
    // オブジェクト設定
    let dir_x = 0;
    let dir_y = 0;
    while(true){
        objectives_count = Math.floor(Math.random() * streak + 1);
        if(streak < 2){
            objectives_count = Math.floor(Math.random() * 2 + 1);
        }else if(objectives_count > 15){
            continue;
        }else if(objectives_count <= Math.ceil(streak / 3.5) && streak > 7){
            objectives_count += Math.floor(streak / 4);
        };
        break;
    }
    let objectives = ["Y"];
    for(let i = 0; i < objectives_count; i++){
        objectives.push("M");
    };
    for(let i = 0; i < objectives_count; i++){
        objectives.push("X");
    };
    for(let i = 0; i < objectives.length; i++){
        while(true){
            dir_x = Math.floor(Math.random() * map.length + 1);
            if(map[dir_x]){
                dir_y = Math.floor(Math.random() * map[dir_x].length + 1);
            }else{
                continue;
            }
            if(map[dir_x][dir_y] == "&nbsp;"){
                map[dir_x][dir_y] = objectives[i];
                if(i == 0){
                    player_x = dir_y;
                    player_y = dir_x;
                }
                if(map[dir_x][dir_y] == "M"){
                    if(dir_x == 1 || dir_x == map.length - 2 || dir_y == 1 || dir_y == map[i].length - 2){
                        map[dir_x][dir_y] = "&nbsp;";
                        continue;
                    };
                };
            }else{
                continue;
            };
            break;
        };
    };
};

function setMapLength(){
    // マップの広さ設定
    map = [];
    for(let i = 0; i < 9; i++){
        var temp_map = [];
        for(let j = 0; j < 12; j++){
            temp_map.push("O");
        };
        map.push(temp_map);
    };
};

function resetMap(){
    // マップをリセット
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            if(i == 0 || i == map.length - 1 || j == 0 || j == map[i].length - 1){
                continue;
            };
            map[i][j] = "&nbsp;";
        };
    };
};

function showMap(){
    map_string = "";
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            map_string += map[i][j];
            if(j != map[i].length - 1){
                map_string += "&nbsp;";
            }else{
                map_string += "<br>";
            };
        };
    };
    $(".map").html(
        "<p id=\"map\">\n" + map_string + "\n</p>"
    );
};