import { GameController, GameItem } from "./GameController";

import NormalPlayerFace from "../assets/img/player/normal.png";

export class PlayerController {
    text: string = "";
    inventory: GameItem[] = [];
    game: GameController;
    emotion: string = "normal";

    images = {
        "normal": NormalPlayerFace,
        "panic": NormalPlayerFace
    };

    constructor(gameController: GameController){
        this.game = gameController;
    }

    say(text: string){
        this.text = text;
    }

    setEmotion(emotion: string){
        this.emotion = emotion;
        if(emotion === 'panic'){
            setTimeout(()=>{this.emotion="normal"},3000);
        }
    }
}