/* eslint-disable camelcase */

export interface TestingFacilitiesSpreadsheetRow {
  gsx$address: {
    $t: string;
  };
  gsx$agelimit: {
    $t: string;
  };
  gsx$delay: {
    $t: string;
  };
  gsx$delaytext: {
    $t: string;
  };
  gsx$directions: {
    $t: string;
  };
  gsx$facility: {
    $t: string;
  };
  gsx$id: {
    $t: string;
  };
  gsx$latitude: {
    $t: string;
  };
  gsx$longitude: {
    $t: string;
  };
  gsx$lga: {
    $t: string;
  };
  gsx$lgastatus: {
    $t: string;
  };
  gsx$phone: {
    $t: string;
  };
  gsx$requirements: {
    $t: string;
  };
  gsx$serviceavailability: {
    $t: string;
  };
  gsx$sitefacilities: {
    $t: string;
  };
  gsx$sitename?: {
    $t: string;
  };
  ['gsx$sitenamewingateavenuecommunitycentre-cohealth']?: {
    $t: string;
  };
  gsx$state?: {
    $t: string;
  };
  gsx$statevic?: {
    $t: string;
  };
  gsx$statustype: {
    $t: string;
  };
  gsx$suburb?: {
    $t: string;
  };
  gsx$suburbascotvale?: {
    $t: string;
  };
  gsx$testtracker: {
    $t: string;
  };
  gsx$website: {
    $t: string;
  };
  title: {
    $t: string;
  };
  updated: {
    $t: string;
  };
}

export interface IDhhsVictoriaTestingFacilitiesSpreadsheet {
  feed: {
    entry: TestingFacilitiesSpreadsheetRow[];
  };
}

// An example response from this endpoint: https://spreadsheets.google.com/feeds/list/1_tKN6yIxOUjqOOermICjxwhRExlhH3UTx8jsBWjxiy4/1/public/values?alt=json

// category: [{scheme: "http://schemas.google.com/spreadsheets/2006",…}]
// content: {type: "text",…}
// gsx$address: {$t: "Grebe Picnic Area"}
// $t: "Grebe Picnic Area"
// gsx$agelimit: {$t: "5 years+"}
// gsx$delay: {$t: "60"}
// gsx$delaytext: {$t: "60 minutes"}
// gsx$directions: {$t: "No"}
// gsx$facility: {$t: "Drive-through Testing Facility"}
// gsx$id: {$t: "408"}
// gsx$latitude: {$t: "-37.8497516"}
// gsx$lga: {$t: "Port Phillip City"}
// gsx$lgastatus: {$t: "Stage 3"}
// gsx$longitude: {$t: "144.9718314"}
// gsx$phone: {$t: ""}
// gsx$requirements: {$t: ""}
// gsx$serviceavailability: {,…}
// gsx$sitefacilities: {$t: "Entry via 22 Aughtie Drive Car Park"}
// gsx$sitename: {$t: "Aughtie Walk - Albert Park"}
// gsx$state: {$t: "VIC"}
// gsx$statustype: {$t: "Operating with extended hours"}
// gsx$suburb: {$t: "Albert Park"}
// gsx$testtracker: {$t: "Yes"}
// gsx$website: {$t: "https://www.coronavirus.vic.gov.au/where-get-tested-covid-19"}
