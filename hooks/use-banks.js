// hooks/useBanks.js
import { bankArr } from "@/constant";
import { useState, useEffect } from "react";

const useBanks = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch(
          "https://api.paystack.co/bank?country=nigeria&use_cursor=false&perPage=100",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
            },
          },
        );

        const data = await response.json();

        if (data.status) {
          const formatted = data.data.map((bank) => ({
            label: bank.name,
            value: bank.code,
          }));
          setBanks(formatted);
        } else {
          throw new Error("Failed to fetch banks");
        }
      } catch (err) {
        setError(err.message);
        setBanks(bankArr);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  return { banks, loading, error };
};

export default useBanks;
