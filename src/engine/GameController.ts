import { AudioController } from './AudioController';
import TakeSoundEffect from '../assets/sound/effects/take.mp3';
import CraftSoundEffect from '../assets/sound/effects/craft.mp3';
import { PlayerController } from './PlayerController';
import gameData from '../game/data';


type MergeRule = { 
    item: string; 
    isBidirectional: boolean; 
    newItem: GameItem;
    shouldRemoveItem: boolean;
}

export type GameItem = {
    id: string;
    mergeWith: MergeRule[]
}

export type GameLevel = {
    items: GameItem[];
    backgroundMusic: any;
    initialPlayerText: string;
}

export class GameController {

    levels: GameLevel[] = gameData;
    currentLevel?: GameLevel;
    ui = null;
    audio: AudioController;
    player: PlayerController;

    constructor(uiController: any){
        this.ui = uiController;
        this.audio = new AudioController(this);
        this.player = new PlayerController(this);
        this.loadLevel(0);
    }

    start(){
    }

    loadLevel(id: number){
        this.currentLevel = this.levels[id];
        if(this.currentLevel){
            this.audio.playBackgroundAudio(this.currentLevel.backgroundMusic);
            this.player.say(this.currentLevel.initialPlayerText);
        }
    }

    interactWithItem(item: GameItem){
        this.takeItem(item);
    }

    mergeItems(item1: GameItem, item2: GameItem){
        let mergeRule;
        mergeRule = item1.mergeWith.find(rule => rule.item === item2.id);
        if(!mergeRule){
            mergeRule = item2.mergeWith.find(rule => rule.item === item1.id && rule.isBidirectional);
        }
        if(mergeRule){
            this.audio.playEffectAudio(CraftSoundEffect);
            this.player.say("J'ai fusionné deux items !");
            this.player.inventory.push({...mergeRule.newItem});
            if(mergeRule.shouldRemoveItem){
                const index1 = this.player.inventory.findIndex(i => i.id === item1.id);
                this.player.inventory.splice(index1, 1);
                const index2 = this.player.inventory.findIndex(i => i.id === item2.id);
                this.player.inventory.splice(index2, 1);
            }
        }
    }

    useItems(item1: GameItem, item2: GameItem){
        this.audio.playEffectAudio(CraftSoundEffect);
        this.player.say("J'ai utilisé un item !");
    }

    takeItem(item: GameItem){
        this.player.inventory.push(item);
        const index = this.currentLevel?.items.findIndex(it=>it.id === item.id);
        if(index > -1)
        this.currentLevel?.items.splice(index, 1);
        this.audio.playEffectAudio(TakeSoundEffect);
        this.player.say("J'ai pris un item!");
    }

    destroy(){
        this.audio.destroy();
    }
}