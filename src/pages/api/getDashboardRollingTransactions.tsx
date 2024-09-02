// pages/api/getDashboardMonthlyTransactions.js
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ENV_VARS } from "@/config";
import JsonResponse from "../../../mocked-data/D1LrrJm3cdZ_zUUan1GNb/getDashboardRollingTransactions-1.json";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { d } = req.body;

    if (!d) {
      return res.status(400).json({ error: "Public access key is required" });
    }

    try {
    //   axios
    //     .post(ENV_VARS.server_url + "/api/getDashboardRollingTransactions", {
    //       d: "public key",
    //     })
    //     .then((data) => res.status(200).json(data.data))
    //     .catch((err) => {
    //       throw err;
    //     });
      return res.status(200).json(JsonResponse);
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
