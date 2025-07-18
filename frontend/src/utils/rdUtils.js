// File: src/utils/rdUtils.js
export const formatCurrency = (value) => {
  return `₹${value.toFixed(2)}`;
};

export const calculateRDMaturity = (
  deposit,
  tenure,
  interestRate,
  compoundingFreq,
  tdsEnabled,
  customerType
) => {
  if (!deposit || !tenure || !interestRate || !compoundingFreq) {
    return {
      totalInvestment: 0,
      interestEarned: 0,
      maturityAmount: 0,
    };
  }

  // Adjust rate for compounding
  const compoundingMap = {
    monthly: 12,
    quarterly: 4,
    'half-yearly': 2,
    yearly: 1,
  };
  const n = compoundingMap[compoundingFreq] || 4;
  const r = interestRate / (n * 100);
  const m = tenure / 12;

  // Apply senior citizen benefit (e.g., +0.5%)
  const adjustedRate = customerType === 'senior' ? interestRate + 0.5 : interestRate;

  // Calculate maturity amount
  let maturityAmount = deposit * ((((1 + r) ** (n * m)) - 1) / r) * (1 + r);
  const totalInvestment = deposit * tenure;
  const interestEarned = maturityAmount - totalInvestment;

  return {
    totalInvestment,
    interestEarned,
    maturityAmount,
  };
};