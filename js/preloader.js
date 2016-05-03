var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        // create progress % text
        font = 'Exo';
         
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
    
        // create progress bar
        //var loadingBar = this.add.sprite(this.game.world.centerX - 37,  this.game.world.centerY + 30, "");
        
        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px ' + font, fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });
        
        //loadingBar.anchor.setTo(0, 0.5);
        //this.load.setPreloadSprite(loadingBar);

        // load assets
        game.load.image('anteater', 'images/plastic/anteater.png');
        game.load.image('ape', 'images/plastic/ape.png');
        game.load.image('bear', 'images/plastic/bear.png');
        game.load.image('camel', 'images/plastic/camel.png');
        game.load.image('elaphant', 'images/plastic/elaphant.png');
        game.load.image('fox', 'images/plastic/fox.png');
        game.load.image('lion', 'images/plastic/lion.png');
        game.load.image('moose', 'images/plastic/moose.png');
        game.load.image('panda', 'images/plastic/panda.png');
        game.load.image('rhino', 'images/plastic/rhino.png');
        game.load.image('rodent', 'images/plastic/rodent.png');
        game.load.image('tiger', 'images/plastic/tiger.png');
        game.load.image('zebra', 'images/plastic/zebra.png');    
        
        game.load.image('bg', 'images/plastic/bg.jpg');
        game.load.image('table', 'images/plastic/table.jpg');
        game.load.image('ruler', 'images/plastic/ruler.png');
        game.load.image('button', 'images/plastic/button.png');
        
        game.load.image('replay', 'images/plastic/replay.png');
        game.load.image('panel', 'images/plastic/panel.png');
        game.load.image('button', 'images/plastic/button.png');
       
        game.load.spritesheet('speaker', 'images/plastic/speaker.png',30,26,2);
        game.load.spritesheet('numbers', 'images/plastic/numbers.png',66,81);
        
        game.load.physics('elephantJson', 'json/elaphantJson.json');
        game.load.physics('tigerJson', 'json/tigerJson.json');
        game.load.physics('camelJson', 'json/camelJson.json');
        game.load.physics('rhinoJson', 'json/rhinoJson.json');
        game.load.physics('pandaJson', 'json/pandaJson.json');
        game.load.physics('apeJson', 'json/apeJson.json');
        game.load.physics('foxJson', 'json/foxJson.json');
        game.load.physics('lionJson', 'json/lionJson.json');
        game.load.physics('mooseJson', 'json/mooseJson.json');
        game.load.physics('anteaterJson', 'json/anteaterJson.json');
        game.load.physics('rodentJson', 'json/rodentJson.json');
        game.load.physics('zebraJson', 'json/zebraJson.json');
        game.load.physics('bearJson', 'json/bearJson.json');
        
        game.load.audio('plastic1sfx', 'sounds/plastic/plastic1.wav');
        game.load.audio('plastic2sfx', 'sounds/plastic/plastic2.wav');
        game.load.audio('plastic3sfx', 'sounds/plastic/plastic3.wav');
        game.load.audio('plastic4sfx', 'sounds/plastic/plastic4.wav');
        game.load.audio('plastic5sfx', 'sounds/plastic/plastic5.wav');
        game.load.audio('plastic6sfx', 'sounds/plastic/plastic6.wav');
        game.load.audio('plastic7sfx', 'sounds/plastic/plastic7.wav');
        game.load.audio('plastic8sfx', 'sounds/plastic/plastic8.wav');
        
        //game.load.audio('music1', 'sounds/plastic/music1.wav');
        //game.load.audio('music2', 'sounds/plastic/music2.wav');
        //game.load.audio('music3', 'sounds/plastic/music3.wav');
        
        game.load.audio('camera', 'sounds/plastic/camera.wav');
    },
    
    create: function(){

    }, 
    
    update: function(){
        this.game.state.start("Game"); 
    }, 
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
   // console.log(progress, cacheKey, success);
};