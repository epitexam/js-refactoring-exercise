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

function updateHerbalTea(drug) {
  drug.expiresIn -= 1;
  const increase = drug.expiresIn < 0 ? 2 : 1;
  drug.benefit = clamp(drug.benefit + increase, 0, 50);
}

function updateFervex(drug) {
  drug.expiresIn -= 1;
  if (drug.expiresIn < 0) {
    drug.benefit = 0;
    return;
  }
  let increase = 1;
  if (drug.expiresIn < 5) {
    increase = 3;
  } else if (drug.expiresIn < 10) {
    increase = 2;
  }
  drug.benefit = clamp(drug.benefit + increase, 0, 50);
}

function updateNormalDrug(drug) {
  drug.expiresIn -= 1;
  const decrease = drug.expiresIn < 0 ? 2 : 1;
  drug.benefit = clamp(drug.benefit - decrease, 0, 50);
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateDrug(drug) {
    if (drug.name === "Magic Pill") return;

    switch (drug.name) {
      case "Herbal Tea":
        return updateHerbalTea(drug);
      case "Fervex":
        return updateFervex(drug);
      default:
        return updateNormalDrug(drug);
    }
  }

  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.updateDrug(this.drugs[i]);
    }
    return this.drugs;
  }
}