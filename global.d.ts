interface ConnectFour {
    deepClone: (arr: any[]) => any[];
    checkForWinner: (board: (string | null)[][]) => string | null;
}

interface Window {
    connectFour: ConnectFour;
}
