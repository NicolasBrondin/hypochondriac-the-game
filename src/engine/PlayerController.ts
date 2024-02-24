import { GameController, GameItem } from "./GameController";

export class PlayerController {
    text: string = "";
    inventory: GameItem[] = [];
    game: GameController;
    constructor(gameController: GameController){
        this.game = gameController;
    }

    say(text: string){
        this.text = text;
    }
}