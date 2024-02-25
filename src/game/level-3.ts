
import Level3BackgroundMusic from '../assets/sound/level-3.mp3';
import Level3BackgroundImage from '../assets/img/levels/level-3/background.png';
import LampSprite from '../assets/img/items/lamp.png';



import DoorTopSprite from '../assets/img/levels/level-3/door-top-right.png';
import DoorMiddleSprite from '../assets/img/levels/level-3/door-middle-center.png';
import DoorBottomSprite from '../assets/img/levels/level-3/door-bottom-right.png';

import DrawerTopLeftSprite from '../assets/img/levels/level-3/drawer-top-left.png';
import DrawerBottomLeftSprite from '../assets/img/levels/level-3/drawer-bottom-left.png';
import DrawerBottomRightSprite from '../assets/img/levels/level-3/drawer-bottom-right.png';

import ScissorsSprite from '../assets/img/levels/level-3/scissors.png';
import ScissorsIcon from '../assets/img/levels/level-3/icon-scissors.png';
import LighterSprite from '../assets/img/levels/level-3/lighter.png';
import LighterIcon from '../assets/img/levels/level-3/icon-lighter.png';
import KnifeSprite from '../assets/img/levels/level-3/knife.png';
import KnifeIcon from '../assets/img/levels/level-3/icon-knife.png';
import ForkSprite from '../assets/img/levels/level-3/fork.png';
import ForkIcon from '../assets/img/levels/level-3/icon-fork.png';
import TapeSprite from '../assets/img/levels/level-3/tape.png';
import TapeIcon from '../assets/img/levels/level-3/icon-tape.png';
import SmokeDetectorSprite from '../assets/img/levels/level-3/smoke-detector.png';
import JeanSprite from '../assets/img/levels/level-3/jean.png';


import { gelItem, stickItem } from './items';

export default {
    name: "Cuisine",
    backgroundMusic: Level3BackgroundMusic,
    backgroundImage: Level3BackgroundImage,
    initialPlayerText: "Je dois sortir d'ici... Je ne suis pas folle !",
    items: [
        {
            id:"fork",
            image: ForkSprite,
            icon: ForkIcon,
            x: 800,
            y: 100,
            width: 187,
            height: 41,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }]
          },
          {
            id:"tape",
            image: TapeSprite,
            icon: TapeIcon,
            x: 800,
            y: -230,
            width: 154,
            height: 148,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }]
          },
          {
            id:"knife",
            image: KnifeSprite,
            icon: KnifeIcon,
            x: 400,
            y: 400,
            width: 283,
            height: 48,
            mergeWith: [
                { item: "broom", newItem: stickItem, isBidirectional: true}
            ],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }],
          },
          {
            id:"lighter",
            image: LighterSprite,
            icon: LighterIcon,
            x: 0,
            y: 310,
            width: 111,
            height: 58,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }]
          },
          {
            id:"scissors",
            image: ScissorsSprite,
            icon: ScissorsIcon,
            x: 0,
            y: 240,
            width: 176,
            height: 58,
            mergeWith: [],
            interactions: [{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }]
          },
          {
            id:"jean",
            image: JeanSprite,
            x: 800,
            y: 270,
            width: 251,
            height: 167,
            mergeWith: [],
            interactions: [/*{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }*/]
          },
          {
            id:"smoke-detector",
            image: SmokeDetectorSprite,
            x: 200,
            y: -400,
            width: 106,
            height: 100,
            mergeWith: [],
            interactions: [/*{ 
                stateCondition: null,
                actions: [{
                    action: "take" 
                }]
            }*/],
            uses: [

            { 
                item: "torch", 
                actions: [
                    { action: "win"}
                ] 
            }
            ]
          },
        {
        id:"socket",
        x: -750,
        y: 220,
        width: "50",
        height: "50",
        mergeWith: [],
        interactions: [
            { 
                stateCondition: "clean", 
                actions: [
                    { action: "say", value: "Je n'ai rien à brancher..." }
                ] 
            }
        ],
        uses: [
            { 
                item: "fork", 
                actions: [
                    { action: "loose"}
                ] 
            }
        ]
      },
      {
        id:"door-top",
        image: DoorTopSprite,
        x: 812,
        y: -162,
        width: 444,
        height: 227,
        mergeWith: [],
        interactions: [{ 
            stateCondition: null,
            actions: [{
                action: "state",
                value: "hidden" 
            }]
        }]
    },{
        id:"door-middle",
        image: DoorMiddleSprite,
        x: 812,
        y: 60,
        width: 445,
        height: 227,
        mergeWith: [],
        interactions: [{ 
            stateCondition: null,
            actions: [{
                action: "state",
                value: "hidden" 
            }]
        }]
    },{
        id:"door-bottom",
        image: DoorBottomSprite,
        x: 812,
        y: 283,
        width: 445,
        height: 264,
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
        id:"drawer-top-left",
        image: DrawerTopLeftSprite,
        x: 25,
        y: 300,
        width: 370,
        height: 107,
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
        id:"drawer-bottom-left",
        image: DrawerBottomLeftSprite,
        x: 25,
        y: 400,
        width: 370,
        height: 107,
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
        id:"drawer-bottom-right",
        image: DrawerBottomRightSprite,
        x: 400,
        y: 420,
        width: 400,
        height: 107,
        mergeWith: [],
        interactions: [{ 
            stateCondition: null,
            actions: [{
                action: "state",
                value: "hidden" 
            }]
        }]
    },/*,{
        id:"lamp2",
        image: LampSprite,
        x: "200",
        y: "320",
        width: "50",
        height: "50",
        mergeWith: [
            { item: "lamp", isBidirectional: true, newItem: gelItem, shouldRemoveItem: true}
        ],
        interactions: [{ 
            stateCondition: null,
            actions: [{
                action: "take" 
            }]
        }]
      }*/
    ]
}