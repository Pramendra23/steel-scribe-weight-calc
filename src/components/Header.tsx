
import { ThemeToggle } from "./ThemeToggle";
import { InstructionsModal } from "./InstructionsModal";
import { Button } from "./ui/button";
import { Home, BookOpen, FileText, Send } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink 
} from "./ui/navigation-menu";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();
  const isOnTubePage = location.pathname === '/square-tube';
  const isOnPipePage = location.pathname === '/square-pipe';
  const isOnShreeLipiPage = location.pathname === '/shree-lipi-converter';
  const isOnBlogPage = location.pathname.includes('/blog');
  const isMobile = useIsMobile();

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  // Mobile header view
  if (isMobile) {
    return (
      <header className="w-full py-4 px-4 flex flex-col gap-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-muted-foreground">MetalCalc Pro</span>
            <Button variant="ghost" asChild size="sm" className="flex items-center gap-2 px-0">
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <InstructionsModal />
            <ThemeToggle />
          </div>
        </div>
        
        <NavigationMenu className="w-full max-w-full">
          <NavigationMenuList className="flex w-full gap-1 overflow-x-auto pb-1">
            <NavigationMenuItem className="flex-shrink-0">
              <Button variant={isOnPipePage ? "default" : "outline"} asChild size="sm" className="whitespace-nowrap">
                <Link to="/">Square Pipe</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex-shrink-0">
              <Button variant={isOnTubePage ? "default" : "outline"} asChild size="sm" className="whitespace-nowrap">
                <Link to="/square-tube">Square Tube</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex-shrink-0">
              <Button variant={isOnShreeLipiPage ? "default" : "outline"} asChild size="sm" className="whitespace-nowrap">
                <Link to="/shree-lipi-converter">Shree Lipi</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex-shrink-0">
              <Button variant={isOnBlogPage ? "default" : "outline"} asChild size="sm" className="whitespace-nowrap">
                <Link to="/blog">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Blog
                </Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    );
  }

  // Desktop header view
  return (
    <header className="w-full py-4 px-4 sm:px-6 flex flex-wrap justify-between items-center border-b gap-4">
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-muted-foreground">MetalCalc Pro</span>
        <Button variant="ghost" asChild size="sm" className="flex items-center gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant={isOnPipePage ? "default" : "outline"} asChild>
          <Link to="/">Square Pipe Calculator</Link>
        </Button>
        <Button variant={isOnTubePage ? "default" : "outline"} asChild>
          <Link to="/square-tube">Square Tube Calculator</Link>
        </Button>
        <Button variant={isOnShreeLipiPage ? "default" : "outline"} asChild>
          <Link to="/shree-lipi-converter">Shree Lipi Converter</Link>
        </Button>
        <Button variant={isOnBlogPage ? "default" : "outline"} asChild>
          <Link to="/blog">
            <BookOpen className="h-4 w-4 mr-1" />
            Blog
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <InstructionsModal />
        <ThemeToggle />
      </div>
    </header>
  );
}
