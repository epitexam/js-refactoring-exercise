import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Normal drug", () => {
    it("should decrease benefit and expiresIn by 1 each day", () => {
      expect(new Pharmacy([new Drug("Doliprane", 2, 3)]).updateBenefitValue()).toEqual(
        [new Drug("Doliprane", 1, 2)]
      );
    });

    it("should degrade benefit twice as fast after expiration", () => {
      expect(new Pharmacy([new Drug("Doliprane", 0, 10)]).updateBenefitValue()).toEqual(
        [new Drug("Doliprane", -1, 8)]
      );
    });

    it("should never let benefit go below 0", () => {
      expect(new Pharmacy([new Drug("Doliprane", 5, 0)]).updateBenefitValue()).toEqual(
        [new Drug("Doliprane", 4, 0)]
      );
    });

    it("should never let benefit go below 0 after expiration", () => {
      expect(new Pharmacy([new Drug("Doliprane", -1, 1)]).updateBenefitValue()).toEqual(
        [new Drug("Doliprane", -2, 0)]
      );
    });
  });

  describe("Herbal Tea", () => {
    it("should increase benefit by 1 each day", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", 10, 5)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", 9, 6)]
      );
    });

    it("should increase benefit by 2 after expiration", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", 0, 5)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", -1, 7)]
      );
    });

    it("should never increase benefit above 50", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", 10, 50)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", 9, 50)]
      );
    });

    it("should cap benefit at 50 after expiration", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", 0, 49)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", -1, 50)]
      );
    });
  });

  describe("Magic Pill", () => {
    it("should never change benefit or expiresIn", () => {
      expect(new Pharmacy([new Drug("Magic Pill", 15, 40)]).updateBenefitValue()).toEqual(
        [new Drug("Magic Pill", 15, 40)]
      );
    });
  });

  describe("Fervex", () => {
    it("should increase benefit by 1 when more than 10 days remain", () => {
      expect(new Pharmacy([new Drug("Fervex", 12, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", 11, 31)]
      );
    });

    it("should increase benefit by 2 when 10 days or less remain", () => {
      expect(new Pharmacy([new Drug("Fervex", 10, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", 9, 32)]
      );
    });

    it("should increase benefit by 3 when 5 days or less remain", () => {
      expect(new Pharmacy([new Drug("Fervex", 5, 30)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", 4, 33)]
      );
    });

    it("should drop benefit to 0 after expiration", () => {
      expect(new Pharmacy([new Drug("Fervex", 0, 40)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", -1, 0)]
      );
    });

    it("should never increase benefit above 50", () => {
      expect(new Pharmacy([new Drug("Fervex", 5, 49)]).updateBenefitValue()).toEqual(
        [new Drug("Fervex", 4, 50)]
      );
    });
  });
});