SELECT w.*
FROM "TestingWaitTimes" w
JOIN "TestingFacilities" t on t.id = w."testingFacilityId"
ORDER BY w."createdAt";


-- SELECT COUNT(w.id), date_trunc('hour', w."createdAt") as hour, avg(w."waitTime")
-- FROM "WaitTimes" w
-- WHERE w."siteName" = 'Moonee Valley Racecourse'
-- GROUP BY hour;


SELECT COUNT(w.id), extract(hour from (w."createdAt" AT TIME ZONE 'AEST')) as hour, avg(w."waitTime")
FROM "TestingWaitTimes" w
 JOIN "TestingFacilities" t on t.id = w."testingFacilityId"
WHERE t."site" = 'Moonee Valley Racecourse'
GROUP BY hour
ORDER BY hour;

SELECT COUNT(w.id), extract(hour from (w."createdAt" AT TIME ZONE 'AEST')) as hour, avg(w."waitTime")
FROM "TestingWaitTimes" w
         JOIN "TestingFacilities" t on t.id = w."testingFacilityId"
WHERE t."site" = '227 Bourke Street Melbourne'
GROUP BY hour
ORDER BY hour;

SELECT COUNT(w.id), extract(hour from (w."createdAt" AT TIME ZONE 'AEST')) as hour, avg(w."waitTime")
FROM "TestingWaitTimes" w
GROUP BY hour
ORDER BY hour;