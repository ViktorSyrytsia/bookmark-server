import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/models/user.model';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkInput } from './dto/create-bookmark-input.dto';
import { GetBookmarkArgs } from './dto/get-bookmark-args.dto';
import { UpdateBookmarkInput } from './dto/update-bookmark-input.dto';
import { Bookmark } from './models/bookmark.model';

@Resolver(() => Bookmark)
export class BookmarksResolver {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  async createBookmark(
    @Args('createBookmarkData') createBookmarkData: CreateBookmarkInput,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.createBookmark(createBookmarkData, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  async updateBookmark(
    @Args('updateBookmarkData') updateBookmarkData: UpdateBookmarkInput,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.updateBookmark(updateBookmarkData, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bookmark], { name: 'bookmarks' })
  async getBookmarks(@CurrentUser() user: User) {
    return this.bookmarksService.getBookmarks(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bookmark, { name: 'bookmark' })
  async getBookmark(
    @Args() getBookmarkArgs: GetBookmarkArgs,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.getBookmark(getBookmarkArgs, user._id);
  }
}
