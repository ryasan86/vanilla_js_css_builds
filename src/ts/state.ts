class State {
    isPaused = false;

    togglePause = (): void => {
        this.isPaused = !this.isPaused;
    };

    setPause = (bool: boolean): void => {
        this.isPaused = bool;
    };
}

export default State;
