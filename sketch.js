//Create variables here
var dog , food ; 
var foodStock , foods;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
  bgImg = loadImage("images/BgImage.jpg")

}

function setup() {
	createCanvas(700, 450);
  
  dog = createSprite(600,350);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  database = firebase.database();
  console.log(database);
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(bgImg);
  if(keyWentDown(UP_ARROW)){
    foodStock = foodStock - 1;
    writeStock(foodStock);
    dog.addImage(happyDogImage);

  }
      
  drawSprites();
  textSize(18);
  fill("black");
  text("Press and hold UP ARROW key to feed the dog", 50 , 20);
  text("Food Remaining : " + foodStock, 50, 40);
}

function readStock(data){
  foodStock = data.val();

}
  
function writeStock(x){
  database.ref('/').update({
    food : x
  })
}
