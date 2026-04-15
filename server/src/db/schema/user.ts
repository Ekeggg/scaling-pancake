import {pgTable, varchar, timestamp, serial, text} from "drizzle-orm/pg-core";

const users = pgTable("users",{
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 20 }).notNull(),
    type: text().notNull(),
    password_hash: varchar('password', { length: 255 }).notNull(),
    date_created: timestamp("date_created").defaultNow(),
})

export {users};