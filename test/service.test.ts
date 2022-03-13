// should use rewire to prevent having to export _searchNumber and cache
import { searchNumber, _searchNumber, cache } from "../src/service";
import * as service from "../src/service";

jest.spyOn(service, "_searchNumber");

describe("searchNumber", () => {
  afterEach(() => {
    cache.clear();
  });

  it("should return cached response", async () => {
    cache.set("abc", "123");
    expect(await searchNumber("abc", "paris")).toEqual("123");
    expect(_searchNumber).not.toHaveBeenCalled;
  });

  it("should cache returned response", async () => {
    expect(cache.has("abc")).toBe(false);
    (_searchNumber as jest.MockedFunction<typeof _searchNumber>).mockResolvedValueOnce("123");
    expect(await searchNumber("abc", "paris")).toEqual("123");
    expect(cache.get("abc")).toEqual("123");
  });
});
