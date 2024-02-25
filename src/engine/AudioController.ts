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
        this.backgroundAudioSource.volume = 0.1;
        this.backgroundAudioSource.play();
        this.backgroundAudioSource.volume = 0.1;
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
        //@ts-ignore
        this.backgroundAudioSource.src = null;
        //@ts-ignore
        this.effectAudioSource.src = null;
        //@ts-ignore
        this.backgroundAudioSource = null;
        //@ts-ignore
        this.effectAudioSource = null;
    }
}