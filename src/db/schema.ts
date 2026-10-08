import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer().default(0).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
});

export const readingList = pgTable("readingList", {
  id: serial("id").primaryKey(),
  read: boolean().default(false),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id),
});

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingList),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  readingList: many(readingList),
}));

export const readingListRealtions = relations(readingList, ({ one }) => ({
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
  blogs: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
}));
