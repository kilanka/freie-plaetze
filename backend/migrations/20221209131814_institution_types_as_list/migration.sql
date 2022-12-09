-- CreateTable
CREATE TABLE "InstitutionType" (
    "id" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "shortName" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "InstitutionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Institution_types" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionType_paragraph_key" ON "InstitutionType"("paragraph");

-- CreateIndex
CREATE UNIQUE INDEX "_Institution_types_AB_unique" ON "_Institution_types"("A", "B");

-- CreateIndex
CREATE INDEX "_Institution_types_B_index" ON "_Institution_types"("B");

-- AddForeignKey
ALTER TABLE "_Institution_types" ADD CONSTRAINT "_Institution_types_A_fkey" FOREIGN KEY ("A") REFERENCES "Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Institution_types" ADD CONSTRAINT "_Institution_types_B_fkey" FOREIGN KEY ("B") REFERENCES "InstitutionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;


/* Add institution type rows (they are needed to convert the `type` field to `types`) */
INSERT INTO
    "InstitutionType" ("id","paragraph","name","shortName")
VALUES
    ('clbgjgq2m0003nhpujd90tnen','13,3','Sozialpädagogisch begleitetes Wohnen','Begleitetes Wohnen'),
    ('clbgjgq2m0002nhpu07p4vle0','19','Gemeinsames Wohnen für Mütter/Väter und Kinder','Eltern-Kind-Wohnen'),
    ('clbgjgq2m0004nhpuiixp8hpd','34','Heimerziehung, sonstige betreute Wohnform','Heimerziehung'),
    ('clbgjgq2m0007nhpulg15wt7e','35','Intensive sozialpädagogische Einzelbetreuung ','Einzelbetreuung'),
    ('clbgjgq2m0010nhpub6tfhjd7','35a','Eingliederungshilfe für Kinder und Jugendliche mit seelischer Behinderung oder drohender seelischer Behinderung','Eingliederungshilfe'),
    ('clbgjgq2m0011nhpunmsns048','41','Hilfe für junge Volljährige','Hilfe für junge Volljährige'),
    ('clbgjgq2m0014nhpu2hb895mq','42','Inobhutnahme von Kindern und Jugendlichen','Inobhutnahme');

/* Migrate the `type` column to `types` by adding entries to the `_Institution_types` relation */
INSERT INTO "_Institution_types" ("A","B")
    SELECT "Institution"."id", "InstitutionType"."id" FROM "Institution" LEFT JOIN "InstitutionType" ON replace(substring(TEXT("Institution"."type") from 2), '13', '13,3') = "InstitutionType"."paragraph"
ON CONFLICT DO NOTHING;


-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "type";

-- DropEnum
DROP TYPE "InstitutionTypeType";
