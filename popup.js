async function JOB(traffic, startDate, endDate) {
  const data = await fetch("https://apis.indeed.com/graphql?co=JP&locale=en", {
    headers: {
      accept: "*/*",
      "accept-language": "en,ja;q=0.9,en-US;q=0.8",
      "content-type": "application/json",
      "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
      "indeed-client-sub-app": "curios",
      "indeed-client-sub-app-component": "./IndexPage",
      "indeed-ctk": "1i2do7jpjos5g801",
      priority: "u=1, i",
      "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-datadog-origin": "rum",
      "x-datadog-parent-id": "246250535885021549",
      "x-datadog-sampling-priority": "0",
      "x-datadog-trace-id": "6175819955198815121",
    },
    referrer: "https://employers.indeed.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"operationName\":\"JobsData\",\"variables\":{\"tableTotalQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[]},\"tableSummaryQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"summarize\":true},\"tableDetailsQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"limit\":500,\"orderBy\":[{\"field\":\"TITLE\",\"direction\":\"ASC\"}]}},\"extensions\":{},\"query\":\"query JobsData($tableTotalQueryOptions: JobCampaignDetailsInput!, $tableSummaryQueryOptions: JobCampaignDetailsInput!, $tableDetailsQueryOptions: JobCampaignDetailsInput!) {\\n  total: jobsCampaignsAnalyticsNumJob(input: $tableTotalQueryOptions) {\\n    uniqueCount\\n    __typename\\n  }\\n  summary: jobsCampaignsAnalyticsByJobAndFullNameLocation(\\n    input: $tableSummaryQueryOptions\\n  ) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      applyRate\\n      __typename\\n    }\\n    __typename\\n  }\\n  details: jobsCampaignsAnalyticsByJobAndFullNameLocation(\\n    input: $tableDetailsQueryOptions\\n  ) {\\n    result {\\n      aggJobID\\n      employerJobUuid\\n      title\\n      countryFullName\\n      city\\n      regionFullName\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      jobURL\\n      sourceWebsite\\n      lastModifiedDate\\n      jobReferenceNumber\\n      firstIndexedDate\\n      jobCompanyName\\n      applyRate\\n      jobStatus\\n      metadataCategory\\n      normTitle\\n      normTitleCategory\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const res = await data.json();
  return res?.data?.details?.result;
}
async function CAMPAIGN(traffic, startDate, endDate) {
  const data = await fetch("https://apis.indeed.com/graphql?co=US&locale=en-US", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
      "indeed-client-sub-app": "curios",
      "indeed-client-sub-app-component": "./IndexPage",
      "indeed-ctk": "1hte6gc83mkhp801",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-datadog-origin": "rum",
      "x-datadog-parent-id": "294970120844828067",
      "x-datadog-sampling-priority": "0",
      "x-datadog-trace-id": "6588642767995349893",
    },
    referrer: "https://employers.indeed.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"operationName\":\"CampaignsData\",\"variables\":{\"tableTotalQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[]},\"tableSummaryQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"summarize\":true},\"tableDetailsQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"limit\":500,\"orderBy\":[{\"field\":\"AD_NAME\",\"direction\":\"ASC\"}]}},\"extensions\":{},\"query\":\"query CampaignsData($tableTotalQueryOptions: JobCampaignDetailsInput!, $tableSummaryQueryOptions: JobCampaignDetailsInput!, $tableDetailsQueryOptions: JobCampaignDetailsInput!) {\\n  total: jobsCampaignsAnalyticsNumCmp(input: $tableTotalQueryOptions) {\\n    uniqueCount\\n    __typename\\n  }\\n  summary: jobsCampaignsAnalyticsByCmp(input: $tableSummaryQueryOptions) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      applyRate\\n      avgClickPerJob\\n      avgApplyStartPerJob\\n      avgApplyPerJob\\n      avgSpendPerJob\\n      __typename\\n    }\\n    __typename\\n  }\\n  details: jobsCampaignsAnalyticsByCmp(input: $tableDetailsQueryOptions) {\\n    result {\\n      advertisementID\\n      adName\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      applyRate\\n      uniqueJobCount\\n      avgClickPerJob\\n      avgApplyStartPerJob\\n      avgApplyPerJob\\n      avgSpendPerJob\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const res = await data.json();

  return res?.data?.details?.result;
}
async function LOCATION(traffic, startDate, endDate) {
  const data = await fetch("https://apis.indeed.com/graphql?co=US&locale=en-US", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
      "indeed-client-sub-app": "curios",
      "indeed-client-sub-app-component": "./IndexPage",
      "indeed-ctk": "1hte6gc83mkhp801",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-datadog-origin": "rum",
      "x-datadog-parent-id": "2346772961958959040",
      "x-datadog-sampling-priority": "0",
      "x-datadog-trace-id": "8817375805695491209",
    },
    referrer: "https://employers.indeed.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"operationName\":\"CountriesData\",\"variables\":{\"tableSummaryQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"summarize\":true},\"tableDetailsQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"limit\":500,\"orderBy\":[{\"field\":\"COUNTRY_FULLNAME\",\"direction\":\"ASC\"}]}},\"extensions\":{},\"query\":\"query CountriesData($tableSummaryQueryOptions: JobCampaignDetailsInput!, $tableDetailsQueryOptions: JobCampaignDetailsInput!) {\\n  summary: jobsCampaignsAnalyticsByCountry(input: $tableSummaryQueryOptions) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      applyRate\\n      avgClickPerJob\\n      avgApplyStartPerJob\\n      avgApplyPerJob\\n      avgSpendPerJob\\n      __typename\\n    }\\n    __typename\\n  }\\n  details: jobsCampaignsAnalyticsByCountry(input: $tableDetailsQueryOptions) {\\n    result {\\n      countryFullName\\n      uniqueJobCount\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      avgClickPerJob\\n      avgApplyStartPerJob\\n      avgApplyPerJob\\n      avgSpendPerJob\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const res = await data.json();
  return res?.data?.details?.result;
}
async function JOB_CATEGORY(traffic, startDate, endDate) {
  const data = await fetch("https://apis.indeed.com/graphql?co=US&locale=en-US", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
      "indeed-client-sub-app": "curios",
      "indeed-client-sub-app-component": "./IndexPage",
      "indeed-ctk": "1hte6gc83mkhp801",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-datadog-origin": "rum",
      "x-datadog-parent-id": "8890600896050664412",
      "x-datadog-sampling-priority": "0",
      "x-datadog-trace-id": "7098245771865629364",
    },
    referrer: "https://employers.indeed.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"operationName\":\"JobCategoriesData\",\"variables\":{\"tableSummaryQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"summarize\":true},\"tableDetailsQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"limit\":500,\"orderBy\":[{\"field\":\"NORM_TITLE_CATEGORY\",\"direction\":\"ASC\"}]}},\"extensions\":{},\"query\":\"query JobCategoriesData($tableSummaryQueryOptions: JobCampaignDetailsInput!, $tableDetailsQueryOptions: JobCampaignDetailsInput!) {\\n  summary: jobsCampaignsAnalyticsByOcCat(input: $tableSummaryQueryOptions) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      __typename\\n    }\\n    __typename\\n  }\\n  details: jobsCampaignsAnalyticsByOcCat(input: $tableDetailsQueryOptions) {\\n    result {\\n      normTitleCategory\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      uniqueJobCount\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const res = await data.json();
  return res?.data?.details?.result;
}
async function TIME(traffic, startDate, endDate) {
  const data = await fetch("https://apis.indeed.com/graphql?co=US&locale=en-US", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
      "indeed-client-sub-app": "curios",
      "indeed-client-sub-app-component": "./IndexPage",
      "indeed-ctk": "1hte6gc83mkhp801",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-datadog-origin": "rum",
      "x-datadog-parent-id": "1732775794224610063",
      "x-datadog-sampling-priority": "0",
      "x-datadog-trace-id": "7894821681103820237",
    },
    referrer: "https://employers.indeed.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"operationName\":\"TimeData\",\"variables\":{\"tableSummaryQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"granularity\":\"DAY\",\"summarize\":true},\"tableDetailsQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"granularity\":\"DAY\",\"limit\":500,\"orderBy\":[{\"field\":\"ACTIVITY_DATE\",\"direction\":\"ASC\"}]}},\"extensions\":{},\"query\":\"query TimeData($tableSummaryQueryOptions: JobCampaignDetailsInput!, $tableDetailsQueryOptions: JobCampaignDetailsInput!) {\\n  summary: jobsCampaignsAnalyticsForAll(input: $tableSummaryQueryOptions) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      __typename\\n    }\\n    __typename\\n  }\\n  details: jobsCampaignsAnalyticsForAll(input: $tableDetailsQueryOptions) {\\n    result {\\n      activityDate\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const res = await data.json();
  return res?.data?.details?.result;
}
async function JOB_SOURCE(traffic, startDate, endDate) {
  const data = await fetch("https://apis.indeed.com/graphql?co=US&locale=en-US", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
      "indeed-client-sub-app": "curios",
      "indeed-client-sub-app-component": "./IndexPage",
      "indeed-ctk": "1hte6gc83mkhp801",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-datadog-origin": "rum",
      "x-datadog-parent-id": "8187489896711663963",
      "x-datadog-sampling-priority": "0",
      "x-datadog-trace-id": "6480871429237686909",
    },
    referrer: "https://employers.indeed.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"operationName\":\"JobSourcesData\",\"variables\":{\"tableSummaryQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"summarize\":true},\"tableIndexedQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"jobHostingType\":\"INDEXED\",\"measureFilters\":[],\"extraDimensionFilters\":[],\"limit\":500},\"tableHostedQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"jobHostingType\":\"HOSTED\",\"measureFilters\":[],\"extraDimensionFilters\":[],\"limit\":500}},\"extensions\":{},\"query\":\"query JobSourcesData($tableSummaryQueryOptions: JobCampaignDetailsInput!, $tableIndexedQueryOptions: JobCampaignDetailsInput!, $tableHostedQueryOptions: JobCampaignDetailsInput!) {\\n  summary: jobsCampaignsAnalyticsForAll(input: $tableSummaryQueryOptions) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      __typename\\n    }\\n    __typename\\n  }\\n  indexed: jobsCampaignsAnalyticsForAll(input: $tableIndexedQueryOptions) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      uniqueJobCount\\n      __typename\\n    }\\n    __typename\\n  }\\n  hosted: jobsCampaignsAnalyticsForAll(input: $tableHostedQueryOptions) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      uniqueJobCount\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const res = await data.json();
  return res?.data?.hosted?.result;
}
async function JOB_REFERENCE_NUMBER(traffic, startDate, endDate) {
  const data = await fetch("https://apis.indeed.com/graphql?co=US&locale=en-US", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
      "indeed-client-sub-app": "curios",
      "indeed-client-sub-app-component": "./IndexPage",
      "indeed-ctk": "1hte6gc83mkhp801",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-datadog-origin": "rum",
      "x-datadog-parent-id": "5651144360850740232",
      "x-datadog-sampling-priority": "0",
      "x-datadog-trace-id": "8909743939742217511",
    },
    referrer: "https://employers.indeed.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"operationName\":\"JobReferenceNumberData\",\"variables\":{\"tableSummaryQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"summarize\":true},\"tableDetailsQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"limit\":500,\"orderBy\":[{\"field\":\"JOB_REFERENCE_NUMBER\",\"direction\":\"ASC\"}]}},\"extensions\":{},\"query\":\"query JobReferenceNumberData($tableSummaryQueryOptions: JobCampaignDetailsInput!, $tableDetailsQueryOptions: JobCampaignDetailsInput!) {\\n  summary: jobsCampaignsAnalyticsByJobRefNum(input: $tableSummaryQueryOptions) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      __typename\\n    }\\n    __typename\\n  }\\n  details: jobsCampaignsAnalyticsByJobRefNum(input: $tableDetailsQueryOptions) {\\n    result {\\n      jobReferenceNumber\\n      title\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const res = await data.json();
  return res?.data?.details?.result;
}
async function COMPANY_NAME(traffic, startDate, endDate) {
  const data = await fetch("https://apis.indeed.com/graphql?co=US&locale=en-US", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
      "indeed-client-sub-app": "curios",
      "indeed-client-sub-app-component": "./IndexPage",
      "indeed-ctk": "1hte6gc83mkhp801",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-datadog-origin": "rum",
      "x-datadog-parent-id": "4121774025341017228",
      "x-datadog-sampling-priority": "0",
      "x-datadog-trace-id": "1341461368611050719",
    },
    referrer: "https://employers.indeed.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"operationName\":\"CompaniesData\",\"variables\":{\"tableSummaryQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"summarize\":true},\"tableDetailsQueryOptions\":{\"advertiserSet\":[],\"dateRanges\":[{\"from\":\"${startDate}\",\"to\":\"${endDate}\"}],\"jobCompanyID\":[],\"jobType\":\"${traffic}\",\"advertisementID\":[],\"aggJobID\":[],\"normTitle\":[],\"jobCountryRegionCityID\":[],\"measureFilters\":[],\"extraDimensionFilters\":[],\"limit\":500,\"orderBy\":[{\"field\":\"JOB_COMPANY_NAME\",\"direction\":\"ASC\"}]}},\"extensions\":{},\"query\":\"query CompaniesData($tableSummaryQueryOptions: JobCampaignDetailsInput!, $tableDetailsQueryOptions: JobCampaignDetailsInput!) {\\n  summary: jobsCampaignsAnalyticsByCompany(input: $tableSummaryQueryOptions) {\\n    result {\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      __typename\\n    }\\n    __typename\\n  }\\n  details: jobsCampaignsAnalyticsByCompany(input: $tableDetailsQueryOptions) {\\n    result {\\n      jobCompanyID\\n      jobCompanyName\\n      sumImpressions\\n      sumClicks\\n      sumApplyStarts\\n      sumApplies\\n      avgCostPerClickLocal\\n      avgCostPerApplyStartLocal\\n      avgCostPerApplyLocal\\n      avgCTR\\n      avgACR\\n      avgASR\\n      sumCostLocal\\n      currency\\n      applyRate\\n      uniqueJobCount\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const res = await data.json();
  return res?.data?.details?.result;
}

async function fetchApi(dataJob) {
  const limit = Number(100);
  const page = Math.ceil(dataJob / limit);
  const totalFiles = Math.ceil(dataJob / 1000);
  const companyName = document.getElementById("search-input").value;

  let currentFille = 0;
  let totalData = [];
  const downloadData = async (ids) => {
    const res = await fetch("https://apis.indeed.com/graphql?locale=en-US&co=JP", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
        "indeed-client-sub-app": "japan-job-management-modules",
        "indeed-client-sub-app-component": "./CandidateDeliveryJobsTab",
        "indeed-ctk": "1htoc8bn2llpt802",
        priority: "u=1, i",
        "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-datadog-origin": "rum",
        "x-datadog-parent-id": "8438630412125509151",
        "x-datadog-sampling-priority": "0",
        "x-datadog-trace-id": "8852520271504570646",
      },
      referrer: "https://employers.indeed.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{\"operationName\":\"GenerateJobsBulkExportUrl\",\"variables\":{\"input\":{\"jobIds\":[${ids}],\"fileExtension\":\"XLSX\"}},\"extensions\":{},\"query\":\"mutation GenerateJobsBulkExportUrl($input: GenerateJobsBulkExportUrlInput!) {\\n  generateJobsBulkExportUrl(input: $input) {\\n    downloadUrl\\n    __typename\\n  }\\n}\\n\"}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    if (data?.data?.generateJobsBulkExportUrl?.downloadUrl && data) {
      await fetch(data.data.generateJobsBulkExportUrl.downloadUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          chrome.downloads.download(
            {
              url: url,
              filename: `${companyName}_${Number(currentFille + 1)}_${totalFiles}.xlsx`,
            },
            (downloadId) => {
              if (downloadId) {
                console.log("Download started:", downloadId);
              } else {
                console.error("Failed to start download");
              }
              URL.revokeObjectURL(url);
            }
          );
        })
        .catch((error) => console.error("Fetch error:", error));
      console.log(companyName, currentFille, totalFiles);

      return true;
    }
  };

  for (let i = 1; i <= page; i++) {
    if (totalData.length >= 1000) {
      const d = await downloadData(totalData);
      if (d) {
        totalData = [];
        currentFille = currentFille + 1;
      }
    }
    const offset = Number((i - 1) * limit);
    const res = await fetch("https://apis.indeed.com/graphql?co=JP&locale=en-US", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,ja;q=0.8",
        "content-type": "application/json",
        "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
        "indeed-client-sub-app": "japan-job-management-modules",
        "indeed-client-sub-app-component": "./CandidateDeliveryJobsTab",
        "indeed-ctk": "1i2do7jpjos5g801",
        priority: "u=1, i",
        "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-datadog-origin": "rum",
        "x-datadog-parent-id": "6845034162875065437",
        "x-datadog-sampling-priority": "0",
        "x-datadog-trace-id": "3434709861061679949",
      },
      referrer: "https://employers.indeed.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{\"operationName\":\"FindHostedJobPosts\",\"variables\":{\"hostedJobsInput\":{\"filter\":{\"partialAdvertisingLocation\":true,\"partialTitle\":true,\"statuses\":[\"ACTIVE\",\"PAUSED\"]},\"sort\":{\"direction\":\"DESC\",\"field\":\"DATE_CREATED\"},\"offset\":{\"limit\":${limit},\"offset\":${offset}}},\"hostedJobPostCountInput\":{\"partialTitle\":true,\"partialAdvertisingLocation\":true}},\"extensions\":{},\"query\":\"query FindHostedJobPosts($hostedJobsInput: FindHostedJobPostsInput!, $hostedJobPostCountInput: HostedJobPostCountsInput!) {\\n  hostedJobPostCounts(input: $hostedJobPostCountInput) {\\n    result {\\n      countByStatus {\\n        active\\n        deleted\\n        paused\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findHostedJobPosts(input: $hostedJobsInput) {\\n    results {\\n      hostedJobPost {\\n        applicationsCount {\\n          total\\n          milestoneCounts {\\n            milestone\\n            count\\n            __typename\\n          }\\n          __typename\\n        }\\n        newJobId: id\\n        country\\n        company\\n        dateCreated\\n        language\\n        advertisingLocations {\\n          active\\n          location\\n          jobKey\\n          __typename\\n        }\\n        status\\n        jobKey\\n        hostedJobBudget {\\n          ... on PeriodicSponsoredJobBudget {\\n            amount\\n            outOfBudget\\n            cost\\n            plan\\n            endDate\\n            __typename\\n          }\\n          __typename\\n        }\\n        attributes(keys: [\\\"itaAssociated\\\", \\\"useCmiJobPhoto\\\"]) {\\n          key\\n          value\\n          __typename\\n        }\\n        title\\n        legacyId\\n        advertisingLocations {\\n          active\\n          granularity\\n          jobKey\\n          location\\n          __typename\\n        }\\n        hostedJobPostVisibility {\\n          level\\n          __typename\\n        }\\n        jobTypes\\n        employerJob {\\n          id\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    const customData = data.data.findHostedJobPosts.results.map((item) => {
      return `\\\"${item.hostedJobPost.legacyId}\\\"`.replaceAll("\\", "");
    });
    if (customData) {
      document.getElementById("jobs-message").classList.remove("hidden");
      document.getElementById("jobs-message").textContent = `...ダウンロード中 ${currentFille}/${Number(totalFiles)}`;
      totalData.push(...customData);
    }
  }

  if (totalData.length > 0) {
    await downloadData(totalData);
  }
  return true;
}

