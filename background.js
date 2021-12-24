async function getTabCount () {
  const { influxKey, influxEndpoint } = await chrome.storage.sync.get(
    ['influxKey', 'influxEndpoint']);
  const tabs = await chrome.tabs.query({});
  const res = await fetch(influxEndpoint,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${influxKey}`,
        "Content-Type": "text/plain; charset=utf-8",
      },
      body: `openChromeTabs tabs=${tabs.length}`,
    });
  if (res.ok) {
    console.log("Metric recorded to influx successfully");
  }
  return tabs.length;
}

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.sync.set({
    influxKey:  "",
    influxEndpoint: '',
  });
  const tabCount = await getTabCount();
  console.log("extension started, tab count", tabCount);
});

chrome.alarms.create("poll", {
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(getTabCount);
