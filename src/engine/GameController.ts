import { AudioController } from './AudioController';
import BackgroundMusic from '../assets/sound/level-1.mp3';
import TakeSoundEffect from '../assets/sound/effects/take.mp3';
import CraftSoundEffect from '../assets/sound/effects/craft.mp3';
import { PlayerController } from './PlayerController';

export type GameItem = {
    id: string;
}

export class GameController {

    ui = null;
    audio: AudioController;
    player: PlayerController;

    constructor(uiController: any){
        this.ui = uiController;
        this.audio = new AudioController(this);
        this.player = new PlayerController(this);
        this.start();
    }

    start(){
        this.audio.playBackgroundAudio(BackgroundMusic);
    }

    interactWithItem(item: GameItem){
        this.takeItem(item);
    }

    mergeItems(item1: GameItem, item2: GameItem){
        this.audio.playEffectAudio(CraftSoundEffect);
        this.player.say("J'ai fusionné deux items !");
    }

    useItems(item1: GameItem, item2: GameItem){
        this.audio.playEffectAudio(CraftSoundEffect);
        this.player.say("J'ai utilisé un item !");
    }

    takeItem(item: GameItem){
        this.audio.playEffectAudio(TakeSoundEffect);
        this.player.say("J'ai pris un item!");
    }

    destroy(){
        this.audio.destroy();
    }
}