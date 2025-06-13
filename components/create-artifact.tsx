import { ReactNode } from "react";
import { customArtifact } from "@/artifacts/custom/client";

export interface ArtifactProps<K extends string, M = unknown> {
  kind: K;
  description: string;
  initialize?: (params: {
    documentId: string;
    setMetadata: (metadata: M) => void;
  }) => Promise<void>;
  onStreamPart?: (params: {
    streamPart: { type: string; content: unknown };
    setMetadata: (updater: (metadata: M) => M) => void;
    setArtifact: (updater: (artifact: any) => any) => void;
  }) => void;
  content: (params: {
    mode: "view" | "diff";
    status: "idle" | "streaming";
    content: string;
    isCurrentVersion: boolean;
    currentVersionIndex: number;
    onSaveContent: (content: string) => void;
    getDocumentContentById: (id: number) => string;
    isLoading: boolean;
    metadata: M;
  }) => ReactNode;
  actions?: Array<{
    icon: ReactNode;
    description: string;
    onClick: (params: { appendMessage: (message: any) => void }) => void;
  }>;
  toolbar?: Array<{
    icon: ReactNode;
    description: string;
    onClick: (params: { appendMessage: (message: any) => void }) => void;
  }>;
}

export class Artifact<K extends string, M = unknown> implements ArtifactProps<K, M> {
  kind: K;
  description: string;
  initialize?: ArtifactProps<K, M>["initialize"];
  onStreamPart?: ArtifactProps<K, M>["onStreamPart"];
  content: ArtifactProps<K, M>["content"];
  actions?: ArtifactProps<K, M>["actions"];
  toolbar?: ArtifactProps<K, M>["toolbar"];

  constructor(props: ArtifactProps<K, M>) {
    this.kind = props.kind;
    this.description = props.description;
    this.initialize = props.initialize;
    this.onStreamPart = props.onStreamPart;
    this.content = props.content;
    this.actions = props.actions;
    this.toolbar = props.toolbar;
  }
}

export const artifactDefinitions = [customArtifact];
