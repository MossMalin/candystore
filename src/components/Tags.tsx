import { useQuery } from '@tanstack/react-query';
import { getTags } from '../services/product.service';
import type { Tag } from '../types/Product.types';
import { useLocation } from 'react-router';

interface TagsProps {
  onTagClick: (tag: string) => Promise<void>;
}

export const Tags: React.FC<TagsProps> = ({ onTagClick }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search).get('tag') || '';
  const { data: tagsData } = useQuery({
    queryKey: ['getTags'],
    queryFn: getTags,
  });

  const tags: Tag[] = Array.isArray(tagsData?.data) ? tagsData?.data : [];

  return (
    <div className="tags">
      <button
        onClick={() => onTagClick('')}
        className={params === '' ? 'active' : ''}
      >
        Show all
      </button>
      {tags &&
        tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagClick(`/${tag.id.toString()}`)}
            className={params === tag.id.toString() ? 'active' : ''}
          >
            {tag.name}
          </button>
        ))}
    </div>
  );
};
