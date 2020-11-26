class State {
    isPaused = true;
    gameIsOver = false;

    togglePause = (): void => {
        this.isPaused = !this.isPaused;
    };

    setPause = (bool: boolean): void => {
        this.isPaused = bool;
    };

    setGameIsOver = (bool: boolean): void => {
        this.setPause(bool);
        this.gameIsOver = bool;
    };
}

export default State;
