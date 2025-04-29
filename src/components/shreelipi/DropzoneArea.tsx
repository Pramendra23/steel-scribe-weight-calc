
import { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, AlertCircle, FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DropzoneAreaProps {
  onFilesAdded: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
}

export function DropzoneArea({ 
  onFilesAdded, 
  acceptedFileTypes = ['.txt', '.docx'], 
  maxFiles = 10 
}: DropzoneAreaProps) {
  const [error, setError] = useState<string | null>(null);

  const acceptedTypes = useMemo(() => {
    return acceptedFileTypes.reduce((acc, type) => {
      // Handle type with or without dot
      const fileType = type.startsWith('.') ? type.substring(1) : type;
      
      switch (fileType) {
        case 'txt':
          acc['text/plain'] = ['.txt'];
          break;
        case 'docx':
          acc['application/vnd.openxmlformats-officedocument.wordprocessingml.document'] = ['.docx'];
          break;
        // Add more cases for other file types if needed
        default:
          acc[`application/${fileType}`] = [`.${fileType}`];
      }
      
      return acc;
    }, {} as Record<string, string[]>);
  }, [acceptedFileTypes]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejectionReasons = rejectedFiles.map(rejection => {
        const errors = rejection.errors.map((error: any) => error.message).join(', ');
        return `${rejection.file.name}: ${errors}`;
      }).join('; ');
      
      setError(`Some files were rejected: ${rejectionReasons}`);
      return;
    }
    
    if (acceptedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    setError(null);
    onFilesAdded(acceptedFiles);
  }, [maxFiles, onFilesAdded]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject 
  } = useDropzone({ 
    onDrop,
    accept: acceptedTypes,
    maxFiles,
    multiple: true
  });

  // Define border color based on state
  let borderColor = 'border-input';
  if (isFocused) borderColor = 'border-primary';
  if (isDragAccept) borderColor = 'border-green-500';
  if (isDragReject) borderColor = 'border-red-500';

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary focus:outline-none`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <UploadIcon className={`h-10 w-10 mb-4 ${isDragActive ? 'text-primary animate-bounce' : 'text-muted-foreground'}`} />
          
          {isDragActive ? (
            <p className="text-primary font-medium">Drop the files here...</p>
          ) : (
            <>
              <p className="mb-2 font-medium">Drag & drop files here, or click to select files</p>
              <p className="text-sm text-muted-foreground">
                Supported formats: {acceptedFileTypes.join(', ')} (Max {maxFiles} files)
              </p>
            </>
          )}
          
          <Button 
            variant="outline" 
            className="mt-4"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const input = document.querySelector('input[type="file"]');
              if (input) {
                input.click();
              }
            }}
          >
            <FileIcon className="mr-2 h-4 w-4" />
            Browse Files
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="mt-2 flex items-center text-red-500 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}
