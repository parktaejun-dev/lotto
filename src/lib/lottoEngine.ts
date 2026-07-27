const PRIZE_RANK1 = 2_000_000_000;
const PRIZE_RANK2 = 50_000_000;
const PRIZE_RANK3 = 1_500_000;
const PRIZE_RANK4 = 50_000;
const PRIZE_RANK5 = 5_000;
const TICKET_PRICE = 1_000;

export function runLottoSimulation(userNumbers: number[], count: number = 100) {
  const userSet = new Set(userNumbers);

  let rank1 = 0;
  let rank2 = 0;
  let rank3 = 0;
  let rank4 = 0;
  let rank5 = 0;

  let bestWinningNumbers: number[] = [5, 14, 21, 33, 40, 42];
  let bestBonusNumber = 7;
  let highestRankSeen = 99;

  for (let i = 0; i < count; i++) {
    const numbers: number[] = [];
    while (numbers.length < 7) {
      const rand = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(rand)) numbers.push(rand);
    }
    const mainWinning = numbers.slice(0, 6);
    const bonusWinning = numbers[6];

    let matchCount = 0;
    for (const num of mainWinning) {
      if (userSet.has(num)) matchCount++;
    }
    const bonusMatched = userSet.has(bonusWinning);

    if (matchCount === 6) {
      rank1++;
      if (highestRankSeen > 1) {
        highestRankSeen = 1;
        bestWinningNumbers = mainWinning.sort((a, b) => a - b);
        bestBonusNumber = bonusWinning;
      }
    } else if (matchCount === 5 && bonusMatched) {
      rank2++;
      if (highestRankSeen > 2) {
        highestRankSeen = 2;
        bestWinningNumbers = mainWinning.sort((a, b) => a - b);
        bestBonusNumber = bonusWinning;
      }
    } else if (matchCount === 5) {
      rank3++;
      if (highestRankSeen > 3) {
        highestRankSeen = 3;
        bestWinningNumbers = mainWinning.sort((a, b) => a - b);
        bestBonusNumber = bonusWinning;
      }
    } else if (matchCount === 4) {
      rank4++;
      if (highestRankSeen > 4) {
        highestRankSeen = 4;
        bestWinningNumbers = mainWinning.sort((a, b) => a - b);
        bestBonusNumber = bonusWinning;
      }
    } else if (matchCount === 3) {
      rank5++;
      if (highestRankSeen > 5) {
        highestRankSeen = 5;
        bestWinningNumbers = mainWinning.sort((a, b) => a - b);
        bestBonusNumber = bonusWinning;
      }
    }
  }

  const failCount = count - (rank1 + rank2 + rank3 + rank4 + rank5);
  const totalSpent = count * TICKET_PRICE;
  const totalPrize =
    rank1 * PRIZE_RANK1 +
    rank2 * PRIZE_RANK2 +
    rank3 * PRIZE_RANK3 +
    rank4 * PRIZE_RANK4 +
    rank5 * PRIZE_RANK5;

  const netLoss = totalSpent - totalPrize;
  const netReturnRate = totalSpent > 0 ? Math.round(((totalPrize - totalSpent) / totalSpent) * 100 * 10) / 10 : 0;
  const paybackRate = totalSpent > 0 ? Math.round((totalPrize / totalSpent) * 100 * 10) / 10 : 0;

  return {
    count,
    total_spent: totalSpent,
    total_prize: totalPrize,
    net_loss: netLoss,
    return_rate: netReturnRate,
    payback_rate: paybackRate,
    is_infinity_mode: false,
    winning_numbers: bestWinningNumbers,
    bonus_number: bestBonusNumber,
    ranks: {
      "1st": rank1,
      "2nd": rank2,
      "3rd": rank3,
      "4th": rank4,
      "5th": rank5,
      fail: failCount,
    },
  };
}

export function runInfinityLottoSimulation(userNumbers: number[], maxDraws: number = 15_000_000) {
  const userMask = new Uint8Array(46);
  for (const n of userNumbers) userMask[n] = 1;

  let rank1 = 0;
  let rank2 = 0;
  let rank3 = 0;
  let rank4 = 0;
  let rank5 = 0;
  let totalDraws = 0;

  let targetWinning: number[] = [];
  let targetBonus = 7;

  while (totalDraws < maxDraws && rank1 === 0) {
    totalDraws++;

    const nums: number[] = [];
    while (nums.length < 7) {
      const rand = (Math.random() * 45 | 0) + 1;
      if (!nums.includes(rand)) nums.push(rand);
    }

    let matchCount = 0;
    for (let i = 0; i < 6; i++) {
      if (userMask[nums[i]]) matchCount++;
    }
    const bonusMatched = userMask[nums[6]];

    if (matchCount === 6) {
      rank1++;
      targetWinning = nums.slice(0, 6).sort((a, b) => a - b);
      targetBonus = nums[6];
      break;
    } else if (matchCount === 5 && bonusMatched) {
      rank2++;
    } else if (matchCount === 5) {
      rank3++;
    } else if (matchCount === 4) {
      rank4++;
    } else if (matchCount === 3) {
      rank5++;
    }
  }

  if (targetWinning.length === 0) {
    targetWinning = [1, 2, 3, 4, 5, 6];
  }

  const totalSpent = totalDraws * TICKET_PRICE;
  const totalPrize =
    rank1 * PRIZE_RANK1 +
    rank2 * PRIZE_RANK2 +
    rank3 * PRIZE_RANK3 +
    rank4 * PRIZE_RANK4 +
    rank5 * PRIZE_RANK5;

  const netLoss = totalSpent - totalPrize;
  const netReturnRate = totalSpent > 0 ? Math.round(((totalPrize - totalSpent) / totalSpent) * 100 * 10) / 10 : 0;
  const yearsNeeded = Math.round((totalDraws / (50 * 52)) * 10) / 10;

  return {
    count: totalDraws,
    total_spent: totalSpent,
    total_prize: totalPrize,
    net_loss: netLoss,
    return_rate: netReturnRate,
    years_needed: yearsNeeded,
    is_infinity_mode: true,
    winning_numbers: targetWinning,
    bonus_number: targetBonus,
    ranks: {
      "1st": rank1,
      "2nd": rank2,
      "3rd": rank3,
      "4th": rank4,
      "5th": rank5,
      fail: totalDraws - (rank1 + rank2 + rank3 + rank4 + rank5),
    },
  };
}
