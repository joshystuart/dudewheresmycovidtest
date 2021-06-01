/* eslint-disable camelcase */

export interface StatusListSpreadsheetRow {
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
  gsx$sitename: {
    $t: string;
  };
  gsx$state: {
    $t: string;
  };
  gsx$statustype: {
    $t: string;
  };
  gsx$suburb: {
    $t: string;
  };
  gsx$website: {
    $t: string;
  };
}

export interface IStatusListSpreadsheet {
  feed: {
    entry: StatusListSpreadsheetRow[];
  };
}

// An example response from this endpoint:
// https://spreadsheets.google.com/feeds/list/1_tKN6yIxOUjqOOermICjxwhRExlhH3UTx8jsBWjxiy4/2/public/values?alt=json

// category: [{scheme: "http://schemas.google.com/spreadsheets/2006",…}]
// content: {type: "text",…}
// gsx$address: {$t: "13A Wingate Avenue"}
// gsx$agelimit: {$t: "All ages"}
// gsx$delay: {$t: ""}
// gsx$delaytext: {$t: "No estimated wait time available"}
// gsx$facility: {$t: "Walk-through Testing Facility"}
// gsx$id: {$t: "454"}
// gsx$latitude: {$t: "-37.7794533"}
// gsx$lga: {$t: "Moonee Valley City"}
// gsx$lgastatus: {$t: "Stage 3"}
// gsx$longitude: {$t: "144.9194611"}
// gsx$phone: {$t: ""}
// gsx$requirements: {$t: "No appointment necessary."}
// gsx$serviceavailability: {$t: "Monday to Sunday - 9:15am-12:15pm and 1:15pm-4:15pm."}
// gsx$sitefacilities: {$t: ""}
// gsx$sitename: {$t: "Cohealth – Ascot Vale"}
// gsx$state: {$t: "VIC"}
// gsx$statustype: {$t: "New"}
// gsx$suburb: {$t: "Ascot Vale"}
// gsx$website: {$t: "https://www.coronavirus.vic.gov.au/where-get-tested-covid-19"}
