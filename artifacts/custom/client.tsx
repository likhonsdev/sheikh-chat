import { Artifact } from "@/components/create-artifact";
import { toast } from "sonner";

interface CustomArtifactMetadata {
  info: string;
}

export const customArtifact = new Artifact<"custom", CustomArtifactMetadata>({
  kind: "custom",
  description: "A custom artifact for demonstrating custom functionality.",
  
  initialize: async ({ documentId, setMetadata }) => {
    setMetadata({
      info: `Document ${documentId} initialized.`,
    });
  },

  onStreamPart: ({ streamPart, setMetadata, setArtifact }) => {
    if (streamPart.type === "info-update") {
      setMetadata((metadata) => ({
        ...metadata,
        info: streamPart.content as string,
      }));
    }
    if (streamPart.type === "content-update") {
      setArtifact((draftArtifact) => ({
        ...draftArtifact,
        content: draftArtifact.content + (streamPart.content as string),
        status: "streaming",
      }));
    }
  },

  content: ({
    mode,
    status,
    content,
    isCurrentVersion,
    currentVersionIndex,
    onSaveContent,
    getDocumentContentById,
    isLoading,
    metadata,
  }) => {
    if (isLoading) {
      return <div>Loading custom artifact...</div>;
    }

    if (mode === "diff") {
      const oldContent = getDocumentContentById(currentVersionIndex - 1);
      const newContent = getDocumentContentById(currentVersionIndex);
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-headline">Changes</h3>
          <div className="grid grid-cols-2 gap-4">
            <pre className="p-4 bg-accent/10 rounded-lg">{oldContent}</pre>
            <pre className="p-4 bg-primary/10 rounded-lg">{newContent}</pre>
          </div>
        </div>
      );
    }

    return (
      <div className="custom-artifact space-y-4">
        <div className="p-4 rounded-lg border bg-background">
          <div className="prose prose-sm dark:prose-invert">
            {content}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(content);
              toast.success("Content copied to clipboard!");
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Copy
          </button>
        </div>
      </div>
    );
  },

  actions: [
    {
      icon: <span>⟳</span>,
      description: "Refresh artifact info",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Please refresh the info for my custom artifact.",
        });
      },
    },
  ],

  toolbar: [
    {
      icon: <span>✎</span>,
      description: "Edit custom artifact",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Edit the custom artifact content.",
        });
      },
    },
  ],
});
