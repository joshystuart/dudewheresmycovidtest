/* eslint-disable camelcase */

export interface IWaitTimesSpreadsheetRow {
  gsx$delaymins: {
    $t: string;
  };
  gsx$delaytext: {
    $t: string;
  };
  gsx$facility: {
    $t: string;
  };
  gsx$site: {
    $t: string;
  };
  gsx$suburb: {
    $t: string;
  };
  title: {
    $t: string;
  };
}

export interface IWaitTimesSpreadsheet {
  feed: {
    entry: IWaitTimesSpreadsheetRow[];
  };
}

// An example response from this endpoint: https://spreadsheets.google.com/feeds/list/1dx5fDWCKGSJM3L96jVyhksCIxeSPh3ig5VDowWRTPFs/4/public/values?alt=json

// category: [{scheme: "http://schemas.google.com/spreadsheets/2006",…}]
// content: {type: "text",…}
// gsx$delaymins: {$t: "120"}
// gsx$delaytext: {$t: "120 minutes"}
// gsx$facility: {$t: "Drive-through Testing Facility"}
// gsx$site: {$t: "Northern Health - Northern Hospital - Drive Through"}
// gsx$suburb: {$t: "Epping"}
// id: {,…}
// link: [{rel: "self", type: "application/atom+xml",…}]
// title: {type: "text", $t: "Northern Health - Northern Hospital - Drive Through"}
