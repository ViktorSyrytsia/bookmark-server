import { Injectable, NotFoundException } from '@nestjs/common';
import { BookmarksRepository } from './bookmarks.repository';
import { CreateBookmarkInput } from './dto/create-bookmark-input.dto';
import { GetBookmarkArgs } from './dto/get-bookmark-args.dto';
import { UpdateBookmarkInput } from './dto/update-bookmark-input.dto';
import { BookmarkDocument } from './models/bookmark.schema';

@Injectable()
export class BookmarksService {
  constructor(private readonly bookmarkRepository: BookmarksRepository) {}

  async createBookmark(
    createBookmarkData: CreateBookmarkInput,
    userId: string,
  ) {
    const bookmarkDocument = await this.bookmarkRepository.create({
      ...createBookmarkData,
      links: [],
      userId,
    });
    return this.toModel(bookmarkDocument);
  }

  async updateBookmark(
    updateBookmarkData: UpdateBookmarkInput,
    userId: string,
  ) {
    const bookmarkDocument = await this.bookmarkRepository.findOneAndUpdate(
      {
        _id: updateBookmarkData._id,
        userId,
      },
      updateBookmarkData,
    );
    return this.toModel(bookmarkDocument);
  }

  async getBookmarks(userId: string) {
    const bookmarkDocuments = await this.bookmarkRepository.find({ userId });
    return bookmarkDocuments.map((document) => this.toModel(document));
  }

  async getBookmark(bookmarkArgs: GetBookmarkArgs, userId: string) {
    const bookmarkDocument = await this.bookmarkRepository.findOne({
      ...bookmarkArgs,
      userId,
    });
    return this.toModel(bookmarkDocument);
  }

  private toModel(bookmarkDocument: BookmarkDocument) {
    return {
      ...bookmarkDocument,
      _id: bookmarkDocument._id.toHexString(),
    };
  }
}
