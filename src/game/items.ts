
import GelIcon from '../assets/img/levels/level-1/icon-gel.png';
import GelSprite from '../assets/img/levels/level-1/gel.png';

import BlockSprite from '../assets/img/levels/level-2/block.png';

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

export const blockItem = {
    id:"block",
    image: BlockSprite,
    x: -275,
    y: 40,
    width: 166,
    height: 105,
    mergeWith: [],
    interactions: []
};