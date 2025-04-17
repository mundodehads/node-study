import { Router, Response } from "express";
import { AuthenticatedRequest } from "../models/auth";
import DashboardService from "./dashboard.service";

class DashboardController {
  public router = Router();
  private dashboardService = new DashboardService();

  constructor() {
    this.router.get("/", this.getDashboard);
  }

  private getDashboard = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const response = await this.dashboardService.getDashboard();
      res.json(response);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };
}

export default new DashboardController().router;
