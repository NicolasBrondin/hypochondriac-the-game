import Level1BackgroundMusic from '../assets/sound/level-1.mp3';
import Level2BackgroundMusic from '../assets/sound/level-2.mp3';
import Level3BackgroundMusic from '../assets/sound/level-3.mp3';
import Level1BackgroundImage from '../assets/img/levels/level-1.png';
import Level2BackgroundImage from '../assets/img/levels/level-2.png';
import Level3BackgroundImage from '../assets/img/levels/level-3.png';
import LampSprite from '../assets/img/items/lamp.png';
import GelSprite from '../assets/img/items/gel.png';
import ForkSprite from '../assets/img/items/fork.png';


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
        backgroundImage: Level1BackgroundImage,
        initialPlayerText: "Je dois sortir d'ici... Je ne suis pas folle !",
        items: [{
            id:"door",
            x: "0",
            y: "-300",
            width: "400",
            height: "500",
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
            x: "350",
            y: "-50",
            width: "130",
            height: "130",
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
            x: "-700",
            y: "90",
            width: "100",
            height: "100",
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
        name: "Toilettes",
        backgroundMusic: Level2BackgroundMusic,
        backgroundImage: Level2BackgroundImage,
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
          }]
    },
    {
        name: "Cuisine",
        backgroundMusic: Level3BackgroundMusic,
        backgroundImage: Level3BackgroundImage,
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