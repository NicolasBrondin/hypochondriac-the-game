import { GameController, GameItem } from "./GameController";
import HeartbeatSoundEffect from '../assets/sound/effects/alarm.mp3';
import NormalPlayerFace from "../assets/img/player/normal.png";
import PanicPlayerFace from "../assets/img/player/panic.png";

export class PlayerController {
    text: string = "";
    inventory: GameItem[] = [];
    game: GameController;
    emotion: string = "normal";

    images = {
        "normal": NormalPlayerFace,
        "panic": PanicPlayerFace
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
            this.game.audio.playEffectAudio(HeartbeatSoundEffect,0.5,2.5);
        }
    }
}