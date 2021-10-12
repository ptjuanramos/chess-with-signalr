import { HubConnectionBuilder } from "@microsoft/signalr";

export default class ChessHubConnectionFactory {

    createConnection() {
        let connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44359/hubs/notifications")
            .withAutomaticReconnect()
            .build();

        return connection;
    }

}