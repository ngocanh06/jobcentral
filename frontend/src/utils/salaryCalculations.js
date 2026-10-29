/**
 * Các hàm tính toán thuần (pure functions) cho ToolsView.
 *
 * Không đặt các hàm này trong Zustand: chúng không phải state toàn cục,
 * chỉ là logic tính toán có thể tái sử dụng và test độc lập.
 */

// Lương tối thiểu các vùng
export const REGION_WAGES = {
  1: { name: 'Vùng I (4.960.000 đ - Hà Nội, TP.HCM)', minWage: 4960000 },
  2: { name: 'Vùng II (4.410.000 đ - Đà Nẵng, Cần Thơ)', minWage: 4410000 },
  3: { name: 'Vùng III (3.860.000 đ - Bắc Ninh, Hải Dương)', minWage: 3860000 },
  4: { name: 'Vùng IV (3.450.000 đ - Khu vực còn lại)', minWage: 3450000 },
};

export const formatVND = (num) =>
  new Intl.NumberFormat('vi-VN').format(Math.round(num)) + ' đ';

export const formatNumberOnly = (num) =>
  new Intl.NumberFormat('vi-VN').format(Math.round(num));

// Tính lương Gross sang Net & Thuế 7 bậc
export const calculateGrossToNet = (
  gross,
  numDeps = 0,
  regionId = '1',
  insType = 'official',
  customIns = 5000000
) => {
  if (gross <= 0) {
    return {
      gross: 0,
      net: 0,
      bhxh: 0,
      bhyt: 0,
      bhtn: 0,
      totalIns: 0,
      taxableIncome: 0,
      incomeBeforeTax: 0,
      tax: 0,
      bracketDetails: [],
      employerBhxh: 0,
      employerBhyt: 0,
      employerBhtn: 0,
      totalEmployerIns: 0,
      totalEmployerCost: 0,
    };
  }

  const maxSocialSalary = 46800000; // 20 lần mức lương cơ sở (2.340.000 đ)
  const minWage = REGION_WAGES[regionId]?.minWage || 4960000;
  const maxBhtnSalary = minWage * 20;

  const baseIns =
    insType === 'custom' ? Math.max(0, Number(customIns) || 0) : gross;
  const insBaseBhxh = Math.min(baseIns, maxSocialSalary);
  const insBaseBhtn = Math.min(baseIns, maxBhtnSalary);

  // Người lao động đóng
  const bhxh = insBaseBhxh * 0.08;
  const bhyt = insBaseBhxh * 0.015;
  const bhtn = insBaseBhtn * 0.01;
  const totalIns = bhxh + bhyt + bhtn;

  // Doanh nghiệp đóng
  const employerBhxh = insBaseBhxh * 0.175;
  const employerBhyt = insBaseBhxh * 0.03;
  const employerBhtn = insBaseBhtn * 0.01;
  const employerBhtnld = insBaseBhxh * 0.005;
  const totalEmployerIns =
    employerBhxh + employerBhyt + employerBhtn + employerBhtnld;
  const totalEmployerCost = gross + totalEmployerIns;

  // Giảm trừ gia cảnh
  const incomeBeforeTax = Math.max(0, gross - totalIns);
  const selfDeduction = 11000000;
  const depDeduction = numDeps * 4400000;
  const taxableIncome = Math.max(
    0,
    incomeBeforeTax - selfDeduction - depDeduction
  );

  // 7 Bậc thuế TNCN
  const brackets = [
    { level: 1, limit: 5000000, rate: 0.05, label: 'Đến 5 triệu (5%)' },
    {
      level: 2,
      limit: 10000000,
      rate: 0.1,
      label: 'Trên 5 đến 10 triệu (10%)',
    },
    {
      level: 3,
      limit: 18000000,
      rate: 0.15,
      label: 'Trên 10 đến 18 triệu (15%)',
    },
    {
      level: 4,
      limit: 32000000,
      rate: 0.2,
      label: 'Trên 18 đến 32 triệu (20%)',
    },
    {
      level: 5,
      limit: 52000000,
      rate: 0.25,
      label: 'Trên 32 đến 52 triệu (25%)',
    },
    {
      level: 6,
      limit: 80000000,
      rate: 0.3,
      label: 'Trên 52 đến 80 triệu (30%)',
    },
    {
      level: 7,
      limit: Infinity,
      rate: 0.35,
      label: 'Trên 80 triệu (35%)',
    },
  ];

  let tax = 0;
  let prevLimit = 0;
  const bracketDetails = [];

  for (const b of brackets) {
    if (taxableIncome > prevLimit) {
      const taxableInBracket = Math.min(taxableIncome, b.limit) - prevLimit;
      const taxAmount = taxableInBracket * b.rate;
      tax += taxAmount;
      bracketDetails.push({
        ...b,
        taxableAmount: taxableInBracket,
        taxAmount,
      });
      prevLimit = b.limit;
    } else {
      bracketDetails.push({
        ...b,
        taxableAmount: 0,
        taxAmount: 0,
      });
    }
  }

  const net = Math.max(0, gross - totalIns - tax);

  return {
    gross,
    net,
    bhxh,
    bhyt,
    bhtn,
    totalIns,
    taxableIncome,
    incomeBeforeTax,
    tax,
    selfDeduction,
    depDeduction,
    bracketDetails,
    employerBhxh,
    employerBhyt,
    employerBhtn,
    totalEmployerIns,
    totalEmployerCost,
  };
};

