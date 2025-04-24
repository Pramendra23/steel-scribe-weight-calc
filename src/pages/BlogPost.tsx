
import { Header } from "@/components/Header";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Calendar, Clock, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { BlogComments } from "@/components/blog/BlogComments";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(blogPosts.find(post => post.slug === slug));
  
  // If no post is found, redirect to blog page
  useEffect(() => {
    if (!post) {
      // We could redirect here, but for now we'll just set a default post
      setPost(blogPosts[0]);
    }
    
    // Scroll to top when a new post is loaded
    window.scrollTo(0, 0);
  }, [slug, post]);
  
  if (!post) return null;
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-800 font-poppins">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6">
          <div className="mb-6">
            <Link to="/blog" className="flex items-center text-primary hover:underline mb-4 font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Articles
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            
            <div className="relative rounded-xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[400px]"
              />
              <Button 
                variant="secondary" 
                size="sm" 
                className="absolute top-4 right-4 opacity-80 hover:opacity-100"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Post Content */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6 sm:p-8">
              <div className="prose dark:prose-invert prose-headings:text-foreground prose-headings:font-bold prose-p:text-muted-foreground max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              
              <Separator className="my-8" />
              
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Related Posts */}
          <RelatedPosts currentPostSlug={post.slug} />
          
          {/* Comments */}
          <BlogComments postSlug={post.slug} />
          
          {/* Newsletter Sign up */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 mt-12">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                  <p className="text-muted-foreground">
                    Get the latest articles, calculators, and metal industry insights delivered to your inbox.
                  </p>
                </div>
                <form className="flex flex-col sm:flex-row gap-3 flex-1">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <button 
                    type="button" 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="space-x-4 mb-4 sm:mb-0">
            <Link to="/about" className="hover:text-primary transition-colors">About this Tool</Link>
            <Link to="/help" className="hover:text-primary transition-colors">Help / FAQ</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p>© {new Date().getFullYear()} MetalCalc Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
