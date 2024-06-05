export class SuccesssResponse {
  constructor(message: string, statusCode: number = 200) {
    this.status = statusCode;
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
  data: any[];

  metadata: PaginationMetadata;
}
