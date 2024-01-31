import { Helmet } from 'react-helmet-async'

import { DailyOrdersAmountCard } from './daily-orders-amount-card'
import { MonthlyCanceledOrdersAmountCard } from './monthly-canceled-orders-amount'
import { MonthlyOrdersAmountCard } from './monthly-orders-amount-card'
import { MonthlyRevenueCard } from './monthly-revenue-card'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthlyRevenueCard />
          <MonthlyOrdersAmountCard />
          <DailyOrdersAmountCard />
          <MonthlyCanceledOrdersAmountCard />
        </div>
      </div>
    </>
  )
}
