import { Injectable, signal } from "@angular/core";
import type { InvestmentInput } from "./investment-input.modal";
import type { InvestmentResults } from "./investment-results.modal";

@Injectable({ providedIn: "root" })
export class InvestmentService {
  // public resultsData?: InvestmentResults[];
  public resultsData = signal<InvestmentResults[] | undefined>(undefined);

  calculateInvestmentResults(data: InvestmentInput) {
    const { annualInvestment, expectedReturn, initialInvestment, duration } = data;

    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.resultsData.set(annualData);
  }
}
