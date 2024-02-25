
import TorchIcon from '../assets/img/levels/level-3/icon-torch.png';
import StickIcon from '../assets/img/levels/level-3/icon-stick.png';
import Stick2Icon from '../assets/img/levels/level-3/icon-stick-2.png';
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



export const torchItem = {
    id:"torch",
    icon: TorchIcon,
    x: -390,
    y: 110,
    width: 114,
    height: 47,
    mergeWith: [],
    interactions: [
    ],
};


export const stick2Item = {
    id:"stick2",
    icon: Stick2Icon,
    x: -390,
    y: 110,
    width: 114,
    height: 47,
    mergeWith: [{ item: "lighter", newItem: torchItem, isBidirectional: true}],
    interactions: [
        
    ],
};


export const stickItem = {
    id:"stick",
    icon: StickIcon,
    x: -390,
    y: 110,
    width: 114,
    height: 47,
    mergeWith: [ { item: "towel", newItem: stick2Item, isBidirectional: true}],
    interactions: [
       
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