export default function getMove(gameState) {
 
// ФУНКЦИИ ---------------------------------------------------------------------------------------
  function chek_right() {
    if (isMoveSafe.right == false) {
      return false;
    }

    if (myHead.x + 1 <= boardWidth) {
      for (let i = 2; i < gameState.you.body.length; i++) {
        console.log(myHead.x + " " + gameState.you.body[i].x);
        if (myHead.x + 1 == gameState.you.body[i].x && myHead.y == gameState.you.body[i].y) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  function chek_left() {
    if (isMoveSafe.left == false) {
      return false;
    }

    if (myHead.x - 1 >= 0) {
      for (let i = 2; i < gameState.you.body.length; i++) {
        if (myHead.x - 1 == gameState.you.body[i].x && myHead.y == gameState.you.body[i].y) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  function chek_up() {
    if (isMoveSafe.up == false) {
      return false;
    }

    if (myHead.y + 1 <= boardHeight) {
      for (let i = 2; i < gameState.you.body.length; i++) {
        if (myHead.y + 1 == gameState.you.body[i].y && myHead.x == gameState.you.body[i].x) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  function chek_down() {
    if (isMoveSafe.down == false) {
      return false;
    }

    if (myHead.y - 1 >= 0) {
      for (let i = 2; i < gameState.you.body.length; i++) {
        if (myHead.y - 1 == gameState.you.body[i].y && myHead.x == gameState.you.body[i].x) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  function nextGo(){
    //if(gameState.you.height <= 90){
      goToFood();
    //}
    if(isMoveWant.purpose == true){
      if(isMoveWant.right == true && isMoveSafe.right == true){
        return "right";
      }
      else if(isMoveWant.left == true && isMoveSafe.left == true){
        return "left";
      }
      else if(isMoveWant.up == true && isMoveSafe.up == true){
        return "up";
      }
      else if(isMoveWant.down == true && isMoveSafe.down == true){
        return "down";
      }
    }
    if(goAgain == 1 && isMoveSafe.right == true){ return "right";}
    else if(goAgain == 2 && isMoveSafe.left == true){ return "left";}
    else if(goAgain == 3 && isMoveSafe.up == true){ return "up";}
    else if(goAgain == 4 && isMoveSafe.down == true){ return "down";}
    else{
      return safeMoves[Math.floor(Math.random() * safeMoves.length)];
    }
    
  }

  function MD(Num){
    if(Num < 0){Num *= -1;}
    return Num;
  }

  function goToFood(){
    
    let dist = gameState.board.food[0];
    //dist.x = MD(dist.x - myHead.x);
    //dist.y = MD(dist.y - myHead.y);
    isMoveWant.purpose = true;
    
    
    //Вычисляем приоритет
    if(myHead.x != dist.x){
      if(myHead.x < dist.x){
        isMoveWant.right = true;
      }
      else{
        isMoveWant.left = true;
      }
    }
    
    
    if(myHead.y != dist.y){
      if(myHead.y < dist.y){
        isMoveWant.up = true;
      }
      else{
        isMoveWant.down = true;
      }
    }
    
  }
  //--------------------------------------------------------------------------------------------------

  const isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  let isMoveWant = {
    up: false,
    down: false,
    left: false,
    right: false,
    purpose: true,
  };

  let goAgain = 0;
  const boardWidth = gameState.board.width - 1;
  const boardHeight = gameState.board.height - 1;

  // Избегаем движения в обратном направлении

  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {
    isMoveSafe.left = false;
    goAgain = 1; //Right
  } else if (myNeck.x > myHead.x) {
    goAgain = 2; //Left
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) {
    goAgain = 3; //Up
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) {
    goAgain = 4; //Down
    isMoveSafe.up = false;
  }

  //Проверка бортиков
  isMoveSafe.right = chek_right();
  isMoveSafe.left = chek_left();
  isMoveSafe.up = chek_up();
  isMoveSafe.down = chek_down();

  // Улучшение 1 - Защити своего червячка от выхода за границы поля

  // boardWidth = gameState.board.width;
  // boardHeight = gameState.board.height;
  // TODO

  // Улучшение 2 - Защити своего червячка от столкновения со своим телом
  // myBody = gameState.you.body;
  // TODO

  // Улучшение 3 - Защити своего червячка от столкновения с телами соперников
  // opponents = gameState.board.snakes;
  // TODO

  // Проверка, остались ли безопасные ходы (если нет, то куда угодно)

  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    return { move: "down" };
  }

  // Если безопасные ходы есть ход, из них выбирается рандомный

  const nextMove = nextGo();
  //const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  return { move: nextMove };
}
