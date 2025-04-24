
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Comment {
  id: number;
  name: string;
  date: string;
  content: string;
  likes: number;
}

// Sample comments for demonstration
const sampleComments: Record<string, Comment[]> = {
  "comprehensive-guide-pipe-weight-calculation": [
    {
      id: 1,
      name: "Michael Johnson",
      date: "April 16, 2025",
      content: "This article was incredibly helpful for my current project. The formula breakdown made complex calculations much easier to understand.",
      likes: 4
    },
    {
      id: 2,
      name: "Sarah Williams",
      date: "April 16, 2025",
      content: "I've been looking for a comprehensive guide like this for ages. The industry-specific considerations section was particularly useful for my oil and gas projects.",
      likes: 2
    }
  ],
  "square-tube-weight-calculation-structural-engineering": [
    {
      id: 1,
      name: "Robert Chen",
      date: "April 11, 2025",
      content: "The practical example really helped me understand how to apply these formulas in real-world scenarios. Would love to see more case studies in future articles.",
      likes: 3
    }
  ],
}

export interface BlogCommentsProps {
  postSlug: string;
}

export function BlogComments({ postSlug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments[postSlug] || []);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmitComment = () => {
    if (!newComment.trim() || !name.trim()) return;
    
    const comment: Comment = {
      id: Math.max(0, ...comments.map(c => c.id)) + 1,
      name: name,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      content: newComment,
      likes: 0
    };
    
    setComments([...comments, comment]);
    setNewComment("");
    setName("");
    setShowForm(false);
  };
  
  const handleLike = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, likes: comment.likes + 1 } 
        : comment
    ));
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          variant={showForm ? "secondary" : "default"}
        >
          {showForm ? "Cancel" : "Add Comment"}
        </Button>
      </div>
      
      {/* Comment form */}
      {showForm && (
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Comment
                </label>
                <Textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSubmitComment}>Post Comment</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Comments list */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-2 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{comment.name}</h4>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="mt-1 text-muted-foreground">{comment.content}</p>
                    <div className="mt-2 flex items-center">
                      <button 
                        onClick={() => handleLike(comment.id)} 
                        className="text-muted-foreground hover:text-primary flex items-center text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M7 10v12"></path>
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                        </svg>
                        {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}
