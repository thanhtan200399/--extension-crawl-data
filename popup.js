async function fetchApi(dataJob) {
  const limit = Number(100)
  const page = Math.ceil(dataJob / limit )
  const totalFiles = Math.ceil(dataJob / 1000 )
  const companyName = document.getElementById("search-input").value
  
  let currentFille = 0;
  let totalData = [];
  const downloadData = async (ids)=>{
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
          .then(response => response.blob())
          .then(blob => {
              const url = URL.createObjectURL(blob);
              chrome.downloads.download({
                  url: url,
                  filename: `${companyName}_${currentFille}_${totalFiles}.xlsx`
              }, (downloadId) => {
                  if (downloadId) {
                      console.log("Download started:", downloadId);
                  } else {
                      console.error('Failed to start download');
                  }
                  URL.revokeObjectURL(url);
              });
          })
          .catch(error => console.error('Fetch error:', error));
      console.log(companyName, currentFille, totalFiles);
      
      return true
    }
  }

  for(let i = 1; i <= page; i++){
    if(totalData.length >= 1000){
      const d = await downloadData(totalData);
      if(d){
        totalData=[]
        currentFille = currentFille + 1;
      }
    }
    const offset = Number((i - 1) * limit)
    const res = await fetch("https://apis.indeed.com/graphql?co=JP&locale=en-US", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,ja;q=0.8",
        "content-type": "application/json",
        "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
        "indeed-client-sub-app": "japan-job-management-modules",
        "indeed-client-sub-app-component": "./CandidateDeliveryJobsTab",
        "indeed-ctk": "1i2do7jpjos5g801",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-datadog-origin": "rum",
        "x-datadog-parent-id": "6845034162875065437",
        "x-datadog-sampling-priority": "0",
        "x-datadog-trace-id": "3434709861061679949"
      },
      "referrer": "https://employers.indeed.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"operationName\":\"FindHostedJobPosts\",\"variables\":{\"hostedJobsInput\":{\"filter\":{\"partialAdvertisingLocation\":true,\"partialTitle\":true,\"statuses\":[\"ACTIVE\",\"PAUSED\"]},\"sort\":{\"direction\":\"DESC\",\"field\":\"DATE_CREATED\"},\"offset\":{\"limit\":${limit},\"offset\":${offset}}},\"hostedJobPostCountInput\":{\"partialTitle\":true,\"partialAdvertisingLocation\":true}},\"extensions\":{},\"query\":\"query FindHostedJobPosts($hostedJobsInput: FindHostedJobPostsInput!, $hostedJobPostCountInput: HostedJobPostCountsInput!) {\\n  hostedJobPostCounts(input: $hostedJobPostCountInput) {\\n    result {\\n      countByStatus {\\n        active\\n        deleted\\n        paused\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findHostedJobPosts(input: $hostedJobsInput) {\\n    results {\\n      hostedJobPost {\\n        applicationsCount {\\n          total\\n          milestoneCounts {\\n            milestone\\n            count\\n            __typename\\n          }\\n          __typename\\n        }\\n        newJobId: id\\n        country\\n        company\\n        dateCreated\\n        language\\n        advertisingLocations {\\n          active\\n          location\\n          jobKey\\n          __typename\\n        }\\n        status\\n        jobKey\\n        hostedJobBudget {\\n          ... on PeriodicSponsoredJobBudget {\\n            amount\\n            outOfBudget\\n            cost\\n            plan\\n            endDate\\n            __typename\\n          }\\n          __typename\\n        }\\n        attributes(keys: [\\\"itaAssociated\\\", \\\"useCmiJobPhoto\\\"]) {\\n          key\\n          value\\n          __typename\\n        }\\n        title\\n        legacyId\\n        advertisingLocations {\\n          active\\n          granularity\\n          jobKey\\n          location\\n          __typename\\n        }\\n        hostedJobPostVisibility {\\n          level\\n          __typename\\n        }\\n        jobTypes\\n        employerJob {\\n          id\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
    const data = await res.json();
    const customData = data.data.findHostedJobPosts.results.map((item) => {
      return `\\\"${item.hostedJobPost.legacyId}\\\"`.replaceAll("\\", "");
    });
    if(customData){
      document.getElementById("message").classList.remove("hidden");
      document.getElementById("message").textContent = `...ダウンロード中 ${currentFille}/${Number(totalFiles)}`;
      totalData.push(...customData)
    }
  }


  if(totalData.length >0){
    await downloadData(totalData)
  }
  // return true;
}

async function handleGetTotalJobs() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    document.getElementById("spinner").classList.remove("hidden");
    async function getIdJobs() {
      const total = document.querySelector("#cdjobstab > div.css-1ks564a.eu4oa1w0 > div > button.css-13wsyiw.e8ju0x50 > span").textContent
      const totalOfCurrentJob = total.replace(/[^0-9]/g, '');
      if (total && Number(totalOfCurrentJob) > 0) {
        (async () => {
          await chrome.runtime.sendMessage({ data: totalOfCurrentJob });
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
  const dataJob = request.data;

  const dataCompany = request.companies;
  if (dataCompany && dataCompany.length > 0) {
    document.getElementById("spinner").classList.add("hidden");
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
      document.getElementById("spinner").classList.remove("hidden");
      document.getElementById("search-input").value = name;
      document.getElementById("search-input").setAttribute("disabled", true);
      document.getElementById("list-company").classList.add("hidden");
      document.getElementById("total").classList.add("hidden");
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
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("get-data").classList.remove("disable");
      }
    });
  }

  if(dataJob)
   {
    const result = await fetchApi(dataJob);
    if (result) {
      document.getElementById("spinner").classList.add("hidden");
      document.getElementById("get-data").classList.add("disable");
      window.close();
    }
   }
});

document.getElementById("get-data").addEventListener("click", handleGetTotalJobs);
document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    document.getElementById("spinner").classList.remove("hidden");

    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: () => {
          // const switchBtn = document.querySelector('button[aria-label="Switch employer account"]');
          const switchBtn = document.querySelector('#app-root > div.css-1gorjcl.e37uo190 > div.css-lamjma.e37uo190 > div.css-13jgm14.e37uo190 > div:nth-child(2) > div > header > div.css-1myz1lp.e37uo190 > div:nth-child(4) > button.css-1g2eqsj.e8ju0x50');
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
    function getCompanies() {
      const companyList = document.querySelectorAll('div[role="treeitem"] > div');
      if (companyList && companyList.length > 0) {
        let infoCompanies = [];
        for (let item = 0; item < companyList.length; item++) {
          const company = companyList[item].querySelectorAll("div");
          const url = company[0].querySelector("a").getAttribute("href");
          const newUrl = url
            ? url?.replace(url?.slice(url?.indexOf("continue=") + 9), "https%3A%2F%2Femployers.indeed.com%2Fjobs")
            : "https://employers.indeed.com/jobs";

          const posStart = url?.indexOf("switch/");
          const posEnd = url?.indexOf("?from");
          infoCompanies.push({
            name: company[0].querySelector("a").textContent,
            url: newUrl,
            el: company[0].querySelector("a"),
            email: company[1].textContent,
            id: url?.slice(posStart + 7, posEnd),
            current: url ? false : true,
          });
        }
        (async () => {
          await chrome.runtime.sendMessage({ companies: infoCompanies });
        })();
      }
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getCompanies,
    });
  });
});








