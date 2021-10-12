using Chess.With.SignalR.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chess.With.SignalR
{
    public class BoardHub : Hub
    {
        public async Task MakeMove(string message)
        {
            await Clients.All.SendAsync("ReceiveMove", message);
        }
    }
}
