import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";

const ExamplePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("API_ENDPOINT");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fetched Data</h1>
      <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExamplePage;
