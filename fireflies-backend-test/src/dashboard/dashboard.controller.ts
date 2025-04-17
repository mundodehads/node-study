import { Router, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../models/auth.model";
import DashboardService from "./dashboard.service";

class DashboardController {
  public router = Router();

  constructor(private dashboardService: DashboardService) {
    this.router.get("/", this.getDashboard);
  }

  private getDashboard = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await this.dashboardService.getDashboard();
      res.json(response);
      return;
    } catch (err) {
      return next();
    }
  };
}

export default (dashboardService: DashboardService) =>
  new DashboardController(dashboardService).router;
