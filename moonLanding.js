//initialise global variables
var numberOfStars = 600 ;                   //set number of stars
var moonSpeed = 1  ;                        //set moon speed
var skyTrackSpeed = 0.25;                    //set the speed stars track across the sky
var starMap = [] ;                          //initialise Array
var landImage    ;                           //initialise variable for land image
var starSize = 5;                             //set star size
var micInput     ;                               //initialise variable for microphone input
var starPositionX = 0 ;                //intitialise star X variable
var starPositionY = 0 ;                //intitialise star Y variable
var mp3_1;                                //initialise mp3 variable
var mp3_2;                                //initialise mp3 variable
var mp3_3;                                //initialise mp3 variable


//initialise Moon:    
var moonPositionX = -200 ;
var moonPositionY = 400;

function preload(){
        //load MP3
    mp3_1 = loadSound('assets/bensound-scifi.mp3');
    mp3_2 = loadSound('assets/bensound-relaxing.mp3');
    mp3_3 = loadSound('assets/bensound-acousticbreeze.mp3');
}

function setup() {
     createCanvas(1300, 800) ;          //set canvas
  

    
    //set up the audio capture   
    micInput = new p5.AudioIn();
    
    //This section is for computers with multiple sources (for example when using traktor soundcard, need to replace with dialogue box)
    micInput.getSources(function(sourceList) {
     //print out the array of available sources
     console.log(sourceList);
     //set the source to the relevant item in the set
     micInput.setSource(0);
    });
    
    //start
    micInput.start();
    


    
    
  
    
    //create the initial star map:
    
    for(i = 0; i < (numberOfStars * 2); i = i+ 2){           //set for loop to run through each row of 2d co-ordinates  
        
        
        starPositionX = random(width);                      //set random position X
        starPositionY = random(height/1.75);                 //set random position Y (above horizon)
        
        starMap[i] = starPositionX;                         //add values to 2D array
        starMap[i+1] = starPositionY;                       //add values to 2D array
        
    }
    
    //load the moon image:
    
    landImage = loadImage("assets/Landing2.jpg");

}
           


function draw() {
    background(0) ;
     
  ellipseMode(CENTER); 
  noStroke();
  
  //get mic level before frame is drawn
  soundLevel = micInput.getLevel();
  
   
  
  //Draw the array of stars:
  for(i = 0; i < (numberOfStars * 2); i = i + 2){    
    fill(random(255,180), random(255,180), random(250,(250*soundLevel)));       //set a random star colour also influenced by audio level
    
   var TempstarSize = random(starSize,starSize + 1);                     // random star size shimmer effect
                                                                                //add extra bit of size based on audio soundLevel
   TempstarSize = TempstarSize + (15*soundLevel);
   
    ellipse(starMap[i],starMap[i+1],TempstarSize,TempstarSize);                      // Draw with the randomised fill and size for shimmer effect
    
    
    starMap[i] = starMap[i] + skyTrackSpeed;                                     //Move the star X position by the start tracking speed

    if (starMap[i] >= width) {                                                      //reset star X position to 0 and random height if it leaves the canvas
                starMap[i] = 0 ;
                starMap[i+1]= random(height/1.75);
    }                   
     

 }

    
    //draw land image
    imageMode(CORNERS);
    image(landImage,0,(height/1.75),width,height);
    
    //draw mooon and move each frame, size dependant on Mic input
    
    fill(200,200,255);
    ellipse(moonPositionX,moonPositionY,(75 - (soundLevel*70)),(75 - (soundLevel*70)));
    //draw moon core
    fill(0,0,0);
    ellipse(moonPositionX,moonPositionY,(25 + (soundLevel*50)),(25 + (soundLevel*50)));
    
    
    
    moonPositionX = moonPositionX + moonSpeed;
    moonPositionY = moonPositionY - 0.15;
    
    //reset Moon once it has completed an orbit:
    if (moonPositionX > (width * 1.3)) {
        moonPositionX = -300;
        moonPositionY = 400;
    
    }
    
    //add the credit to bensound for mp3 as stated in license
    fill(255,0,255);
    textSize(12);
    text("Music by www.bensound.com",10,height-20);
    
    
    //find user clicks and play associated MP3
    
    if (mouseIsPressed){
    
        //if user clicks on the left rover
        if ((mouseButton == LEFT) && ((mouseY < 650) && (mouseY > 550)) && ((mouseX > 150) && (mouseX < 400))){
       
            //then play the mp3 and stop the others if its not already playing
            if (mp3_1.isPlaying() != true){
                mp3_1.setVolume(1);
                mp3_1.play();
                mp3_2.stop();
                mp3_3.stop();
            
            }
       
        }
    
        //if user clicks on the right rover
        if ((mouseButton == LEFT) && ((mouseY < 650) && (mouseY > 550)) && ((mouseX > 925) && (mouseX < 1150))){
       
            //then play the mp3 and stop the others if its not already playing
            if (mp3_2.isPlaying() != true){
                mp3_2.setVolume(1);
                mp3_2.play();
                mp3_1.stop();
                mp3_3.stop();
            
            }
       
        }
    
            //if user clicks on the centre lander
        if ((mouseButton == LEFT) && ((mouseY < 800) && (mouseY > 650)) && ((mouseX > 500) && (mouseX < 700))){
       
            //then play the mp3 and stop the others if its not already playing
            if (mp3_3.isPlaying() != true){
                mp3_3.setVolume(1);
                mp3_3.play();
                mp3_2.stop();
                mp3_1.stop();
            
            }
       
        }
    }
    

}