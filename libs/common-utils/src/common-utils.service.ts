import { Injectable } from '@nestjs/common';
import { ClinicalTrialTerms, ResearchCodesPattern } from './constant';

@Injectable()
export class CommonUtilsService {
  static roundNumber = (num: number, decimals = 2) => {
    const t = Math.pow(10, decimals);
    let result = Math.round((num + Number.EPSILON) * t) / t;
    if (num < 0) {
      result = result * -1;
    }
    return result;
  };

  static delaySeconds = async (seconds) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(seconds * 1000);
  };

  static checkClinicalTrialRequired = (title: string) => {
    const clinicalTrialPattern = new RegExp(
      ClinicalTrialTerms.map((term) =>
        term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
      ).join('|'),
      'i',
    );
    return clinicalTrialPattern.test(title);
  };

  static checkIsResearchGrant = (title: string, program: string) => {
    const researchCodesPattern = new RegExp(
      ResearchCodesPattern.map((code) =>
        code.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
      ).join('|'),
      'i',
    );
    return program === 'SBIR' || researchCodesPattern.test(title);
  };
}
