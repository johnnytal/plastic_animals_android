var game_main = function(game){
    TOTAL_HEIGHT = 1000;

    towerHeight = 0;
    animals_off_ground = [];
    collisions = 0;
    nOfStuffToLoad = 0;
    
    coX = [40,170,270,370,470,570,670,769];

    var sounds, name, height, number, tallestAnimal, animalsInTower;;
};

game_main.prototype = {
    create: function(){
    
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
    
        bg = game.add.tileSprite(0, 0, WIDTH, TOTAL_HEIGHT-68, 'bg');
        bg.alpha = 0.8;
        game.world.setBounds(0, 0, WIDTH, TOTAL_HEIGHT);
        
        table = game.add.sprite(385, TOTAL_HEIGHT-40, 'table');
        game.physics.p2.enable(table);
        table.body.static = true;
        
        ruler = game.add.sprite(WIDTH-51, 73, 'ruler');
        ruler.alpha = 0.8;
        
        button = game.add.sprite(WIDTH/2-50, 25, 'button');
        button.alpha = 0.9;
        button.fixedToCamera = true;
        button.scale.set(1.2, 1);
        button.inputEnabled = true;
        button.input.useHandCursor = true;
    
        game.physics.p2.gravity.y = 180;
        game.physics.p2.defaultRestitution = 0.65;
        
        animals = game.add.group();
        animals.enableBody = true;
        animals.physicsBodyType = Phaser.Physics.P2JS;
        
        yStart = 800;

        ape = animals.create(coX[Math.round(Math.random()*7)], yStart, 'ape');
        bear = animals.create(coX[Math.round(Math.random()*7)], yStart, 'bear');
        camel = animals.create(coX[Math.round(Math.random()*7)], yStart, 'camel');
        elaphant = animals.create(coX[Math.round(Math.random()*7)], yStart, 'elaphant');
        fox = animals.create(coX[Math.round(Math.random()*7)], yStart, 'fox');
        lion = animals.create(coX[Math.round(Math.random()*7)], yStart, 'lion');
        moose = animals.create(coX[Math.round(Math.random()*7)], yStart, 'moose');
        panda = animals.create(coX[Math.round(Math.random()*7)], yStart, 'panda');
        rhino = animals.create(coX[Math.round(Math.random()*7)], yStart, 'rhino');
        rodent = animals.create(coX[Math.round(Math.random()*7)], yStart, 'rodent');
        tiger = animals.create(coX[Math.round(Math.random()*7)], yStart, 'tiger');
        zebra = animals.create(coX[Math.round(Math.random()*7)], yStart, 'zebra');
        
        animal_CollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();
    
        tallestAnimal = zebra;
        loadPolygons();
        
        animals.forEach(function(animal){
            animal.anchor.setTo(0.5,0.5);
            game.physics.p2.enable(animal);
            animal.inputEnabled = true;
            animal.input.useHandCursor = true;
            animal.input.enableDrag();
            
            animal.body.data.gravityScale = animal.width * animal.height / 7500;
            
            animal.body.setCollisionGroup(animal_CollisionGroup);
            animal.body.collides(animal_CollisionGroup, animalCollide, this);
            
            constraint1 = game.physics.p2.createGearConstraint(animal, animal, 0.0115, 0.905);
        });
        
        table.body.setCollisionGroup(animal_CollisionGroup);
        table.body.collides(animal_CollisionGroup);
    
        towerText = game.add.text(40,40, "Tower height: " + 0 , { font: "18px " + font, fill: "blue"});
        nAnimalsText = game.add.text(40,70, "Animals in tower: " + 13 , { font: "18px " + font, fill: "purple"});
        btnText = game.add.text(WIDTH/2-37, 35,"TAKE A PHOTO!",{ font: "13px " + font + " bold", fill: "purple"});
        btnText.fixedToCamera = true; 
        btnText.alpha = 0.9;
        towerText.fixedToCamera = true; 
        nAnimalsText.fixedToCamera = true; 
        
        button.events.onInputOver.add(function(btn){ btnText.fill = 'darkgreen'; });
        button.events.onInputOut.add(function(btn){ btnText.fill = 'purple'; });
        button.events.onInputDown.add(function(btn){ takePhoto(); });
        
        plastic1sfx = game.add.audio('plastic1sfx',0.7);
        plastic2sfx = game.add.audio('plastic2sfx',0.7);
        plastic3sfx = game.add.audio('plastic3sfx',0.7);
        plastic4sfx = game.add.audio('plastic4sfx',0.7);
        plastic5sfx = game.add.audio('plastic5sfx',0.7);
        plastic6sfx = game.add.audio('plastic6sfx',0.7);
        plastic7sfx = game.add.audio('plastic7sfx',0.7);
        plastic8sfx = game.add.audio('plastic8sfx',0.7);
        
        sounds = [plastic1sfx, plastic2sfx, plastic3sfx, plastic4sfx, plastic5sfx, plastic6sfx, plastic7sfx, plastic8sfx];
        
        /*music1 = game.add.audio('music1');
        music2 = game.add.audio('music2');
        music3 = game.add.audio('music3');
    
        musics = [music1, music2, music3];
        
        randomN = Math.round(Math.random() * 2); 
        playing = musics[randomN].play();
        
        playing.onStop.add(function(){
           randomN = Math.round(Math.random() * 2);
           playing = musics[randomN].play();
        },this);*/
        
        speaker = game.add.image(710, 10, 'speaker');
        speaker.inputEnabled = true;
        speaker.fixedToCamera = true;
        speaker.input.useHandCursor = true;
        speaker.events.onInputDown.add(toggleSound, this);
        speaker.frame = 1;
        
        camera = game.add.audio('camera');
        
        modal = new gameModal(game);
        game.camera.y = 800;
    },

    update: function(){
       animals.forEach(function(animal){
           if(animal.input.isDragged){
              if(animal.body != null){
                    animal.body.x = game.input.activePointer.worldX;
                    animal.body.y = game.input.activePointer.worldY;
                    animal.body.setZeroVelocity();
                    animal.body.data.gravityScale = 0;
              }
           }
           
           else{
               animal.body.data.gravityScale = animal.width * animal.height / 7500;
               
               if (animal.body.y < tallestAnimal.body.y)  tallestAnimal = animal; // get tower height
               
               towerHeight = Math.round((Math.abs((TOTAL_HEIGHT - tallestAnimal.body.y) * 1.95)));
               
               if (towerHeight/(animals_off_ground.length + 1) < 138) towerText.text = "Tower height: " + towerHeight + "M";
            
               // get n of animals
               if (animal.body.y < TOTAL_HEIGHT - 73 - animal.height && animals_off_ground.indexOf(animal) == -1){ 
                   animals_off_ground.push(animal); 
               }
               else if (animal.body.y >= TOTAL_HEIGHT - 73 - animal.height){
                   var index = animals_off_ground.indexOf(animal);
                   if (index > -1) animals_off_ground.splice(animal, 1);
               }
               
               animalsInTower = animals_off_ground.length + 1;
               if (animalsInTower > 13) animalsInTower = 13;
               nAnimalsText.text = "Animals in tower: " + animalsInTower;
           }
       });
       
       // camera
       if (tallestAnimal.body.y - 50 < game.camera.y) game.camera.y -= 2;
       else if (tallestAnimal.body.y - 50 > game.camera.y) { game.camera.y += 2; }
    }
};

