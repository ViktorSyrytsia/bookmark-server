import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.String })
  email: string;

  @Prop({ type: SchemaTypes.String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
