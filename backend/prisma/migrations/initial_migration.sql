CREATE TABLE "users" (
	"id" serial NOT NULL,
	"email" varchar(120) NOT NULL UNIQUE,
	"password" varchar(120) NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"updated_at" TIMESTAMP,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "medias" (
	"id" serial NOT NULL,
	"name" varchar(80) NOT NULL UNIQUE,
	CONSTRAINT "medias_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "books_wishlist" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"medias_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"updated_at" TIMESTAMP,
	"book_api_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"description" TEXT NOT NULL,
	"img" varchar(255) NOT NULL,
	"page_count" integer NOT NULL,
	CONSTRAINT "books_wishlist_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(180) NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"updated_at" TIMESTAMP,
	"active" BOOLEAN NOT NULL DEFAULT 'true',
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "readings" (
	"id" serial NOT NULL,
	"medias_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"grade" DECIMAL NOT NULL DEFAULT '0.0',
	"review" TEXT DEFAULT 'null',
	"book_api_id" varchar(70) NOT NULL,
	"title" varchar(100) NOT NULL,
	"author" varchar(200) NOT NULL,
	"description" TEXT,
	"img" varchar(255) NOT NULL,
	"page_count" integer NOT NULL,
	"read_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "readings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "watchings" (
	"id" serial NOT NULL,
	"medias_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"api_id" varchar(100) NOT NULL,
	"title" varchar(100) NOT NULL,
	"overview" TEXT NOT NULL,
	"release_date" varchar(28) NOT NULL,
	"img" varchar(255) NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"vote_average" float4 NOT NULL,
	"watched_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"grade" DECIMAL NOT NULL DEFAULT '0.0',
	"review" TEXT,
	CONSTRAINT "watchings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "films_wishlist" (
	"id" serial NOT NULL,
	"medias_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"api_id" varchar(100) NOT NULL,
	"title" varchar(100) NOT NULL,
	"tagline" TEXT NOT NULL,
	"runtime" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"img" varchar(255) NOT NULL,
	"vote_average" float4 NOT NULL,
	"overview" TEXT NOT NULL,
	CONSTRAINT "films_wishlist_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "tv_shows_wishlist" (
	"id" serial NOT NULL,
	"medias_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"api_id" varchar(100) NOT NULL,
	"title" varchar(150) NOT NULL,
	"creator" varchar(150) NOT NULL,
	"seasons_number" integer NOT NULL,
	"tagline" TEXT NOT NULL,
	"img" varchar(120) NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"vote_average" float4 NOT NULL,
	"overview" TEXT NOT NULL,
	CONSTRAINT "tv_shows_wishlist_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "books_wishlist" ADD CONSTRAINT "books_wishlist_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "books_wishlist" ADD CONSTRAINT "books_wishlist_fk1" FOREIGN KEY ("medias_id") REFERENCES "medias"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "readings" ADD CONSTRAINT "readings_fk0" FOREIGN KEY ("medias_id") REFERENCES "medias"("id");
ALTER TABLE "readings" ADD CONSTRAINT "readings_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "watchings" ADD CONSTRAINT "watchings_fk0" FOREIGN KEY ("medias_id") REFERENCES "medias"("id");
ALTER TABLE "watchings" ADD CONSTRAINT "watchings_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "films_wishlist" ADD CONSTRAINT "films_wishlist_fk0" FOREIGN KEY ("medias_id") REFERENCES "medias"("id");
ALTER TABLE "films_wishlist" ADD CONSTRAINT "films_wishlist_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "tv_shows_wishlist" ADD CONSTRAINT "tv_shows_wishlist_fk0" FOREIGN KEY ("medias_id") REFERENCES "medias"("id");
ALTER TABLE "tv_shows_wishlist" ADD CONSTRAINT "tv_shows_wishlist_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");
