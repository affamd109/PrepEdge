import { useState } from "react";
import { toast } from "sonner";

/*This defines two generic types. Think of these like placeholders for types that will be filled in later:

T: The type of data that your fetch function will return (e.g., a User, or a list of Posts)
Args: The type of arguments that your function accepts (e.g., ["123"] if you're passing an ID)
Promise<T>: means the callback returns a Promise that resolves to type T (e.g., User, Post, etc.)*/

export default function useFetch<T, Args extends any[]>(cb: (...args: Args) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const func = async (...args: Args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Something went wrong");
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, func, setData };
}



