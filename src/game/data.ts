import Level1BackgroundMusic from '../assets/sound/level-1.mp3';

import LampSprite from '../assets/img/items/lamp.png';
import GelSprite from '../assets/img/items/gel.png';


const gelItem = {
    id:"lamp",
    image: GelSprite,
    x: "650",
    y: "220",
    width: "50",
    height: "50",
    mergeWith: []
};

export default [
    {
        name: "hospital-bedroom",
        backgroundMusic: Level1BackgroundMusic,
        initialPlayerText: "Je dois sortir d'ici... Je ne suis pas folle !",
        items: [{
            id:"lamp",
            image: LampSprite,
            x: "650",
            y: "220",
            width: "50",
            height: "50",
            mergeWith: []
          },{
            id:"lamp2",
            image: LampSprite,
            x: "200",
            y: "320",
            width: "50",
            height: "50",
            mergeWith: [
                { item: "lamp", isBidirectional: true, newItem: gelItem, shouldRemoveItem: true}
            ]
          }]
    }
]