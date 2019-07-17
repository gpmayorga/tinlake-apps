import {
  CoreapiCreateDocumentRequest,
  CoreapiDocumentResponse,
} from "../../../clients/centrifuge-node";

export interface DocumentRequest extends CoreapiCreateDocumentRequest {
  _id?: string;
}

export interface Document extends CoreapiDocumentResponse {
  ownerId?: string;
  _id?: string;
  createdAt?: Date,
  updatedAt?: Date
}

export enum DOCUMENT_ACCESS  {
  READ = 'read_access',
  WRITE = 'write_access',
}

