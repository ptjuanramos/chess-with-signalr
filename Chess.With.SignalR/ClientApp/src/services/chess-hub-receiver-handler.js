export default class ChessHubHandler {

    startConnection(connection) {
        return connection
            .start()
            .catch((error) => console.log(error));
    }

    startAndReceive(connection, receiverhandler) {
        connection
            .start()
            .then(() => {
                connection.on("ReceiveMove", (message) => {
                    receiverhandler(message);
                });
            });
    }

    async makeMove(connection, move) {
        await connection.send("MakeMove", move);
    }

}