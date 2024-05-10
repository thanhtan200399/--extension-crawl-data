async function handleGetIds() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    function getIdJobs() {
      const pagination = document.querySelectorAll("#cdjobstab > div > div > nav > ul > li");
      let listEl = [];
      const handleClickBtn = (list) => {
        return new Promise((resolve, reject) => {
          const dataTable = document.querySelectorAll(
            "#cdjobstab > div.css-hm7f94.eu4oa1w0 > div:nth-child(1) > table > tbody > tr"
          );
          if (dataTable.length <= 0) {
            setTimeout(() => {
              return handleClickBtn(list);
            }, 5000);
          }
          if (dataTable && dataTable.length > 0) {
            const idJobs = document.querySelectorAll(" tr > td > div > div > a");
            const nextBtn = document.querySelector("nav > ul > li > button[aria-label='Next']");
            if (idJobs.length > 0) {
              list.push(...idJobs);
            }
            console.log(list.length);
            if (!nextBtn?.disabled) {
              nextBtn.click();
              window.setTimeout(() => {
                handleClickBtn(list);
              }, 5000);
            } else {
              const data = [];
              for (let i of list) {
                const elAtr = i.getAttribute("href");
                const pos = elAtr.indexOf("=");
                const id = elAtr.slice(pos + 1);
                data.push(id);
              }
              (async () => {
                await chrome.runtime.sendMessage({ type: "cookies", data: data }, function (response) {
                  console.log("response");
                  let jar = response.cookies.map((cookie) => {
                    return {
                      key: cookie.name,
                      value: cookie.value,
                      domain: cookie.domain.replace(/^\./, ""),
                      path: cookie.path,
                      httpOnly: cookie.httpOnly,
                      hostOnly: cookie.hostOnly,
                      cookie: cookie,
                    };
                  });
                  return jar;
                });
              })();
            }
            resolve(list);
          }
        });
      };

      if (pagination && pagination.length > 3) {
        document.querySelector("nav > ul > li > button[aria-label='1']").click();
        window.setTimeout(() => {
          if (
            document.querySelector("nav > ul > li > button[aria-label='1']").getAttribute("aria-current") === "page"
          ) {
            handleClickBtn(listEl);
          }
        }, 1000);
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
document.getElementById("get-id").addEventListener("click", handleGetIds);

async function fetchApi(data, cookieStores) {
  const customCookieStores = cookieStores.map((cookie) => {
    return `${cookie.name}=${cookie.value};`;
  });
  const headers = {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "indeed-api-key": "0f2b0de1b8ff96890172eeeba0816aaab662605e3efebbc0450745798c4b35ae",
    "indeed-client-sub-app": "japan-job-management-modules",
    "indeed-client-sub-app-component": "./CandidateDeliveryJobsTab",
    "indeed-ctk": "1hte6b55rr9b5801",
    priority: "u=1, i",
    "sec-ch-ua": `\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"`,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-datadog-origin": "rum",
    "x-datadog-parent-id": "3833268613745280764",
    "x-datadog-sampling-priority": "0",
    "x-datadog-trace-id": "3341358273125717878",
    cookie: customCookieStores.join(" "),
    Referer: "https://employers.indeed.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };

  const res = await fetch("https://apis.indeed.com/graphql?locale=en-US&co=JP", {
    headers: headers,
    body: `{\"operationName\":\"GenerateJobsBulkExportUrl\",\"variables\":{\"input\":{\"jobIds\":${data},\"fileExtension\":\"XLSX\"}},\"extensions\":{},\"query\":\"mutation GenerateJobsBulkExportUrl($input: GenerateJobsBulkExportUrlInput!) {\\n  generateJobsBulkExportUrl(input: $input) {\\n    downloadUrl\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
  });
  console.log(res);
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.type == "cookies") {
    const dataArray = request.data;
    let cookies = [];

    let url = sender.tab.url;
    cookies = await new Promise((resolve) => chrome.cookies.getAll({ url: url }, resolve));

    if (dataArray && dataArray.length > 0 && cookies.length > 0) {
      const resp = [];
      for (let i = 0; i < dataArray.length; i++) {
        resp.push(`<li>${dataArray[i]}</li>`);
      }
      document.getElementById("list-tags").innerHTML = resp.join("");
      const saveBtn = document.getElementById("button");
      saveBtn.addEventListener("click", () => {
        const customData = dataArray.map((item) => {
          return `\\"${item}\\"`;
        });
        fetchApi(customData, cookies);
      });
    }
  }
});
