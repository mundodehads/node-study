import { Router, Response, NextFunction, RequestHandler } from "express";
import MeetingsService from "./meetings.service";
import { AuthenticatedRequest } from "../models/auth.model";
import { validateDto } from "../middlewares/validate.middleware";
import { CreateMeetingDto } from "./dto/meeting.dto";
import { UpdateTranscriptDto } from "./dto/transcript.dto";

class MeetingsController {
  public router = Router();

  constructor(private meetingsService: MeetingsService) {
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

  private getMeetings = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
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
      return;
    } catch (err) {
      return next(err);
    }
  };

  private getStats = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const stats = await this.meetingsService.getStats();

      res.json(stats);
      return;
    } catch (err) {
      return next(err);
    }
  };

  private createMeeting = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const meeting = await this.meetingsService.createMeeting(req.body);

      res.status(201).json(meeting);
      return;
    } catch (err) {
      return next(err);
    }
  };

  private getMeetingById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const meeting = await this.meetingsService.getMeetingById(req.params.id);

      if (!meeting) {
        res.status(404).json({ message: "Meeting not found" });
        return;
      }

      res.json(meeting);
      return;
    } catch (err) {
      return next(err);
    }
  };

  private updateTranscript = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedMeeting = await this.meetingsService.updateTranscript(
        req.params.id,
        req.body.transcript
      );

      if (!updatedMeeting) {
        res.status(404).json({ message: "Meeting not found" });
        return;
      }

      res.json(updatedMeeting);
      return;
    } catch (err) {
      return next(err);
    }
  };

  private summarizeMeeting = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const summary = await this.meetingsService.summarizeMeeting(
        req.params.id
      );

      if (!summary) {
        res.status(404).json({ message: "Meeting not found" });
        return;
      }

      res.json(summary);
      return;
    } catch (err) {
      return next(err);
    }
  };
}

export default (meetingsService: MeetingsService) =>
  new MeetingsController(meetingsService).router;
