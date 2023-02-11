import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field({ nullable: true })
  readonly title: string;

  @Field({ nullable: true })
  readonly siteName: string;

  @Field()
  readonly url: string;

  @Field(() => [String])
  readonly images: string[];
}
