import Level2BackgroundMusic from '../assets/sound/level-2.mp3';
import Level2BackgroundImage from '../assets/img/levels/level-2/background.png';
import FlushSoundEffect from '../assets/sound/effects/flush.mp3';

import ToiletPaperSprite from '../assets/img/levels/level-2/toilet-paper.png';
import TowelSprite from '../assets/img/levels/level-2/towel.png';
import GlovesSprite from '../assets/img/levels/level-2/gloves.png';
import BlouseSprite from '../assets/img/levels/level-2/blouse.png';
import BroomSprite from '../assets/img/levels/level-2/broom.png';
import DoorSprite from '../assets/img/levels/level-2/door.png';
import LampSprite from '../assets/img/items/lamp.png';
import ForkSprite from '../assets/img/items/fork.png';

import TowelIcon from '../assets/img/levels/level-2/icon-towel.png';
import ToiletPaperIcon from '../assets/img/levels/level-2/icon-toilet-paper.png';
import BlouseIcon from '../assets/img/levels/level-2/icon-blouse.png';
import BroomIcon from '../assets/img/levels/level-2/icon-broom.png';
import GlovesIcon from '../assets/img/levels/level-2/icon-gloves.png';
import { blockItem } from './items';

export default {
    name: "Toilettes",
    backgroundMusic: Level2BackgroundMusic,
    backgroundImage: Level2BackgroundImage,
    initialPlayerText: "Il y a des gens dans le couloir, je dois faire diversion...",
    items: [
        {
            id:"toilet-paper",
            image: ToiletPaperSprite,
            icon: ToiletPaperIcon,
            x: -110,
            y: -5,
            width: 102,
            height: 161,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }]
        },{
            id:"towel",
            image: TowelSprite,
            icon: TowelIcon,
            x: 150,
            y: -337,
            width: 184,
            height: 251,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }]
        },
        {
            id:"gloves",
            image: GlovesSprite,
            icon: GlovesIcon,
            x: 400,
            y: 150,
            width: 102,
            height: 95,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }]
        },
        {
            id:"blouse",
            image: BlouseSprite,
            icon: BlouseIcon,
            x: 650,
            y: -230,
            width: 216,
            height: 358,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }]
        },
        {
            id:"broom",
            image: BroomSprite,
            icon: BroomIcon,
            x: -700,
            y: -180,
            width: 127,
            height: 498,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }]
        },
        
        ,{
            id:"door",
            image: DoorSprite,
            x: 680,
            y: -272,
            width: 315,
            height: 525,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "state",
                    value: "hidden" 
                }]
            }]
        },
      {
        id:"toilet",
        x: "-275",
        y: "-150",
        width: "150",
        height: "300",
        state: "empty",
        mergeWith: [],
        interactions: [
            { 
                stateCondition: "empty",
                actions: [
                    { action: "say", value: "Si je bouchais les toilettes, ça pourrait faire diversion..." }
                ]
            },
            { 
                stateCondition: "full",
                actions: [
                    { action: "say", value: "Jamais je pourrais toucher un truc aussi sale !" },
                    { action: "emotion", value: "panic"}
                ]
            }
        ],
        uses: [
            { 
                item: "toilet-paper", 
                stateCondition: "empty", 
                actions: [
                    { action: "state", value: "full"},
                    { action: "add-item", value: blockItem}
                ] 
            },
            {
                stateCondition: "full", 
                item: "gloves",
                actions: [
                    { action: "win"}
                ] 
            },
            {
                stateCondition: "empty", 
                item: "gloves",
                actions: [
                    { action: "say", value: "La chasse se tire, mais les toilettes ne sont pas bouchés..."},
                    { action: "sound-effect", value: FlushSoundEffect}
                ] 
            }
        ]
      }/*,{
        id:"fork",
        image: ForkSprite,
        x: "650",
        y: "220",
        width: "50",
        height: "50",
        mergeWith: [],
        interactions: [{ 
            stateCondition: null,
            actions: [{
                action: "take" 
            }]
        }]
      },{
        id:"socket",
        image: LampSprite,
        x: "200",
        y: "320",
        width: "50",
        height: "50",
        mergeWith: [],
        interactions: [],
        uses: [
            { 
                item: "fork", 
                stateCondition: null, 
                actions: [
                    { action: "loose"},
                ] 
            }
        ]
      }*/]
};