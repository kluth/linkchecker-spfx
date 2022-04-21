import { LinkcheckerLibrary } from "../LinkcheckerLibrary";

// test suite for LinkcheckerLibrary
describe("LinkcheckerLibrary", () => {
    // test case for checkAccessibility
    it("should return true if the given URL is accessible", async () => {
        const url = "https://contoso.sharepoint.com/sites/sales";
        const result = await LinkcheckerLibrary.checkAccessibility(url);
        expect(result).toBe(true);
    });

    // test case for checkAccessibility
    it("should return false if the given URL is not accessible", async () => {
        const url = "https://contoso.sharepoint.com/sites/sales/";
        const result = await LinkcheckerLibrary.checkAccessibility(url);
        expect(result).toBe(false);
    });
});