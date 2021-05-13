//Create variables here
var dog, dogImage1, dogImage2, garden, washroom, bedroom, database, foods, foodStock, gameState, currentTime
var fedTime,lastFed; var feed,addFood; var foodObject
function preload()
{
  dogImage1 = loadImage("images/dogImg.png")
  dogImage2 = loadImage("images/dogImg1.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")
  bedroom = loadImage("images/Bed Room.png")

	//load images here
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database()
  foodObject = new Food()

  dog = createSprite(300,300)
  dog.addImage(dogImage1)
  dog.scale = 0.5
  foodStock = database.ref("food")
  foodStock.on("value", readStock)
    feed = createButton("Feed The Dog");
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood = createButton("Add Food");
    addFood.position(800,95)
    addFood.mousePressed(addFoods);
    readState=database.ref('gameState');
    readState.on("value", function(data){
      gameState=data.val();
    });
    fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
}
)
}


function draw() {  
  foodObject.display()
currentTime = hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObject.garden();
}
else if (currentTime==(lastFed+2)){
  update("Sleeping")
  foodObject.bedroom();
}
else if (currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
  foodObject.washroom();
}
else{
  update("Hungry")
  foodObject.display
}
if(gameState!= "Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}
else{
  feed.show();
  addFood.show();
  dog.addImage(dogImage1);
}
  drawSprites();
}

function readStock(data){
  foods = data.val()
  foodObject.updateFoodstock(foods)
}
function feedDog(){
  dog.addImage(dogImage2);

  foodObject.updateFoodstock(foodObject.getfoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getfoodStock(),
    FeedTime:hour(), gameState:"Hungry"
  }
 )
}
function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}
function update(state){
  database.ref("/").update({gameState:state})
}

  // 100 lines!!!
