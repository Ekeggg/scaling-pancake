import {users} from "./user.js"
import {integer, pgTable, timestamp, serial, text, numeric, boolean} from "drizzle-orm/pg-core";

const tasks = pgTable("tasks",{
    id: serial('id').primaryKey(),
    user: integer("user_id").references(() => users.id),
    title: text().notNull(),
    description: text(),
    difficulty: numeric({precision: 2, scale: 1}),
    completed: boolean().default(false),
    priority: text().default('Medium'),
    dueDate: timestamp("due_date"),
    createdAt: timestamp("created_at").defaultNow(),
})

export {tasks};