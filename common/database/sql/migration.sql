-- New columns 2022-01-05
alter table "TestingFacilities" add "currentWaitTimeDescription" text;
alter table "TestingFacilities" add status varchar(255);
UPDATE "TestingFacilities" SET status = 'UNKNOWN';

SELECT t.site, t."currentWaitTime", t."currentWaitTimeDescription", t.status
FROM "TestingFacilities" t
ORDER BY t.site;