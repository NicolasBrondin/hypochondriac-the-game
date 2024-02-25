import { AudioController } from './AudioController';
import TakeSoundEffect from '../assets/sound/effects/take.mp3';
import CraftSoundEffect from '../assets/sound/effects/craft.mp3';
import WinSoundEffect from '../assets/sound/effects/win.mp3';
import ClickSoundEffect from '../assets/sound/effects/click.mp3';
import FailSoundEffect from '../assets/sound/effects/incorrect.mp3';
import LooseSoundEffect from '../assets/sound/effects/loose.mp3';
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
    uses: UseRule[];
    x: number;
    y: number;
    width: number;
    height: number; //reference is 1920/1080
}

export type GameLevel = {
    name: string;
    items: GameItem[];
    backgroundMusic: any;
    backgroundImage: any;
    initialPlayerText: string;
}

export class GameController {

    levels: GameLevel[] = gameData;
    currentLevelIndex?: number = 0;
    currentLevel?: GameLevel;
    onLevelLoaded: any = null;
    audio: AudioController;
    player: PlayerController;
    playgroundSize: { width: number; height: number } = { width: 0, height: 0};
    playgroundSourceSize: { width: number; height: number } = { width: 1920, height: 1080};
    photoOverlayContent?: any;

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

            this.player.say(this.currentLevel.initialPlayerText);
            setTimeout(()=>{
                this.audio.playBackgroundAudio(this.currentLevel!.backgroundMusic);
            }, 1000);
        }
    }

    finishCurrentLevel(){
        if(this.currentLevelIndex != null){
            this.audio.playEffectAudio(WinSoundEffect);
            if(this.currentLevelIndex < this.levels.length -1){
                this.loadLevel(this.currentLevelIndex+1);
            } else {
                this.onLevelLoaded(true, "won");
            }
        }
        
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
                        this.player.setEmotion(action.value as string);
                    } else if(action.action === "sound-effect"){
                        this.audio.playEffectAudio(action.value as any);
                    } else if(action.action === "photo"){
                        this.photoOverlayContent = action.value;
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
        let customSoundEffect = false;
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
                            this.player.setEmotion(action.value as string);
                        } else if(action.action === "win"){
                            this.finishCurrentLevel();
                            customSoundEffect = true;
                        } else if(action.action === "add-item"){
                            //@ts-ignore
                            this.currentLevel.items.push(action.value);
                        }else if(action.action === "loose"){
                            customSoundEffect = true;
                            this.audio.playEffectAudio(LooseSoundEffect);
                            setTimeout(()=>{
                                this.onLevelLoaded(true,"lost");
                            }, 1000);
                        } else {
                            this.audio.playEffectAudio(ClickSoundEffect);
                        }
                    })
                }
            }
        });
        if(used && !customSoundEffect){
            this.audio.playEffectAudio(CraftSoundEffect); 
        } else if(!customSoundEffect) {
            this.audio.playEffectAudio(FailSoundEffect);
        }
    }

    takeItem(item: GameItem){
        if(this.currentLevel){
            this.player.inventory.push(item);
            const index: number = this.currentLevel.items.findIndex(it=>it.id === item.id);
            if(index > -1) {
                this.currentLevel?.items.splice(index, 1);
                this.audio.playEffectAudio(TakeSoundEffect);
            }
        }
    }

    refreshSize(width: number, height: number){
        this.playgroundSize = {height, width: height * (16/9)}
    }

    destroy(){
        this.audio.destroy();
    }
}