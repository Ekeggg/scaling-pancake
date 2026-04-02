import { users } from "./user"
import {integer, pgTable, varchar, timestamp, serial, text,numeric} from "drizzle-orm/pg-core";

const tasks = pgTable("users",{
    id: serial('id').primaryKey(),
    user: integer("user_id").references(() => users.id),
    title: text().notNull(),
    description: text(),
    difficulty: numeric({precision: 2, scale: 1}),
    createdAt: timestamp("created_at").defaultNow(),
})

export default {tasks};