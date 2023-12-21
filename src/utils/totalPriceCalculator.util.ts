import { envs } from '../config';
import { parsePriceValue } from './parsePriceValue.util';

export const calTotalPriceProduct = ({
  price,
  includeIVA,
}: {
  price: number;
  includeIVA: boolean;
}): { totalCostIVA: number; costWithoutIVA: number } => {
  const IVA = envs.IVA;
  let totalCostIVA: number;
  let costWithoutIVA: number;

  if (includeIVA) {
    totalCostIVA = parsePriceValue(price);
    costWithoutIVA = parsePriceValue(totalCostIVA / (1 + IVA / 100));
  } else {
    costWithoutIVA = parsePriceValue(price);
    totalCostIVA = parsePriceValue(costWithoutIVA * (1 + IVA / 100));
  }

  return { totalCostIVA, costWithoutIVA };
};
