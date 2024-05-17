async function fetchApi(dataJob) {
  const customData = dataJob.map((item) => {
    return `\\\"${item}\\\"`.replaceAll("\\", "");
  });

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
    body: `{\"operationName\":\"GenerateJobsBulkExportUrl\",\"variables\":{\"input\":{\"jobIds\":[${customData}],\"fileExtension\":\"XLSX\"}},\"extensions\":{},\"query\":\"mutation GenerateJobsBulkExportUrl($input: GenerateJobsBulkExportUrlInput!) {\\n  generateJobsBulkExportUrl(input: $input) {\\n    downloadUrl\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });

  const data = await res.json();
  if (data?.data?.generateJobsBulkExportUrl?.downloadUrl && data) {
    return data.data.generateJobsBulkExportUrl.downloadUrl;
  } else return false;
}

async function handleGetIds() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    document.getElementById("spinner").classList.remove("hidden");
    function getIdJobs() {
      const pagination = document.querySelectorAll("#cdjobstab > div > div > nav > ul > li");
      const dataTable = document.querySelectorAll("table > tbody > tr");

      if (dataTable.length <= 1) {
        console.log("Found no open or paused jobs");
        (async () => {
          await chrome.runtime.sendMessage({ type: "empty" });
        })();
        return false;
      }

      let listEl = [];
      const handleGetListJob = (list) => {
        return new Promise((resolve, reject) => {
          const dataTable = document.querySelectorAll("table > tbody > tr");
          if (dataTable.length <= 0) {
            setTimeout(() => {
              return handleGetListJob(list);
            }, 5000);
          }
          if (dataTable && dataTable.length > 0) {
            const idJobs = document.querySelectorAll(" tr > td > div > div > a");
            const nextBtn = document.querySelector("nav > ul > li > button[aria-label='Next']");
            if (idJobs.length > 0) {
              list.push(...idJobs);
            }
            if (nextBtn && !nextBtn?.disabled) {
              nextBtn.click();
              window.setTimeout(() => {
                handleGetListJob(list);
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
                await chrome.runtime.sendMessage({ data: data });
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
            handleGetListJob(listEl);
          }
        }, 1000);
      } else {
        handleGetListJob(listEl);
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
  if (request.type === "empty") {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("message").classList.remove("hidden");
    document.getElementById("get-data").classList.add("disable");
    document.getElementById("message").textContent = "Found no open or paused jobs...";
  }

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
      if (dataFilter[i].current) {
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
            document.getElementById("list-company").innerHTML = `<span>No Result</span>`;
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

  if (dataJob && dataJob.length > 0) {
    const url = await fetchApi(dataJob);
    if (url) {
      const name = document.getElementById("search-input").value;
      let el = document.createElement("a");
      const file_name = name.replaceAll(" ", "-") + `-${new Date().toLocaleDateString("en-GB")}`;
      el.href = url;
      el.download = file_name;
      document.getElementById("btn").appendChild(el);
      el.click();
      document.getElementById("btn").removeChild(el);
      document.getElementById("spinner").classList.add("hidden");
      document.getElementById("get-data").classList.add("disable");
      window.close();
    }
  }
});

document.getElementById("get-data").addEventListener("click", handleGetIds);
document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    document.getElementById("spinner").classList.remove("hidden");
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: () => {
          const switchBtn = document.querySelector('button[aria-label="Switch employer account"]');
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
