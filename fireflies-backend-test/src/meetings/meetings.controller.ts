import { Router, Response } from "express";
import MeetingsService from "./meetings.service";
import { AuthenticatedRequest } from "../models/auth.model";
import { validateDto } from "../middlewares/validate.middleware";
import { CreateMeetingDto } from "./dto/meeting.dto";
import { UpdateTranscriptDto } from "./dto/transcript.dto";

class MeetingsController {
  public router = Router();
  private meetingsService = new MeetingsService();

  constructor() {
    this.router.get("/", this.getMeetings);
    this.router.get("/stats", this.getStats);

    this.router.post("/", validateDto(CreateMeetingDto), this.createMeeting);
    this.router.get("/:id", this.getMeetingById);
    this.router.put(
      "/:id/transcript",
      validateDto(UpdateTranscriptDto),
      this.updateTranscript
    );
    this.router.post("/:id/summarize", this.summarizeMeeting);
  }

  private getMeetings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const limit = parseInt((req.query.limit as string) || "10");
      const page = parseInt((req.query.page as string) || "1");

      const response = await this.meetingsService.getMeetings(limit, page);

      return res.json({
        total: response.length,
        limit,
        page,
        data: response,
      });
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  };

  private getStats = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const stats = await this.meetingsService.getStats();

      return res.json(stats);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  };

  private createMeeting = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const meeting = await this.meetingsService.createMeeting(req.body);

      return res.status(201).json(meeting);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  };

  private getMeetingById = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const meeting = await this.meetingsService.getMeetingById(req.params.id);

      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }

      return res.json(meeting);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  };

  private updateTranscript = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    try {
      const updatedMeeting = await this.meetingsService.updateTranscript(
        req.params.id,
        req.body.transcript
      );

      if (!updatedMeeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }

      return res.json(updatedMeeting);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  };

  private summarizeMeeting = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    try {
      const summary = await this.meetingsService.summarizeMeeting(
        req.params.id
      );

      if (!summary) {
        return res.status(404).json({ message: "Meeting not found" });
      }

      return res.json(summary);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  };
}

export default new MeetingsController().router;
