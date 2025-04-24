
import { Header } from "@/components/Header";
import { PipeCalculator } from "@/components/PipeCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Calculator, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const Index = () => {
  // Get latest 2 blog posts for the featured section
  const featuredPosts = blogPosts.slice(0, 2);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-800 font-poppins">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-primary mb-4">Pipe Weight Calculator & Square Tube Weight Calculator</h2>
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80"
                alt="Metal pipes stacked engineering"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="p-8 text-white max-w-2xl">
                  <h3 className="text-3xl font-bold mb-4">Professional Pipe & Tube Weight Calculations</h3>
                  <p className="text-lg opacity-90">
                    Instantly calculate weights for any metal pipe or square tube project!
                  </p>
                </div>
              </div>
            </div>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to our <b>Pipe Weight Calculator</b> and <b>Square Tube Weight Calculator</b>! 
                  This essential tool helps engineers, fabricators, and DIYers determine the exact weight of square pipes and tubes for all types of constructions.
                  <br /><br />
                  Get instant calculations based on pipe dimensions, thickness, length, and material density.
                  <br /><br />
                  Key features include:
                  <ul className="list-disc list-inside ml-4 my-2">
                    <li>Support for metric and imperial units</li>
                    <li>Diverse material selection or custom densities</li>
                    <li>Detailed, easy-to-understand results</li>
                    <li>Save and compare multiple calculations quickly</li>
                  </ul>
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Top AdSense Placement */}
          <div className="w-full h-[250px] bg-white dark:bg-gray-800 mb-8 flex items-center justify-center border rounded-lg shadow-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
          
          <PipeCalculator />
          
          {/* Middle AdSense Placement */}
          <div className="w-full h-[250px] bg-white dark:bg-gray-800 my-8 flex items-center justify-center border rounded-lg shadow-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
          
          {/* Featured Blog Posts Section */}
          <div className="mt-12 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Latest from Our Blog</h3>
              <Link to="/blog" className="flex items-center text-primary hover:underline font-medium">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <Card key={post.slug} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
                  <Link to={`/blog/${post.slug}`}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                  </Link>
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
          </div>
          
          {/* Newsletter Sign up */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 my-8">
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
          
          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Why Use Our Calculators?</h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Accurate results based on modern engineering standards</li>
                  <li>Simple, intuitive interface tailored for speed</li>
                  <li>Metric and imperial support</li>
                  <li>Comprehensive output & reporting</li>
                  <li>Absolutely free to use!</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Applications</h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Construction & infrastructure projects</li>
                  <li>Industrial and mechanical manufacturing</li>
                  <li>Architectural steelwork and frameworks</li>
                  <li>Project costing and load calculations</li>
                  <li>Professional & DIY planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Bottom AdSense Placement */}
          <div className="w-full h-[250px] bg-white dark:bg-gray-800 mt-8 flex items-center justify-center border rounded-lg shadow-lg">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="space-x-4 mb-4 sm:mb-0">
            <Link to="/about" className="hover:text-primary transition-colors">About this Tool</Link>
            <Link to="/help" className="hover:text-primary transition-colors">Help / FAQ</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p>© {new Date().getFullYear()} MetalCalc Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
