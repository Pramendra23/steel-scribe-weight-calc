
import { Header } from "@/components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-800 font-poppins">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Metal Industry Blog</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Expert insights, tips, and guides for pipe and tube weight calculations, 
              metal fabrication, and construction engineering.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-12">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581093804475-577d72e13dde?auto=format&fit=crop&w=1200&h=400&q=80" 
                  alt={blogPosts[0].title}
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <span className="bg-primary px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">
                      {blogPosts[0].category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">{blogPosts[0].title}</h2>
                    <p className="text-sm opacity-90 mb-4">{blogPosts[0].date} • {blogPosts[0].readTime}</p>
                    <Link 
                      to={`/blog/${blogPosts[0].slug}`}
                      className="text-white bg-primary/80 hover:bg-primary px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentPosts.slice(1).map((post) => (
              <Card key={post.slug} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-medium text-primary mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{post.date} • {post.readTime}</p>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-primary hover:underline mt-auto text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Pagination className="my-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    onClick={() => setCurrentPage(idx + 1)}
                    isActive={currentPage === idx + 1}
                    className="cursor-pointer"
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>

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

export default Blog;
