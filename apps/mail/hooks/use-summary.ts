import { useTRPC } from '@/providers/query-provider';
import { useQuery } from '@tanstack/react-query';

export const useSummary = (threadId: string | null) => {
  const trpc = useTRPC();
  const summaryQuery = useQuery(
    trpc.brain.generateSummary.queryOptions(
      { threadId: threadId! },
      {
        enabled: !!threadId,
      },
    ),
  );

  return summaryQuery;
};

export const useBrainState = () => {
  const trpc = useTRPC();
  const brainStateQuery = useQuery(trpc.brain.getState.queryOptions());

  return brainStateQuery;
};
