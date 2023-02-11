import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksResolver } from './bookmarks.resolver';
import { BookmarksRepository } from './bookmarks.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark } from './models/bookmark.model';
import { BookmarkSchema } from './models/bookmark.schema';

@Module({
  providers: [BookmarksService, BookmarksResolver, BookmarksRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
  ],
})
export class BookmarksModule {}
