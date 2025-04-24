
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/data/blogPosts";

export interface RelatedPostsProps {
  currentPostSlug: string;
}

export function RelatedPosts({ currentPostSlug }: RelatedPostsProps) {
  // Get 3 related posts, excluding the current one
  const relatedPosts = blogPosts
    .filter((post) => post.slug !== currentPostSlug)
    .slice(0, 3);

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.slug} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <Link to={`/blog/${post.slug}`} className="block">
              <img 
                src={post.image} 
                alt={post.title}
                className="h-40 w-full object-cover rounded-t-lg"
              />
              <CardContent className="p-4">
                <span className="text-xs font-medium text-primary">{post.category}</span>
                <h4 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h4>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
