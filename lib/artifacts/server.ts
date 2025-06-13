import { customDocumentHandler } from "@/artifacts/custom/server";

export type DocumentHandler = {
  kind: string;
  onCreateDocument: (params: any) => Promise<string>;
  onUpdateDocument: (params: any) => Promise<string>;
};

export const documentHandlersByArtifactKind: Array<DocumentHandler> = [
  customDocumentHandler,
];

export const artifactKinds = ["custom"] as const;
export type ArtifactKind = typeof artifactKinds[number];
