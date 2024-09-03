// pages/api/getDashboardMonthlyTransactions.js
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ENV_VARS } from "@/config";
function getFutureDate(millisecondsInFuture: number) {
  // Get the current time
  const currentDate = new Date();

  // Calculate the future time by adding the specified milliseconds
  const futureTime = new Date(currentDate.getTime() + millisecondsInFuture);

  // Return the future Date object
  return futureTime;
}

var mockedData = {
  "transactions": [
      {
          "transactionId": crypto.randomUUID(),
          "scheduled": getFutureDate(2000)
      },
      {
          "transactionId": crypto.randomUUID(),
          "scheduled": getFutureDate(2000  +  10 * 1000)
      },
      {
          "transactionId": crypto.randomUUID(),
          "scheduled": getFutureDate(2000 +  20 * 1000)
      },
      {
          "transactionId": crypto.randomUUID(),
          "scheduled": getFutureDate(2000 +  30 * 1000)
      },
      {
          "transactionId": crypto.randomUUID(),
          "scheduled": getFutureDate(2000 +  60 * 1000)
      },

  ]
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { d } = req.body;

    if (!d) {
      return res.status(400).json({ error: "Public access key is required" });
    }

    try {

    //   axios
    //     .post(ENV_VARS.server_url + "/api/getDashboardTransactionScheduling", {
    //       d: "public key",
    //     })
    //     .then((data) => res.status(200).json(data.data))
    //     .catch((err) => {
    //       throw err;
    //     });

      return res.status(200).json(mockedData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Handle any other HTTP method
    return res
      .setHeader("Allow", ["POST"])
      .status(405)
      .end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
