import Level1BackgroundMusic from '../assets/sound/level-1.mp3';

import LampSprite from '../assets/img/items/lamp.png';
import GelSprite from '../assets/img/items/gel.png';


const gelItem = {
    id:"gel",
    image: GelSprite,
    x: "650",
    y: "220",
    width: "50",
    height: "50",
    mergeWith: [],
    interactions: [],
};

export default [
    {
        name: "Chambre",
        backgroundMusic: Level1BackgroundMusic,
        initialPlayerText: "Je dois sortir d'ici... Je ne suis pas folle !",
        items: [{
            id:"door",
            x: "100",
            y: "150",
            width: "50",
            height: "50",
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
          },{
            id:"lamp",
            image: LampSprite,
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
          }]
    },
    {
        name: "Cuisine",
        backgroundMusic: Level1BackgroundMusic,
        initialPlayerText: "Je dois sortir d'ici... Je ne suis pas folle !",
        items: [{
            id:"door",
            x: "100",
            y: "150",
            width: "50",
            height: "50",
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
          },{
            id:"lamp",
            image: LampSprite,
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
          }]
    }
]