
import GelIcon from '../assets/img/levels/level-1/icon-gel.png';
import GelSprite from '../assets/img/levels/level-1/gel.png';

export const gelItem = {
    id:"gel",
    image: GelSprite,
    icon: GelIcon,
    x: -390,
    y: 110,
    width: 114,
    height: 47,
    mergeWith: [],
    interactions: [
        {
            actions: [
                { action: "take"}
            ]
        }
    ],
};