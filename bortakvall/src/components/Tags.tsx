import { useQuery } from '@tanstack/react-query';
import { getTags } from '../services/product.service';
import type { Tag } from '../types/Product.types';

interface TagsProps {
  onTagClick: (tag: string) => Promise<void>;
}

export const Tags: React.FC<TagsProps> = ({ onTagClick }) => {
  const { data: tagsData } = useQuery({
    queryKey: ['getTags'],
    queryFn: getTags,
  });

  const tags: Tag[] = Array.isArray(tagsData?.data) ? tagsData?.data : [];

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
