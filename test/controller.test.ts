import request from "supertest";
import { createApp } from "../src/app";
import { searchNumber } from "../src/service";

jest.mock("../src/service");

const app = createApp();

describe("GET /api", () => {
  it("should return telephone number", async () => {
    (searchNumber as jest.MockedFunction<typeof searchNumber>).mockResolvedValueOnce("123");
    const response = await request(app.callback()).get("/api?company=abc&postal_code=paris");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ number: "123" });
    expect(searchNumber).toHaveBeenCalledWith("abc", "paris");
  });

  it("should fail when company query params is missing", async () => {
    const response = await request(app.callback()).get("/api");
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "missing 'company' query parameter" });
  });

  it("should fail when number not found", async () => {
    (searchNumber as jest.MockedFunction<typeof searchNumber>).mockResolvedValueOnce("");
    const response = await request(app.callback()).get("/api?company=abc&postal_code=paris");
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "abc number not found" });
    expect(searchNumber).toHaveBeenCalledWith("abc", "paris");
  });

  it("should fail when searchNumber failed", async () => {
    (searchNumber as jest.MockedFunction<typeof searchNumber>).mockImplementation(() => {
      throw new Error();
    });
    const response = await request(app.callback()).get("/api?company=abc&postal_code=paris");
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "abc number not found" });
    expect(searchNumber).toHaveBeenCalledWith("abc", "paris");
  });
});
