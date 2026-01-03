import { useQuery } from '@tanstack/react-query';
import * as CandyAPI from '../services/CandyAPI';
import type { Tag } from '../services/CandyAPI.types';

export const Tags = () => {
  const { data: getTags } = useQuery({
    queryKey: ['getTags'],
    queryFn: CandyAPI.getTags,
  });

  const tags: Tag[] = Array.isArray(getTags?.data) ? getTags?.data : [];

  return (
    <>
      {tags &&
        tags.map((tag) => (
          <>
            <button id={tag.id.toString()}>{tag.name}</button>
          </>
        ))}
    </>
  );
};
