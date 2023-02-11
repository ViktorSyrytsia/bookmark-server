import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetLinksArgs } from './dto/get-links-args.dto';
import { LinksService } from './links.service';
import { Link } from './models/link.model';

@Resolver(() => Link)
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Link], { name: 'links' })
  async getLinks(@Args() getLinksArgs: GetLinksArgs) {
    return this.linksService.getLinks(getLinksArgs);
  }
}
