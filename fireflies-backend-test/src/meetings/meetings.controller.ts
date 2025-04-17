import express from "express";
import MeetingsService from "./meetings.service";
import { AuthenticatedRequest } from "../models/auth.js";

class MeetingsController {
  public router = express.Router();
  private meetingsService = new MeetingsService();

  constructor() {
    // GET all meetings for user
    this.router.get("/", this.getMeetings);
    //POST /api/meetings
    //GET /api/meetings/:id
    //PUT /api/meetings/:id/transcript
    //POST /api/meetings/:id/summarize
    // TODO: implement other endpoints
    this.router.get("/stats", this.getStats);
  }

  private getMeetings = async (req: AuthenticatedRequest, res: any) => {
    try {
      const limit = parseInt((req.query.limit as string) || "10");
      const page = parseInt((req.query.page as string) || "1");

      const response = await this.meetingsService.getMeetings(limit, page);

      res.json({
        total: response.length,
        limit,
        page,
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
