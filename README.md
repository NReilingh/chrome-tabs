chrome-tabs

```javascript
> chrome.storage.sync.set({
    influxEndpoint: `https://us-east-1-1.aws.cloud2.influxdata.com/api/v2/write?org=${YOUR_INFLUX_ORG}&bucket=NR+Junk`,
    influxKey: `YOUR_INFLUXDB_TOKEN`,
});
```
