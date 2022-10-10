CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(100),
	"complete" BOOLEAN DEFAULT FALSE);
	
	
	
INSERT INTO "tasks" ("task", "complete")
VALUES ('vacuum the living room', FALSE), ('wash laundry', FALSE), ('wash dishes', FALSE), ('wash car', FALSE), ('fill the gas tank', FALSE), ('make up bed', TRUE);