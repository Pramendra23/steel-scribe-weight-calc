
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadIcon, FileIcon, FileText } from "lucide-react";

interface FileUploadAreaProps {
  handleFilesAdded: (files: File[]) => void;
  uploadedFiles?: File[];
  isSimple?: boolean;
}

export function FileUploadArea({ 
  handleFilesAdded, 
  uploadedFiles = [],
  isSimple = false
}: FileUploadAreaProps) {
  return (
    <div className="mt-4">
      <Label className="mb-2 block">Or upload a file:</Label>
      <div className="flex items-center gap-2">
        <Input 
          type="file" 
          accept=".txt,.docx" 
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length > 0) {
              handleFilesAdded(files);
            }
          }}
          className="flex-grow"
        />
        <Button variant="outline">
          <UploadIcon className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      {!isSimple && uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Uploaded Files ({uploadedFiles.length})</h4>
          <div className="bg-background border rounded-md p-3 max-h-[200px] overflow-y-auto">
            <ul className="space-y-1">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
