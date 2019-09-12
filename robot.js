class Game {
    constructor(mapSize, initPosition, icon) {
        this.state = {
            robotPosition: initPosition,
            mapSize: mapSize,
            icon: icon
        };
    }

    availablePosition(newPosition, mapSize) {
        if (newPosition >= 0 && newPosition < mapSize) {
            return true;
        } else {
            return false;
        }
    }

    move(newPosition) {
        if (this.availablePosition(newPosition, this.state.mapSize)) {
            this.state.robotPosition = newPosition;
            this.render();
            return true;
        } else {
            return false;
        }
    }

    render() {
        return this.state.icon + ' ' + this.state.robotPosition;
    }

    onCommandRight() {
        this.move(this.state.robotPosition + 1);
    }

}

class GameMachine extends Game {
    constructor(mapSize, initPosition, icon) {
        super(mapSize, initPosition, icon);
        this.on = true;
    }

    start() {
        this.on = true;
    }

    stop() { 
        this.on = false;
    }

    render() {
        if (this.on) {
            return super.render();
        } else {
            return 'You need to start the machine first.'
        }
    }
}

let game = new GameMachine(10, 2, 'R');
game.render();


var stdin = process.openStdin();

stdin.addListener("data", function (d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    let command = d.toString().trim();

    if (command === 'start') {
        game = new GameMachine(5, 0, 'R');
    } else if (command === 'left') {
        game.onCommandLeft();
    } else if (command === 'right') {
        game.onCommandRight();
    } else if (command === 'report') {
        console.log(game.render());
    } else if (command === 'stop') {
        game.stop();
    }
});