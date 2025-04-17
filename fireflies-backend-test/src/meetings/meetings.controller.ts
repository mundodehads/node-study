import express from "express";
import MeetingsService from "./meetings.service";
import { AuthenticatedRequest } from "../models/auth.js";

class MeetingsController {
  public router = express.Router();
  private meetingsService = new MeetingsService();

  constructor() {
    // GET all meetings for user
    this.router.get("/", this.getMeetings);
    // TODO: implement other endpoints
    this.router.get("/stats", this.getStats);
  }

  private getMeetings = async (req: AuthenticatedRequest, res: any) => {
    try {
      const response = await this.meetingsService.getMeetings();
      res.json({
        total: response.length,
        limit: req.query.limit,
        page: req.query.page,
        data: response,
      });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  private getStats = async (req: AuthenticatedRequest, res: any) => {
    try {
      const stats = await this.meetingsService.getStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };
}

export default new MeetingsController().router;
