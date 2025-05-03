CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"table_name" varchar(63) NOT NULL,
	"name" text NOT NULL,
	"size" integer NOT NULL,
	"rows" integer NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid
);
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;