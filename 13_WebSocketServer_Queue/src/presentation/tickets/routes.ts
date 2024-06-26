import { Router } from "express";
import { TicketController } from "./controller";
import { TicketService } from "../services";



export class TicketRoutes {
  
  static get routes() {
    const router = Router();
    const ticketService = new TicketService();
    const ticketController = new TicketController(ticketService);

    router.get('/', ticketController.getTickets);
    router.get('/last', ticketController.getLastTicket);
    router.get('/pending', ticketController.getPendingTickets);
    router.post('/', ticketController.createTicket);

    router.get('/draw/:desk', ticketController.drawTicket);
    router.put('/done/:ticketId/', ticketController.doneTicket);

    router.get('/working-on', ticketController.getWorkingOn);

    return router;
  }
}