"use client";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import KonvaChart from "@/components/KonvaChart";
import getXLabels from "@/utils/getXLabels";
import { series } from "@/config";

const currencies = [
  {
    currency: "USD",
    symbol: "$",
  },
  {
    currency: "EUR",
    symbol: "€",
  },
  {
    currency: "SEK",
    symbol: "kr",
  },
];
let transactionIdList: any[] = []; // a list of ids of transaction that have already occurred.

const containedInList = (id: string) => {
  let filtered = transactionIdList.filter((_: any, index: any) => _ == id);
  if (filtered.length > 0) return true;
  else return false;
};
export default function Home(props: any) {
  const [newRev, setNewRev] = useState(0);
  const [chartWidth, setChartWidth] = useState(10);
  const [chartHeight, setChartHeight] = useState(10);
  const [dailyTransactions, setDailyTransactions] = useState(0);
  const [dailyTransactionRevenue, setDailyTransactionRevenue] = useState(0);

  const getRollingTransactions = async () => {
    const res = await fetch(
      "https://konva-chart.vercel.app/" +
        "/api/getDashboardTransactionScheduling",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ d: "public key" }),
      }
    );
    const data = await res.json();
    const transactions = data.transactions;
    transactions.map((_: any, index: any) => {
      if (!containedInList(_.transactionId)) {
        // if incoming transaction is not contained in list of ids of transaction that have already ocurred.
        console.log(_, "scheduled time");
        setTimeout(
          displayRollingRevenue,
          new Date(_.scheduled).getTime() - Date.now() + 30 * 60 * 1000
        ); // display into konva chart with delayed 30 mins.
      }
    });
  };

  const displayRollingRevenue = async () => {
    const res = await fetch(
      "https://konva-chart.vercel.app/" +
        "/api/getDashboardRollingTransactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ d: "public key" }),
      }
    );
    const data = await res.json();
    setNewRev(data.rolling60minutesTransactions);
    setDailyTransactionRevenue(data.rolling24HoursTransactionsRevenue);
    setDailyTransactions(data.rolling24HoursTransactions);
  };

  useEffect(() => {
    const intervalId = setInterval(getRollingTransactions, 1000 * 60 * 10); // call once 10 minutes.
    setTimeout(getRollingTransactions, 100); // call first.
    setTimeout(displayRollingRevenue, 100);

    setChartHeight(window.innerHeight);
    setChartWidth(window.innerWidth);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const dataset = props.data;
  const _XLabels = getXLabels(dataset.months[0].month);
  const currency = dataset.currency;
  const symbol = currencies.filter((_, index) => _.currency == currency)[0]
    .symbol;
  const maxData = Math.max(...dataset.months.map((obj: any) => obj.revenue));

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-[10px]">
      <KonvaChart
        h={chartHeight * 0.7}
        w={chartWidth}
        onComingRev={newRev}
        revenueData={dataset.months}
        xLabels={_XLabels}
        xLabelSize={30}
        xLabelFontSize={16}
        yLabelSize={60}
        yLabelFontSize={16}
        maxData={maxData}
        series={series}
        barSpacing={20}
        startSpacing={10}
        lastSpacing={10}
        seriesSize={10}
        valueFontSize={32}
        marginTop={10}
        currency={symbol}
      />
      <div className="flex flex-row justify-start w-full pl-[50px] md:mt-[50px] mt-[10px]">
        <div className="bg-[rgb(183,223,255)] text-[rgb(9,9,51)] pt-[10px] md:pt-[5px] md:px-[20px] px-[10px] mr-4">
          <h5 className="text-center md:text-[16px] text-[8px] font-medium">
            Daily transactions(rolling 24h)
          </h5>
          <p className="text-center md:text-[85px] text-[24px] font-medium tracking-widest ">
            {dailyTransactions}
          </p>
        </div>
        <div className="bg-[rgb(183,223,255)] text-[rgb(9,9,51)] md:pt-[10px] pt-[5px] md:px-[20px] px-[10px]">
          <h5 className="text-center md:text-[16px] text-[8px] font-medium">
            Daily transaction revenue(rolling 24h)
          </h5>
          <p className="text-center md:text-[85px] text-[24px] font-medium tracking-widest">
            {new Intl.NumberFormat("sv-SE", {
              style: "currency",
              currency: "SEK",
            }).format(dailyTransactionRevenue)}
          </p>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    console.log("data fetching....");
    const res = await fetch(
      "https://konva-chart.vercel.app/" +
        `/api/getDashboardMonthlyTransactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ d: "ddfdf" }),
      }
    );
    const data = await res.json();
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: "error occurred",
      },
    };
  }
};
