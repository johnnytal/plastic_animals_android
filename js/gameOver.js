var game_over = function(game){};

game_over.prototype = {

    preload: function(){},
    
    init: function(height, number){

        game.camera.y = camPos;
        
        var message = 'Nice!\n \n Tower height: ' + height + 'M \n' + 'n of animals: ' + number; 
     
        modal.createModal({
            type:"game_over",
            includeBackground: false,
            modalCloseOnInput: false,
            itemsArr: 
            [
                 {
                    type: "image",
                    content: "panel",
                    contentScale: 1.45
                },
                {
                    type: "text",
                    content: message,
                    fontFamily: font,
                    fontSize: 34,
                    color: "0xffff00",
                    stroke: "0xff0000",
                    strokeThickness: 2
                },
                {
                    type: "image",
                    content: "replay",
                    callback: function () { // start a new game
                        game.state.start('Preloader');
                    }
                }
            ]
        });   
            
        modal.showModal("game_over");
        modal.y = camPos;
        for (n=0; n<3; n++){
            game.add.tween(modal.getModalItem('game_over',n)).from( { y: - 800 }, 500, Phaser.Easing.Linear.In, true);
            game.add.tween(modal.getModalItem('game_over',0)).to( { y: camPos + 50 }, 500, Phaser.Easing.Linear.In, true);
            game.add.tween(modal.getModalItem('game_over',1)).to( { y: camPos + 85 }, 500, Phaser.Easing.Linear.In, true);
            game.add.tween(modal.getModalItem('game_over',2)).to( { y: camPos + 335 }, 500, Phaser.Easing.Linear.In, true);
        }
        
        replayImg = modal.getModalItem('game_over',2);
        replayImg.input.useHandCursor = true;
    }
};
