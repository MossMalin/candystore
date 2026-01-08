import { useQuery } from '@tanstack/react-query';
import * as CandyAPI from '../services/CandyAPI';
import type { Tag } from '../types/Product.types';

interface TagsProps {
  onTagClick: (tag: string) => Promise<void>;
}

export const Tags: React.FC<TagsProps> = ({ onTagClick }) => {
  const { data: getTags } = useQuery({
    queryKey: ['getTags'],
    queryFn: CandyAPI.getTags,
  });

  const tags: Tag[] = Array.isArray(getTags?.data) ? getTags?.data : [];

  return (
    <>
      <button onClick={() => onTagClick('')}>Visa alla</button>
      {tags &&
        tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagClick(`/${tag.id.toString()}`)}
          >
            {tag.name}
          </button>
        ))}
    </>
  );
};
