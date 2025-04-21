// src/hooks/useAsyncAction.ts
import { useState, useCallback } from "react";

export function useAsyncAction<TParams, TResult>(
  asyncFn: (params: TParams) => Promise<TResult>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (params: TParams): Promise<TResult | undefined> => {
      setError(null);
      setLoading(true);
      try {
        const result = await asyncFn(params);
        return result;
      } catch (err) {
        console.error(err);
        setError((err as Error).message || "予期しないエラーが発生しました");
      } finally {
        setLoading(false);
      }
    },
    [asyncFn]
  );

  return { run, loading, error };
}
