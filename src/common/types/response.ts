export class SuccesssResponse {
  constructor(message: string) {
    this.success = true;
    this.message = message;
  }

  status: number;

  success: boolean;

  message: string;
}

export class PaginationMetadata {
  limit: number;

  total: number;

  page: number;
}

export class PaginationResponse {
  constructor(data: any[], metadata?: PaginationMetadata) {
    this.data = data;
    this.metadata = metadata;
  }

  data: any[];
  metadata: PaginationMetadata;
}
