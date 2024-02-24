import { GameController } from "./GameController";

export class PlayerController {
    text: string = "";
    game: GameController;
    constructor(gameController: GameController){
        this.game = gameController;
    }

    say(text: string){
        this.text = text;
    }
}