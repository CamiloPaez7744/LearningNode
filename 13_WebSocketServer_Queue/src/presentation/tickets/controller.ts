import type { Request, Response } from "express";
import type { TicketService } from "../services";



export class TicketController {
  private readonly ticketService: TicketService;

  constructor(ticketService: TicketService) {
    this.ticketService = ticketService;
  }

  public getTickets = async (req: Request, res: Response) => {
    res.json(await this.ticketService.tickets);
  }

  public getLastTicket = async (req: Request, res: Response) => {
    res.json(this.ticketService.lastTicketNumber);
  }

    public getPendingTickets = async (req: Request, res: Response) => {
        res.json(this.ticketService.pendingTickets);
    }

    public createTicket = async (req: Request, res: Response) => {
        res.json(await this.ticketService.createTicket());
    }

    public drawTicket = async (req: Request, res: Response) => {
      const { desk } = req.params;
        res.json(await this.ticketService.drawTicket(desk));
    }

    public doneTicket = async (req: Request, res: Response) => {
        res.json(await this.ticketService.onFinishedTicket(req.params.ticketId));
    }

    public getWorkingOn = async (req: Request, res: Response) => {
        res.json(this.ticketService.lastWorkingOnTickets);
    }
}