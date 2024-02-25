import { GameController } from './GameController';
export class AudioController {

    backgroundAudioSource = new Audio();
    effectAudioSource = new Audio();
    game: GameController;

    constructor(gameController: GameController){
        this.backgroundAudioSource.loop = true;
        this.game = gameController;
    }

    playBackgroundAudio(source: any){
        this.backgroundAudioSource.src = source;
        this.backgroundAudioSource.play();
    }

    pauseBackgroundAudio(){
        this.backgroundAudioSource.pause();
    }

    playEffectAudio(source: any, volume?: number, speed?: number){
        this.effectAudioSource.src = source;
        if(volume != null){
            this.effectAudioSource.volume = volume;
        } else {
            this.effectAudioSource.volume = 1.0;
        }
        if(speed != null){
            this.effectAudioSource.playbackRate = speed;
        } else {
            this.effectAudioSource.playbackRate = 1.0;
        }
        this.effectAudioSource.play();
    }

    pauseEffectAudio(){
        this.backgroundAudioSource.pause();
    }

    destroy(){
        this.backgroundAudioSource.src = null;
        this.effectAudioSource.src = null;
        this.backgroundAudioSource = null;
        this.effectAudioSource = null;
    }
}