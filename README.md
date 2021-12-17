# National Weather Service Alerts

This repo is [Git scraping](https://simonwillison.net/2020/Oct/9/git-scraping/) all [public alerts from the US National Weather Service](https://alerts.weather.gov), from 2021-12-11 on.

The Atom XML feed of alerts can be found at [data/feed.xml](https://github.com/beardicus/scrape-nws-alerts/blob/main/data/feed.xml). This feed provides summaries of currently active alerts and links to details.

Alert details are scraped to daily directories in [data/](https://github.com/beardicus/scrape-nws-alerts/tree/main/data), using their rather unruly IDs as filenames, such as [data/2021-12-11/AK1261CA107794.WinterWeatherAdvisory.1261CA1EE4F0AK.AFGWSWNSB.59726cda58a50e89751a70d0e007b4c4.xml](https://github.com/beardicus/scrape-nws-alerts/blob/main/data/2021-12-11/AK1261CA107794.WinterWeatherAdvisory.1261CA1EE4F0AK.AFGWSWNSB.59726cda58a50e89751a70d0e007b4c4.xml).

The alerts are XML files that use the [Common Alerting Protocol](https://www.oasis-open.org/committees/download.php/14759/emergency-CAPv1.1.pdf). They seem to use a variety of methods of geocoding, including FIPS6 and maybe polygons for certain types of alerts.

## Resources

- [NWS Public Forecast Zones](https://www.weather.gov/gis/PublicZones)
- [StackOverflow: Mapping UGC or FIPS6 geocodes to polygons?](https://stackoverflow.com/questions/13354519/mapping-ugc-or-fips6-geocodes-to-polygons)
- [Wikipedia: FIPS county code](https://en.wikipedia.org/wiki/FIPS_county_code)
- [Weather Alerting using FIPS6, UGC County, and UGC Zone Codes](https://www.singlewire.com/blog/informacast-weather-notification/fips6)
- [Wikipedia: Common Alerting Protocol](https://en.wikipedia.org/wiki/Common_Alerting_Protocol)

## To-Do

- Improve the scraper to re-scrape updated alerts
- Work on parsing and auto-publishing a useful public [Datasette](https://datasette.io) of this data