var VIEW_BY = [
  { en: "JOB", jp: "求人" },
  { en: "CAMPAIGN", jp: "キャンペーン" },
  { en: "LOCATION", jp: "勤務地" },
  { en: "JOB_CATEGORY", jp: "職種カテゴリー" },
  { en: "TIME", jp: "日付" },
  { en: "JOB_SOURCE", jp: "求人掲載元" },
  { en: "JOB_REFERENCE_NUMBER", jp: "求人参照番号" },
  { en: "COMPANY_NAME", jp: "企業名" },
];
var TRAFFIC = [
  { en: "COMBINED", jp: "合計" },
  { en: "SPONSORED", jp: "スポンサー求人" },
  { en: "ORGANIC", jp: "オーガニック" },
];

async function handleGetTotalJobs() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    document.getElementById("jobs-spinner").classList.remove("hidden");
    document.getElementById("get-data").classList.add("disable");
    async function getIdJobs() {
      const total =
        document.querySelector("#cdjobstab > div.css-1ks564a.eu4oa1w0 > div > button.css-13wsyiw.e8ju0x50 > span")
          ?.textContent ||
        document.querySelector('label[data-shield-id="one-view--open-and-paused-job-status-filter"]')?.textContent;

      console.log(total);

      const totalOfCurrentJob = total.replace(/[^0-9]/g, "");
      if (total && Number(totalOfCurrentJob) > 0) {
        (async () => {
          await chrome.runtime.sendMessage({ dataJob: totalOfCurrentJob });
        })();
      }
    }
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: getIdJobs,
      })
      .then((e) => {
        console.log(e);
      });
  });
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  const dataCompany = request.companies;
  const currentTab = request.currentTab;
  const dataJob = request.dataJob;

  if (dataCompany && dataCompany.length > 0) {
    if (currentTab === "data") {
      document.getElementById("spinner").classList.add("hidden");
      const searchInput = document.getElementById("data-input");
      searchInput.addEventListener("keyup", (e) => {
        if (e.target.value.trim().length > 0) {
          document.getElementById("get-data-btn").classList.remove("disable");
        }
      });
      document.getElementById("get-data-btn").addEventListener("click", async (e) => {
        document.querySelector("button[data-origin]:not(.active)").classList.add("disable");
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tab = tabs[0];
          document.getElementById("spinner").classList.remove("hidden");
          e.target.classList.add("hidden");
          const searchInput = document.getElementById("data-input");

          let companies = searchInput.value.split("\n");
          let ind = 0;

          companies = companies
            .map((item) => item.split(","))
            .sort((a, b) => {
              const aa = dataCompany.find((i) => i.name === a[0]);
              const bb = dataCompany.find((i) => i.name === b[0]);

              if (aa && bb) {
                return bb.current - aa.current;
              }
              return 0;
            });

          async function getUrl(index) {
            if (index >= companies.length) {
              return;
            }
            const els = companies[index];
            if (els.length !== 5) {
              // Log errors
              const error = document.createElement("p");
              error.classList.add("error");
              error.textContent = `${els[0] ? els[0] + " - " : ""}見つかりませんでした`;
              document.getElementById("error-messages").appendChild(error);
              getNextCompany();
              return;
            }
            const cc = dataCompany.find(
              (dd) => String(dd.name).replace(/\s+/g, " ").trim() === els[0].replace(/\s+/g, " ").trim()
            );

            if (cc) {
              chrome.tabs.update(sender.tab.id, { url: cc.url });
            } else {
              const error = document.createElement("p");
              error.classList.add("error");
              error.textContent = `${els[0] ? els[0] + " - " : ""}見つかりませんでした`;
              document.getElementById("error-messages").appendChild(error);
              getNextCompany();
              return;
            }
          }

          function getNextCompany() {
            ind += 1;
            document.getElementById("message").textContent = `...ダウンロード中 ${ind}/${Number(companies.length)}`;
            if (ind < companies.length) {
              setTimeout(() => {
                getUrl(ind);
              }, 1500);
            } else {
              document.getElementById("message").classList.add("hidden");
              document.getElementById("spinner").classList.add("hidden");
              document.querySelector("button[data-origin]:not(.active)").classList.remove("disable");
              e.target.classList.remove("hidden");
              return;
            }
          }

          if (companies && companies.length > 0) {
            document.getElementById("message").classList.remove("hidden");
            document.getElementById("message").textContent = `...ダウンロード中 ${ind}/${Number(companies.length)}`;
            getUrl(ind);
          }

          chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
            if (changeInfo.status == "complete" && tabId) {
              const els = companies[ind];
              let startDate = new Date(els[1]);
              let endDate = new Date(els[2]);
              let traffic = String(els[3].trim()).toUpperCase();
              let viewBy = String(els[4].trim()).toUpperCase().replace(" ", "_");

              if (!startDate || !endDate || startDate.getTime() > endDate.getTime()) {
                // Log errors
                const error = document.createElement("p");
                error.classList.add("error");
                error.textContent = `${els[0] ? els[0] + " - " : ""}見つかりませんでした`;
                document.getElementById("error-messages").appendChild(error);
                getNextCompany();
              }
              if ((!traffic || traffic.length <= 0) && !TRAFFIC.find((v) => v.jp == traffic || v.en == traffic)) {
                // Log errors
                const error = document.createElement("p");
                error.classList.add("error");
                error.textContent = `${els[0] ? els[0] + " - " : ""}見つかりませんでした`;
                document.getElementById("error-messages").appendChild(error);
                getNextCompany();
              }
              if ((!viewBy || viewBy.length <= 0) && !VIEW_BY.find((v) => v.jp == viewBy || v.en == viewBy)) {
                // Log errors
                const error = document.createElement("p");
                error.classList.add("error");
                error.textContent = `${els[0] ? els[0] + " - " : ""}見つかりませんでした`;
                document.getElementById("error-messages").appendChild(error);
                getNextCompany();
              }

              startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
              endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());
              startDate = startDate.toJSON().slice(0, 10);
              endDate = endDate.toJSON().slice(0, 10);
              traffic = TRAFFIC.find((v) => v.jp == traffic || v.en == traffic)?.en;
              viewBy = VIEW_BY.find((v) => v.jp == viewBy || v.en == viewBy)?.en;
              const result = await window[viewBy](traffic, startDate, endDate);

              if (result) {
                let csvHeader = "";
                let csvBody = "";
                if (viewBy === "CAMPAIGN") {
                  csvHeader = `キャンペーン,表示回数,クリック数,費用` + "\n";
                  csvBody = result
                    .map((row) =>
                      Object.values([row.adName, row.sumImpressions, row.sumClicks, row.sumCostLocal]).join(",")
                    )
                    .join("\n");
                } else if (viewBy === "JOB") {
                  csvHeader = `求人,表示回数,クリック数,費用` + "\n";
                  csvBody = result
                    .map((row) =>
                      Object.values([row.title, row.sumImpressions, row.sumClicks, row.sumCostLocal]).join(",")
                    )
                    .join("\n");
                } else if (viewBy === "LOCATION") {
                  csvHeader = `国,表示回数,クリック数,費用` + "\n";
                  csvBody = result
                    .map((row) =>
                      Object.values([row.countryFullName, row.sumImpressions, row.sumClicks, row.sumCostLocal]).join(
                        ","
                      )
                    )
                    .join("\n");
                } else if (viewBy === "JOB_CATEGORY") {
                  csvHeader = `職種カテゴリー,表示回数,クリック数,費用` + "\n";
                  csvBody = result
                    .map((row) =>
                      Object.values([row.normTitleCategory, row.sumImpressions, row.sumClicks, row.sumCostLocal]).join(
                        ","
                      )
                    )
                    .join("\n");
                } else if (viewBy === "TIME") {
                  csvHeader =
                    `期間：日単位,表示回数,クリック数,応募開始数,応募数,費用,クリック単価（CPC）,応募開始単価（CPAS）,応募単価（CPA）` +
                    "\n";
                  csvBody = result
                    .map((row) =>
                      Object.values([
                        row.activityDate,
                        row.sumImpressions,
                        row.sumClicks,
                        row.sumApplyStarts,
                        row.sumApplies,
                        row.sumCostLocal,
                        row.avgCostPerClickLocal,
                        row.avgCostPerApplyStartLocal,
                        row.avgCostPerApplyLocal,
                      ]).join(",")
                    )
                    .join("\n");
                } else if (viewBy === "JOB_SOURCE") {
                  csvHeader = `求人掲載元,表示回数,クリック数,費用` + "\n";
                  csvBody = result
                    .map((row) =>
                      Object.values([row.title, row.sumImpressions, row.sumClicks, row.sumCostLocal]).join(",")
                    )
                    .join("\n");
                } else if (viewBy === "JOB_REFERENCE_NUMBER") {
                  csvHeader = `参照番号,表示回数,クリック数,費用` + "\n";
                  csvBody = result
                    .map((row) =>
                      Object.values([row.jobReferenceNumber, row.sumImpressions, row.sumClicks, row.sumCostLocal]).join(
                        ","
                      )
                    )
                    .join("\n");
                } else if (viewBy === "COMPANY_NAME") {
                  csvHeader = `企業名,表示回数,クリック数,費用` + "\n";
                  csvBody = result
                    .map((row) =>
                      Object.values([row.jobCompanyName, row.sumImpressions, row.sumClicks, row.sumCostLocal]).join(",")
                    )
                    .join("\n");
                }
                url = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvHeader + csvBody);

                chrome.downloads.download(
                  {
                    url: url,
                    filename: `${els[0]}_${startDate}_${endDate}.xlsx`,
                  },
                  (downloadId) => {
                    if (downloadId) {
                      console.log("Download started:", downloadId);
                    } else {
                      console.error("Failed to start download");
                    }
                    URL.revokeObjectURL(url);
                  }
                );

                getNextCompany();
                if (ind >= companies.length) {
                  document.getElementById("spinner").classList.add("hidden");
                  setTimeout(() => {
                    window.close();
                  }, 1000);
                }
              }
            }
          });
        });
      });
    } else {
      document.getElementById("jobs-spinner").classList.add("hidden");
      document.getElementById("list-company").classList.remove("hidden");

      const customCompanyCard = (data) => {
        const res = [];
        for (let i = 0; i < data.length; i++) {
          res.push(`<li id="${data[i].id ? "company-" + data[i].id : ""}"  
        >
            <a href="${data[i].url}" class="company-card" aria-current=${data[i].current} >
              <div>${data[i].name}</div>
              <span>${data[i].email}</span>
            </a>
        </li>`);
        }
        return res;
      };

      const keyControl = (e, container) => {
        const listCompany = container.querySelectorAll("ul > li > a");
        const companyIndex = Array.prototype.indexOf.call(listCompany, container.getElementsByClassName("selected")[0]);
        if (e.key == "ArrowDown") {
          if (container.getElementsByClassName("selected").length > 0) {
            if (companyIndex + 1 < listCompany.length) {
              container.getElementsByClassName("selected")[0].classList.remove("selected");
              listCompany[companyIndex + 1].classList.add("selected");
            }
          } else {
            listCompany[0].classList.add("selected");
          }
        } else if (e.key == "ArrowUp") {
          if (companyIndex > 0) {
            container.getElementsByClassName("selected")[0].classList.remove("selected");
            listCompany[companyIndex - 1].classList.add("selected");
          }
        } else if (e.key == "Enter") {
          onSelect(
            document.querySelector(".selected").children[0].textContent,
            container.getElementsByClassName("selected")[0].getAttribute("href")
          );
        }

        container.getElementsByClassName("selected")[0]?.scrollIntoView({
          behavior: "smooth",
        });
      };

      const onSelect = (name, url) => {
        document.getElementById("jobs-spinner").classList.remove("hidden");
        document.getElementById("search-input").value = name;
        document.getElementById("search-input").setAttribute("disabled", true);
        document.getElementById("list-company").classList.add("hidden");
        document.getElementById("total").classList.add("hidden");
        document.querySelector("button[data-origin]:not(.active)").classList.add("disable");
        chrome.tabs.update(sender.tab.id, { url: url });
      };

      const companies = customCompanyCard(dataCompany);
      document.getElementById("list-company").innerHTML = companies.join("");
      document.getElementById("total").innerHTML = `(${dataCompany.length})`;

      for (let i = 0; i < dataCompany.length; i++) {
        if (dataCompany[i].current) {
          const c = document.querySelector('a[aria-current="true"]');
          c?.addEventListener("click", () => {
            onSelect(dataFilter[i].name, dataFilter[i].url);
          });
        } else {
          const c = document.getElementById(`company-${dataCompany[i].id}`);
          c?.addEventListener("click", () => {
            onSelect(dataCompany[i].name, dataCompany[i].url);
          });
        }
      }

      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("keyup", (e) => {
        const container = searchInput.closest(".company-filter");
        if (["ArrowDown", "ArrowUp", "Enter"].indexOf(e?.key) != -1) {
          keyControl(e, container);
        } else {
          let value = e.target.value;
          if (value && value.trim().length > 0) {
            value = value.trim();
            document.getElementById("list-company").classList.remove("hidden");
            const dataFilter = dataCompany.filter((c) => {
              return c.name.includes(value) || c.email.includes(value);
            });
            document.getElementById("total").innerHTML = `(${dataFilter.length})`;
            if (dataFilter && dataFilter.length > 0) {
              const resp = customCompanyCard(dataFilter);
              document.getElementById("list-company").innerHTML = resp.join("");
              for (let i = 0; i < dataFilter.length; i++) {
                if (dataFilter[i].current) {
                  const c = document.querySelector('a[aria-current="true"]');
                  c?.addEventListener("click", () => {
                    onSelect(dataFilter[i].name, dataFilter[i].url);
                  });
                } else {
                  const c = document.getElementById(`company-${dataFilter[i].id}`);
                  c?.addEventListener("click", () => {
                    onSelect(dataFilter[i].name, dataFilter[i].url);
                  });
                }
              }
            } else {
              document.getElementById("list-company").innerHTML = `<span>データがございません</span>`;
            }
          } else {
            const companies = customCompanyCard(dataCompany);
            document.getElementById("list-company").innerHTML = companies.join("");
            document.getElementById("total").innerHTML = `(${dataCompany.length})`;
          }
        }
      });

      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == "complete") {
          document.getElementById("jobs-spinner").classList.add("hidden");
          document.getElementById("get-data").classList.remove("disable");
        }
      });
    }
  }
  if (dataJob) {
    const result = await fetchApi(dataJob);
    if (result) {
      document.getElementById("jobs-spinner").classList.add("hidden");
      document.getElementById("get-data").classList.add("disable");
      window.close();
    }
  }
});
document.getElementById("get-data").addEventListener("click", handleGetTotalJobs);
document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    document.getElementById("jobs-spinner").classList.remove("hidden");

    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: () => {
          const switchBtn =
            document.querySelector(
              "#app-root > div.css-1gorjcl.e37uo190 > div.css-lamjma.e37uo190 > div.css-13jgm14.e37uo190 > div:nth-child(2) > div > header > div.css-1myz1lp.e37uo190 > div:nth-child(4) > button.css-1g2eqsj.e8ju0x50"
            ) ||
            document.querySelector(
              'header[data-testid="employer-header"] > div[data-testid="header-list"] > div:nth-child(4) > button'
            );

          if (switchBtn) {
            switchBtn.click();
          }
        },
      })
      .then((e) => {
        console.log(e);
      });
  });

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];
    const origins = document.querySelectorAll("button[data-origin]");
    let currentTab = "Jobs";

    for (let i = 0; i < origins.length; i++) {
      origins[i].addEventListener("click", function (e) {
        // Get all elements with data-origin defined
        const allOrigins = document.querySelectorAll("*[data-origin]");
        for (i = 0; i < allOrigins.length; i++) {
          allOrigins[i].classList.remove("active");
        }

        // Get all elements with data-target defined
        const allTargets = document.querySelectorAll("*[data-target]");
        for (i = 0; i < allTargets.length; i++) {
          allTargets[i].style.display = "none";
        }

        //Only get elements of which the data-target attribute matches the value of the data-origin of the clicked  element
        const targets = document.querySelectorAll("*[data-target='" + e.target.dataset.origin + "']");
        for (i = 0; i < targets.length; i++) {
          targets[i].style.display = "flex";
        }

        e.target.classList.add("active");
        currentTab = e.target.dataset.origin;
        chrome.scripting.executeScript({
          args: [currentTab.toLowerCase()],
          target: { tabId: tab.id },
          func: getCompanies,
        });
      });
    }

    function getCompanies(type) {
      const companyList = document.querySelectorAll('div[role="treeitem"] > div');
      if (companyList && companyList.length > 0) {
        let infoCompanies = [];
        for (let item = 0; item < companyList.length; item++) {
          const company = companyList[item].querySelectorAll("div");
          const url = company[0].querySelector("a").getAttribute("href");
          let newUrl = url
            ? url?.replace(url?.slice(url?.indexOf("continue=") + 9), "https%3A%2F%2Femployers.indeed.com%2Fjobs")
            : "https://employers.indeed.com/jobs";

          if (type === "data") {
            newUrl = url
              ? url?.replace(
                  url?.slice(url?.indexOf("continue=") + 9),
                  "https%3A%2F%2Femployers.indeed.com%2Fanalytics%2Freport-jobs-campaigns"
                )
              : "https://employers.indeed.com/analytics/report-jobs-campaigns";
          }

          const posStart = url?.indexOf("switch/");
          const posEnd = url?.indexOf("?from");
          infoCompanies.push({
            name: company[0].querySelector("a").textContent?.replace(/\s+/g, " ").trim(),
            url: newUrl,
            el: company[0].querySelector("a"),
            email: company[1].textContent,
            id: url?.slice(posStart + 7, posEnd),
            current: url ? false : true,
          });
        }
        if (infoCompanies && infoCompanies.length > 0) {
          infoCompanies = infoCompanies.sort((a, b) => b.current - a.current);
          (async () => {
            await chrome.runtime.sendMessage({ companies: infoCompanies, currentTab: type });
          })();
        }
      }
    }
    chrome.scripting.executeScript({
      args: [currentTab.toLowerCase()],
      target: { tabId: tab.id },
      func: getCompanies,
    });
  });
});
