import React, { useState, useEffect } from "react";
import ChessHubConnectionFactory from "../services/chess-hub-connection-factory";
import ChessHubHandler from "../services/chess-hub-receiver-handler";

const ChessPlayer = () => {
    const [connection, setConnection] = useState(null);
    const [inputText, setInputText] = useState("");

    const connectionFactory = new ChessHubConnectionFactory();
    const chessHubHandler = new ChessHubHandler();

    useEffect(() => {
        setConnection(connectionFactory.createConnection());
    }, []);

    useEffect(() => {
        if (connection) {
            chessHubHandler.startConnection(connection);
        }
    }, [connection]);

    const makeMove = async () => {
        if (connection) {
            await chessHubHandler.makeMove(inputText);
        }  

        setInputText("");
    };

    return (
        <>
            <input
                value={inputText}
                onChange={(input) => {
                    setInputText(input.target.value);
                }}
            />
            <button onClick={makeMove} type="primary">
                Send
            </button>
        </>
    );

}

export default ChessPlayer;