function animalCollide(body1, body2){
    if (body2.sprite.key != 'table'){
        collisions++;
        if (collisions == 2){
            randomN =  Math.round(Math.random() * 4);
            sounds[randomN].play();
            collisions = 0;
        }
    }
}

function loadPolygons(){
    elaphant.body.clearShapes();
    elaphant.body.loadPolygon('elephantJson', 'elaphant'); 
    moose.body.clearShapes();
    moose.body.loadPolygon('mooseJson', 'moose');
    rhino.body.clearShapes();
    rhino.body.loadPolygon('rhinoJson', 'rhino');
    camel.body.clearShapes();
    camel.body.loadPolygon('camelJson', 'camel');    
    panda.body.clearShapes();
    panda.body.loadPolygon('pandaJson', 'panda');
    ape.body.clearShapes();
    ape.body.loadPolygon('apeJson', 'ape');
    fox.body.clearShapes();
    fox.body.loadPolygon('foxJson', 'fox');
    tiger.body.clearShapes();
    tiger.body.loadPolygon('tigerJson', 'tiger');
    rodent.body.clearShapes();
    rodent.body.loadPolygon('rodentJson', 'rodent');
    bear.body.clearShapes();
    bear.body.loadPolygon('bearJson', 'bear');
    lion.body.clearShapes();
    lion.body.loadPolygon('lionJson', 'lion');
    zebra.body.clearShapes();
    zebra.body.loadPolygon('zebraJson', 'zebra');    
}

function takePhoto(){
    animals.forEach(function(animal){ animal.input.disableDrag(); });
    button.inputEnabled = false;
    button.input.useHandCursor = false;

    var count = game.add.sprite(WIDTH/2-33,300, 'numbers');
    tween = game.add.tween(count).to( { y: 600 }, 2400, Phaser.Easing.Bounce.Out, true);
    count.frame = 2;
    btnText.fill = 'red';
    
    countDown = setInterval(function(){
        count.frame--;
        if (count.frame == 0) setTimeout(function(){ savePhoto(count,countDown); }, 1000);
    },1000);
}

function savePhoto(count,countDown){   
    count.destroy();
    clearInterval(countDown); 

    camera.play();
    
    height = towerHeight;
    number = animalsInTower; 
    camPos = game.camera.y;
     
    game.state.start('GameOver', false, false, height, number, camPos);

}

function toggleSound(){
    if(speaker.frame == 1){
        speaker.frame = 0;
        soundOn = false;
        for(x=0; x<musics.length-1; x++) musics[x].volume = 0;
        for (n=0; n<sounds.length-1; n++) sounds[n].volume = 0;
    }
    else{
        speaker.frame = 1; 
        soundOn = true; 
        for(x=0; x<musics.length-1; x++) musics[x].volume = 1;
        for (n=0; n<sounds.length-1; n++) sounds[n].volume = 1;
    }
}
