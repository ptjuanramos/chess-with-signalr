export default class ChessHubReceiverHandler {

    startConnection(connection) {
        return connection
            .start()
            .catch((error) => console.log(error));
    }

    handleStartAndReceive(connection, receiverhandler) {
        connection
            .start()
            .then(() => {
                connection.on("ReceiveMove", (message) => {
                    receiverhandler(message);
                });
            });
    }

}