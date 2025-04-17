import "dotenv/config";
import "reflect-metadata";
import request from "supertest"; // Fixed import
import app from "../src/server"; // Import your Express app
import mongoose from "mongoose";

describe("MeetingsController (e2e)", () => {
  let createdMeetingId: string;

  describe("Lifecycle of a meeting", () => {
    const meetingPayload = {
      title: "Team Meeting",
      date: "2025-04-17T10:00:00Z",
      participants: ["Alice", "Bob"],
      transcript: "Initial transcript",
      duration: 60,
    };

    const updatedTranscript = { transcript: "Updated transcript" };

    it("POST /api/meetings - Create a meeting", async () => {
      const response = await request(app)
        .post("/api/meetings")
        .set("x-user-id", "test-user")
        .send(meetingPayload)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body._id).toBeDefined();
      expect(response.body.title).toBe(meetingPayload.title);

      createdMeetingId = response.body._id;
    });

    it("GET /api/meetings/:id - Get a specific meeting", async () => {
      const response = await request(app)
        .get(`/api/meetings/${createdMeetingId}`)
        .set("x-user-id", "test-user")
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body._id).toBe(createdMeetingId);
      expect(response.body.title).toBe(meetingPayload.title);
    });

    it("PUT /api/meetings/:id/transcript - Update meeting transcript", async () => {
      const response = await request(app)
        .put(`/api/meetings/${createdMeetingId}/transcript`)
        .set("x-user-id", "test-user")
        .send(updatedTranscript)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.transcript).toBe(updatedTranscript.transcript);
    });

    it("POST /api/meetings/:id/summarize - Summarize meeting", async () => {
      const response = await request(app)
        .post(`/api/meetings/${createdMeetingId}/summarize`)
        .set("x-user-id", "test-user")
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.summary).toContain("Your meeting recap");
      expect(response.body.actionItems).toBeInstanceOf(Array);
      expect(response.body.actionItems.length).toBeGreaterThan(0);
    });

    it("GET /api/meetings/:id - Get a specific meeting updates", async () => {
      const response = await request(app)
        .get(`/api/meetings/${createdMeetingId}`)
        .set("x-user-id", "test-user")
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body._id).toBe(createdMeetingId);
      expect(response.body.title).toBe(meetingPayload.title);
      expect(response.body.transcript).toBe(updatedTranscript.transcript);
    });
  });
});
