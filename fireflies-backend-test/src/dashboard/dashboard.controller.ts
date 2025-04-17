import express from "express";

import { AuthenticatedRequest } from "../models/auth";
import DashboardService from "./dashboard.service";

class DashboardController {
  public router = express.Router();
  private dashboardService = new DashboardService();

  constructor() {
    this.router.get("/", this.getDashboard);
  }

  private getDashboard = async (req: AuthenticatedRequest, res: any) => {
    const response = await this.dashboardService.getDashboard();

    res.json(response);
  };
}

export default new DashboardController().router;