// Tính ngược từ Net sang Gross
export const calculateNetToGross = (
  targetNet,
  numDeps = 0,
  regionId = '1',
  insType = 'official',
  customIns = 5000000
) => {
  let low = targetNet;
  let high = targetNet * 2 + 50000000;
  let bestGross = targetNet;

  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    const res = calculateGrossToNet(
      mid,
      numDeps,
      regionId,
      insType,
      customIns
    );
    if (Math.abs(res.net - targetNet) < 1) {
      bestGross = mid;
      break;
    }
    if (res.net < targetNet) {
      low = mid;
    } else {
      high = mid;
    }
    bestGross = mid;
  }

  return calculateGrossToNet(
    bestGross,
    numDeps,
    regionId,
    insType,
    customIns
  );
};

// Tính Quyết toán thuế TNCN cả năm
export const calculateTaxFinalization = ({
  annualGross,
  months,
  dependents,
  insurancePaid,
  prepaidTax,
}) => {
  const gross = Math.max(0, Number(annualGross) || 0);
  const monthCount = Math.max(1, Math.min(12, Number(months) || 12));
  const deps = Math.max(0, Number(dependents) || 0);
  const ins = Math.max(0, Number(insurancePaid) || 0);
  const prepaid = Math.max(0, Number(prepaidTax) || 0);

  const selfDeduction = 11000000 * monthCount;
  const depDeduction = 4400000 * monthCount * deps;
  const totalDeduction = selfDeduction + depDeduction + ins;
  const taxableIncome = Math.max(0, gross - totalDeduction);

  // Biểu thuế lũy tiến từng phần theo năm (7 bậc quy đổi năm)
  const yearlyBrackets = [
    { level: 1, limit: 60000000, rate: 0.05, label: 'Đến 60 triệu (5%)' },
    {
      level: 2,
      limit: 120000000,
      rate: 0.1,
      label: 'Trên 60 đến 120 triệu (10%)',
    },
    {
      level: 3,
      limit: 216000000,
      rate: 0.15,
      label: 'Trên 120 đến 216 triệu (15%)',
    },
    {
      level: 4,
      limit: 384000000,
      rate: 0.2,
      label: 'Trên 216 đến 384 triệu (20%)',
    },
    {
      level: 5,
      limit: 624000000,
      rate: 0.25,
      label: 'Trên 384 đến 624 triệu (25%)',
    },
    {
      level: 6,
      limit: 960000000,
      rate: 0.3,
      label: 'Trên 624 đến 960 triệu (30%)',
    },
    {
      level: 7,
      limit: Infinity,
      rate: 0.35,
      label: 'Trên 960 triệu (35%)',
    },
  ];

  let totalTax = 0;
  let prev = 0;
  const bracketDetails = [];

  for (const b of yearlyBrackets) {
    if (taxableIncome > prev) {
      const taxable = Math.min(taxableIncome, b.limit) - prev;
      const taxAmt = taxable * b.rate;
      totalTax += taxAmt;
      bracketDetails.push({ ...b, taxableAmount: taxable, taxAmount: taxAmt });
      prev = b.limit;
    } else {
      bracketDetails.push({ ...b, taxableAmount: 0, taxAmount: 0 });
    }
  }

  const difference = prepaid - totalTax; // > 0: hoàn thuế; < 0: nộp thêm; === 0: đủ

  return {
    gross,
    selfDeduction,
    depDeduction,
    totalDeduction,
    taxableIncome,
    totalTax,
    prepaid,
    difference,
    bracketDetails,
  };
};

// Tính BHXH 1 lần
export const calculateBhxhOneTime = ({
  avgSalary,
  yearsBefore2014,
  yearsAfter2014,
}) => {
  const avg = Math.max(0, Number(avgSalary) || 0);
  const yBefore = Math.max(0, Number(yearsBefore2014) || 0);
  const yAfter = Math.max(0, Number(yearsAfter2014) || 0);

  const amountBefore = yBefore * 1.5 * avg;
  const amountAfter = yAfter * 2.0 * avg;
  const totalAmount = amountBefore + amountAfter;

  return {
    avgSalary: avg,
    yearsBefore2014: yBefore,
    yearsAfter2014: yAfter,
    amountBefore,
    amountAfter,
    totalAmount,
  };
};

// Tính Luật thử việc
export const calculateProbation = ({ jobType, officialSalary }) => {
  const salary = Math.max(0, Number(officialSalary) || 0);
  const probationSalaryMin = salary * 0.85;

  let maxDays = 60;
  let description =
    'Công việc có chức danh nghề nghiệp cần trình độ chuyên môn, kỹ thuật từ cao đẳng trở lên';
  if (jobType === 'manager') {
    maxDays = 180;
    description =
      'Người quản lý doanh nghiệp theo quy định của Luật Doanh nghiệp, Luật Quản lý, sử dụng vốn nhà nước';
  } else if (jobType === 'intermediate') {
    maxDays = 30;
    description =
      'Công việc có chức danh nghề nghiệp cần trình độ chuyên môn, kỹ thuật trung cấp, công nhân kỹ thuật, nhân viên nghiệp vụ';
  } else if (jobType === 'simple') {
    maxDays = 6;
    description = 'Công việc đơn giản, lao động phổ thông';
  }

  return {
    officialSalary: salary,
    probationSalaryMin,
    maxDays,
    description,
  };
};
