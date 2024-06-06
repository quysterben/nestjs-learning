import mongoose from 'mongoose';

export class JwtPayload {
  constructor(email: string, id: mongoose.Types.ObjectId) {
    this.email = email;
    this.id = id;
  }

  email: string;
  id: mongoose.Types.ObjectId;
}
