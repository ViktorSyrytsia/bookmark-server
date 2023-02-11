import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class BookmarkDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.String })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId })
  userId: string;

  @Prop({ type: SchemaTypes.Array })
  links: string[];
}

export const BookmarkSchema = SchemaFactory.createForClass(BookmarkDocument);
