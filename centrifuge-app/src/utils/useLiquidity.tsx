import { Perquintill } from '@centrifuge/centrifuge-js'
import Decimal from 'decimal.js-light'
import React from 'react'
import { LiquidityTableRow } from '../components/EpochList'
import { useCentrifugeQuery } from './useCentrifugeQuery'
import { usePool, usePoolMetadata } from './usePools'

type Liquidity = {
  investments: LiquidityTableRow[]
  redemptions: LiquidityTableRow[]
  sumOfExecutableInvestments: Decimal
  sumOfLockedInvestments: Decimal
  sumOfExecutableRedemptions: Decimal
  sumOfLockedRedemptions: Decimal
}

export const useLiquidity = (poolId: string) => {
  const pool = usePool(poolId)

  const { data: metadata } = usePoolMetadata(pool)

  const [solution] = useCentrifugeQuery(
    [
      'solution',
      poolId,
      pool?.tranches.map((tranche) => ({
        invest: tranche.outstandingInvestOrders,
        redeem: tranche.outstandingRedeemOrders,
      })),
    ],
    (cent) => cent.pools.submitSolution([poolId], { dryRun: true }),
    {
      enabled: !!poolId,
    }
  )

  const { investments, sumOfExecutableInvestments, sumOfLockedInvestments } = React.useMemo(() => {
    const investments =
      (pool?.tranches.map((tranche, index) => {
        const trancheMeta = metadata?.tranches?.[tranche.id]
        return {
          order: `${trancheMeta?.symbol || ''} investments`,
          locked: tranche.outstandingInvestOrders?.toDecimal() || new Decimal(0),
          executing:
            solution && 'tranches' in solution
              ? solution?.tranches?.[index]?.invest.amount.toDecimal()
              : new Decimal(0),
          executingPercentage:
            solution && 'tranches' in solution
              ? solution?.tranches?.[index]?.invest.perquintill
              : Perquintill.fromPercent(0),
        }
      }) as LiquidityTableRow[]) || []
    const sumOfLockedInvestments = investments?.reduce(
      (prev, { locked }) => prev.add(locked as Decimal),
      new Decimal(0)
    )

    const sumOfExecutableInvestments = investments?.reduce(
      (prev, { executing }) => prev.add(executing as Decimal),
      new Decimal(0)
    )
    return {
      investments,
      sumOfLockedInvestments,
      sumOfExecutableInvestments,
    }
  }, [pool, solution, metadata])

  const { redemptions, sumOfExecutableRedemptions, sumOfLockedRedemptions } = React.useMemo(() => {
    const redemptions =
      (pool?.tranches.map((tranche, index) => {
        const trancheMeta = metadata?.tranches?.[tranche.id]
        const price = pool.tranches[index].tokenPrice?.toDecimal()
        return {
          order: `${trancheMeta?.symbol || ''} redemptions`,
          locked: tranche.outstandingRedeemOrders?.toDecimal().mul(price || 1) || new Decimal(0),
          executing:
            solution && 'tranches' in solution
              ? solution?.tranches?.[index]?.redeem.amount.toDecimal().mul(price || 1)
              : new Decimal(0),
          executingPercentage:
            solution && 'tranches' in solution
              ? solution?.tranches?.[index]?.redeem.perquintill
              : Perquintill.fromPercent(0),
        }
      }) as LiquidityTableRow[]) || []

    const sumOfLockedRedemptions = redemptions?.reduce(
      (prev, { locked }) => prev.add(locked as Decimal),
      new Decimal(0)
    )
    const sumOfExecutableRedemptions = redemptions?.reduce(
      (prev, { executing }) => prev.add(executing as Decimal),
      new Decimal(0)
    )

    return {
      redemptions,
      sumOfExecutableRedemptions,
      sumOfLockedRedemptions,
    }
  }, [pool, solution, metadata])

  return {
    investments,
    redemptions,
    sumOfLockedInvestments,
    sumOfExecutableInvestments,
    sumOfLockedRedemptions,
    sumOfExecutableRedemptions,
  } as Liquidity
}