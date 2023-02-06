-- CreateTable
CREATE TABLE "medias" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,

    CONSTRAINT "medias_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "readings" (
    "id" SERIAL NOT NULL,
    "medias_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "grade" DECIMAL NOT NULL DEFAULT 0.0,
    "review" TEXT DEFAULT 'null',
    "book_api_id" VARCHAR(70) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "author" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "img" VARCHAR(255) NOT NULL,
    "page_count" INTEGER NOT NULL,
    "read_at" TIMESTAMP(6) NOT NULL DEFAULT '2023-01-30 22:00:05.78773'::timestamp without time zone,

    CONSTRAINT "readings_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" VARCHAR(180) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT '2023-01-25 18:10:36.461854'::timestamp without time zone,
    "updated_at" TIMESTAMP(6),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" VARCHAR(120) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT '2023-01-25 18:10:36.461854'::timestamp without time zone,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_wishlist" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "medias_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT '2023-01-30 21:56:08.259375'::timestamp without time zone,
    "updated_at" TIMESTAMP(6),
    "book_api_id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "img" VARCHAR(255) NOT NULL,
    "page_count" INTEGER NOT NULL,

    CONSTRAINT "books_wishlist_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "films_wishlist" (
    "id" SERIAL NOT NULL,
    "medias_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "api_id" VARCHAR(100) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "tagline" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT '2023-01-31 20:03:07.233602'::timestamp without time zone,
    "img" VARCHAR(255) NOT NULL,
    "vote_average" REAL NOT NULL,
    "overview" TEXT NOT NULL,

    CONSTRAINT "films_wishlist_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv_shows_wishlist" (
    "id" SERIAL NOT NULL,
    "medias_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "api_id" VARCHAR(100) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "creator" VARCHAR(150) NOT NULL,
    "seasons_number" INTEGER NOT NULL,
    "tagline" TEXT NOT NULL,
    "img" VARCHAR(120) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT '2023-01-31 20:03:07.233602'::timestamp without time zone,
    "vote_average" REAL NOT NULL,
    "overview" TEXT NOT NULL,

    CONSTRAINT "tv_shows_wishlist_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchings" (
    "id" SERIAL NOT NULL,
    "medias_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "api_id" VARCHAR(100) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "overview" TEXT NOT NULL,
    "release_date" VARCHAR(28) NOT NULL,
    "img" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT '2023-01-31 19:07:36.309886'::timestamp without time zone,
    "vote_average" REAL NOT NULL,
    "watched_at" TIMESTAMP(6) NOT NULL DEFAULT '2023-01-31 19:07:36.309886'::timestamp without time zone,
    "grade" DECIMAL NOT NULL DEFAULT 0.0,
    "review" TEXT,

    CONSTRAINT "watchings_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medias_name_key" ON "medias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_fk0" FOREIGN KEY ("medias_id") REFERENCES "medias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_wishlist" ADD CONSTRAINT "books_wishlist_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_wishlist" ADD CONSTRAINT "books_wishlist_fk1" FOREIGN KEY ("medias_id") REFERENCES "medias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "films_wishlist" ADD CONSTRAINT "films_wishlist_fk0" FOREIGN KEY ("medias_id") REFERENCES "medias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "films_wishlist" ADD CONSTRAINT "films_wishlist_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tv_shows_wishlist" ADD CONSTRAINT "tv_shows_wishlist_fk0" FOREIGN KEY ("medias_id") REFERENCES "medias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tv_shows_wishlist" ADD CONSTRAINT "tv_shows_wishlist_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "watchings" ADD CONSTRAINT "watchings_fk0" FOREIGN KEY ("medias_id") REFERENCES "medias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "watchings" ADD CONSTRAINT "watchings_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
