import { AudioController } from './AudioController';
import TakeSoundEffect from '../assets/sound/effects/take.mp3';
import CraftSoundEffect from '../assets/sound/effects/craft.mp3';
import WinSoundEffect from '../assets/sound/effects/win.mp3';
import ClickSoundEffect from '../assets/sound/effects/click.mp3';
import FailSoundEffect from '../assets/sound/effects/incorrect.mp3';
import { PlayerController } from './PlayerController';
import gameData from '../game/data';


type MergeRule = { 
    item: string; 
    isBidirectional: boolean; 
    newItem: GameItem;
    shouldRemoveItem: boolean;
}

type UseRule = {
    item: string;
    stateCondition: string;
    actions: Action[];
}

type InteractionRule = {
    stateCondition?: string;
    actions: Action[];
}

type Action = {
    action: string;
    value?: string;
}

export type GameItem = {
    id: string;
    state?: string;
    mergeWith: MergeRule[],
    interactions: InteractionRule[]
    uses: UseRule[]
}

export type GameLevel = {
    name: string;
    items: GameItem[];
    backgroundMusic: any;
    initialPlayerText: string;
}

export class GameController {

    levels: GameLevel[] = gameData;
    currentLevelIndex?: number = 0;
    currentLevel?: GameLevel;
    onLevelLoaded: any = null;
    audio: AudioController;
    player: PlayerController;

    constructor(onLevelLoaded: any){
        this.onLevelLoaded = onLevelLoaded;
        this.audio = new AudioController(this);
        this.player = new PlayerController(this);
        this.loadLevel(0);
    }

    start(){

    }

    loadLevel(id: number){
        this.onLevelLoaded();
        this.currentLevelIndex = id;
        this.currentLevel = this.levels[this.currentLevelIndex];
        if(this.currentLevel){
            this.audio.playBackgroundAudio(this.currentLevel.backgroundMusic);
            this.player.say(this.currentLevel.initialPlayerText);
        }
    }

    finishCurrentLevel(){
        this.audio.playEffectAudio(WinSoundEffect);
        this.loadLevel(this.currentLevelIndex+1);
    }

    interactWithItem(item: GameItem){
        item.interactions.forEach((rule)=>{
            if(!rule.stateCondition || (rule.stateCondition === item.state)){
                rule.actions.forEach((action)=>{
                    if(action.action === "take"){
                        this.takeItem(item);
                    } else if(action.action === "state"){
                        item.state = action.value;
                    } else if(action.action === "say"){
                        this.player.say(action.value as string);
                    } else if(action.action === "emotion"){
                        this.player.setEmotion(action.value);
                    } else if(action.action === "win"){
                        this.finishCurrentLevel();
                    } else {
                        this.audio.playEffectAudio(ClickSoundEffect);
                    }
                })
                
            }
        });
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

    useItems(sceneItem: GameItem, inventoryItem: GameItem){
        let used = false;
        sceneItem.uses.forEach((rule)=>{
            if(rule.item === inventoryItem.id){
                if(!rule.stateCondition || (rule.stateCondition === sceneItem.state)){
                    used = true;
                    rule.actions.forEach((action)=>{
                        if(action.action === "say"){
                            this.player.say(action.value as string);
                        } else if(action.action === "state"){
                            sceneItem.state = action.value;
                        } else if(action.action === "emotion"){
                            this.player.setEmotion(action.value);
                        } else if(action.action === "win"){
                            this.finishCurrentLevel();
                        } else {
                            this.audio.playEffectAudio(ClickSoundEffect);
                        }
                    })
                }
            }
        });
        if(used){
            this.audio.playEffectAudio(CraftSoundEffect); 
        } else {
            this.audio.playEffectAudio(FailSoundEffect);
        }
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