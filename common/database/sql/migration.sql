-- New columns 2022-01-05
alter table "TestingFacilities"
    add "currentWaitTimeDescription" text;

alter table "TestingFacilities"
    add status varchar(255);

UPDATE "TestingFacilities" SET status = 'UNKNOWN';