import React, { useState, useEffect } from "react";

import Chessboard from "chessboardjsx";
import ChessHubConnectionFactory from "../services/chess-hub-connection-factory";
import ChessHubReceiverHandler from "../services/chess-hub-receiver-handler";
const Chess = require("chess.js");

const ReactiveChessBoard = () => {
    const [connection, setConnection] = useState(null);
    const [inputText, setInputText] = useState("");
    const [nextMovePlayer, setNextMovePlayer] = useState('b');
    const [gameIsOver, setGameIsOver] = useState(false);

    const [chess] = useState(new Chess());
    const [fen, setFen] = useState(chess.fen());
    const connectionFactory = new ChessHubConnectionFactory();
    const chessHubReceiverHandler = new ChessHubReceiverHandler();

    useEffect(() => {
        setConnection(connectionFactory.createConnection());
    }, []);

    useEffect(() => {
        if (connection) {
            chessHubReceiverHandler
                .handleStartAndReceive(connection, (message) => {
                    let move = message.split(",");
                    handleMove({ from: move[0], to: move[1], promotion: 'q'});
                });
        }
    }, [connection]);

    const handleMove = (move) => {
        if (chess.move(move)) {
            setFen(chess.fen());
        }

        if (chess.game_over()) {
            handleGameOver();
        }

    };

    const handleGameOver = () => {
        if (chess.game_over()) {
            setGameIsOver(true);
            setNextMovePlayer(chess.turn());
        }
    }

    return (
        <div className="flex-center">
            <Chessboard
                width={400}
                position={fen}
                onDrop={(move) =>
                    handleMove({
                        from: move.sourceSquare,
                        to: move.targetSquare,
                        promotion: "q",
                    })
                }
            />
            <div class="panel panel-default">
                <div className="panel-heading">
                    <b>Game is Over</b>
                </div>

                <div className="panel-body">
                    Panel content
                </div>
            </div>
        </div>
    );
}

export default ReactiveChessBoard;