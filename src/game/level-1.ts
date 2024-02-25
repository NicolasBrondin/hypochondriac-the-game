import Level1BackgroundMusic from '../assets/sound/level-1.mp3';
import Level1BackgroundImage from '../assets/img/levels/level-1/background.png';

import KnockSoundEffect from '../assets/sound/effects/knock.mp3';

import BedsideTableSprite from '../assets/img/levels/level-1/bedside-table.png';
import PhotoSprite from '../assets/img/levels/level-1/photo.png';
import DrawerSprite from '../assets/img/levels/level-1/drawer.png';
import Doorknob from "../assets/img/levels/level-1/doorknob.png";
import CleanDoorknob from "../assets/img/levels/level-1/doorknob-clean.png";
import PortraitSprite from '../assets/img/levels/level-1/portrait.png';

import { gelItem } from './items';

export default {
    name: "Chambre",
    backgroundMusic: Level1BackgroundMusic,
    backgroundImage: Level1BackgroundImage,
    initialPlayerText: "Je dois sortir d'ici... Je ne suis pas folle !",
    items: [
        {
            id:"bedside-table",
            image: BedsideTableSprite,
            x: -390,
            y: -25,
            width: 217,
            height: 257,
            mergeWith: [],
            interactions: [],
            uses: []
        },
        {
            id:"photo",
            image: PhotoSprite,
            x: -390,
            y: -150,
            width: 90,
            height: 99,
            mergeWith: [],
            interactions: [
                {
                    actions: [
                        {
                            action: "photo",
                            value: PortraitSprite
                        }
                    ]
                }
            ],
            uses: []
        },
        {
            id:"bed",
            x: -25,
            y: 50,
            width: 400,
            height: 400,
            mergeWith: [],
            interactions: [
                {
                    actions: [{
                        action: "say", value: "Je pense que j'ai assez d'énergie pour m'enfuir..."
                    }]
                }
            ],
            uses: []
        },
        {
            id:"window",
            x: -680,
            y: -270,
            width: 250,
            height: 250,
            mergeWith: [],
            interactions: [
                {
                    actions: [
                        {
                            action: "say", value: "La fenêtre est trop solide et n'a pas de poignée... Dommage."
                        },
                        {
                            action: "sound-effect", value: KnockSoundEffect
                        }
                    ]
                }
            ],
            uses: []
        },
        gelItem,
        {
            id:"drawer",
            image: DrawerSprite,
            x: -390,
            y: 133,
            width: 213,
            height: 93,
            mergeWith: [],
            interactions: [
                { actions: [
                    {action: "state", value: "hidden"}
                ]
            }
            ],
            uses: []
        },
        {
        id:"door",
        image: Doorknob,
        stateImages: {
            dirty: Doorknob,
            clean: CleanDoorknob
        },
        x: 502,
        y: -204,
        width: 92,
        height: 92,
        state: "dirty",
        mergeWith: [],
        interactions: [
            { 
                stateCondition: "dirty", 
                actions: [
                    { action: "say", value: "Jamais je pourrais toucher un truc aussi sale !" },
                    { action: "emotion", value: "panic"},
                ]
            },
            { 
                stateCondition: "clean", 
                actions: [
                    { action: "win" }
                ] 
            }
        ],
        uses: [
            { 
                item: "gel", 
                stateCondition: "dirty", 
                actions: [
                    { action: "state", value: "clean"},
                    { action: "say", value: "Je pense que ça devrait le faire..."}
                ] 
            }
        ]
      },]
};