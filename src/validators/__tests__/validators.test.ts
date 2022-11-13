import {isMoreThanZero, isNumber, isPositiveInteger, notEmpty} from "../validators";

describe("Validators tests", () => {
    it("Not empty", () => {
        expect(notEmpty("")).toBeFalsy();
        expect(notEmpty("aaa")).toBeTruthy();
        expect(notEmpty("111")).toBeTruthy();
        expect(notEmpty("false")).toBeTruthy();
    });
    it("Is number", () => {
        expect(isNumber("a")).toBeFalsy();
        expect(isNumber("11a")).toBeFalsy();
        expect(isNumber("1")).toBeTruthy();
        expect(isNumber("-1")).toBeTruthy();
        expect(isNumber("0.1")).toBeTruthy();
        expect(isNumber("-0.1")).toBeTruthy();
    });
    it("More than zero", () => {
        expect(isMoreThanZero("a")).toBeFalsy();
        expect(isMoreThanZero("11aaa")).toBeFalsy();
        expect(isMoreThanZero("11")).toBeTruthy();
        expect(isMoreThanZero("0.1")).toBeTruthy();
        expect(isMoreThanZero("0.1a")).toBeFalsy();
        expect(isMoreThanZero("a0.1a")).toBeFalsy();
    });
    it("Is posivite interger", () => {
        expect(isPositiveInteger("a")).toBeFalsy()
        expect(isPositiveInteger("1.1")).toBeFalsy()
        expect(isPositiveInteger("-11")).toBeFalsy()
        expect(isPositiveInteger("11")).toBeTruthy()
        expect(isPositiveInteger("11aaa")).toBeFalsy()
    })
})