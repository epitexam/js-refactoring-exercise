export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      const drug = this.drugs[i];

      if (drug.name != "Herbal Tea" && drug.name != "Fervex") {
        if (drug.benefit > 0) {
          if (drug.name != "Magic Pill") {
            drug.benefit = clamp(drug.benefit - 1, 0, 50);
          }
        }
      } else {
        if (drug.benefit < 50) {
          drug.benefit = clamp(drug.benefit + 1, 0, 50);
          if (drug.name == "Fervex") {
            if (drug.expiresIn < 11) {
              if (drug.benefit < 50) {
                drug.benefit = clamp(drug.benefit + 1, 0, 50);
              }
            }
            if (drug.expiresIn < 6) {
              if (drug.benefit < 50) {
                drug.benefit = clamp(drug.benefit + 1, 0, 50);
              }
            }
          }
        }
      }

      if (drug.name != "Magic Pill") {
        drug.expiresIn = drug.expiresIn - 1;
      }

      if (drug.expiresIn < 0) {
        if (drug.name != "Herbal Tea") {
          if (drug.name != "Fervex") {
            if (drug.benefit > 0) {
              if (drug.name != "Magic Pill") {
                drug.benefit = clamp(drug.benefit - 1, 0, 50);
              }
            }
          } else {
            drug.benefit = 0;
          }
        } else {
          if (drug.benefit < 50) {
            drug.benefit = clamp(drug.benefit + 1, 0, 50);
          }
        }
      }
    }
    return this.drugs;
  }
}