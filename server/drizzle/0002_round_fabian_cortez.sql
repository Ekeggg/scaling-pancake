ALTER TABLE "tasks" ADD COLUMN "completed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" text DEFAULT 'Medium';