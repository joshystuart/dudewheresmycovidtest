INSERT INTO "TestWaitTimes" ("testingFacilityId", "waitTimeDetails", "waitTime", "createdAt", "updatedAt")
SELECT t.id, w."waitTimeDetails", w."waitTime", w."createdAt", w."updatedAt"
FROM "TestingFacilities" t
         JOIN "WaitTimes" w ON t.site = w."siteName";