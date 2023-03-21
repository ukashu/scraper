# Barchart web scraper

>## Description

&nbsp;&nbsp;&nbsp;&nbsp;This CLI application scrapes the barchart.com website for stock price data. It reads an excel file with tickers and dates, searches the website for stocks barcharts, returns screenshots of the stocks barcharts and then saves them inside the ```./screenshots``` directory.

>## Technology stack

<ul>
    <li>Node.js</li>
    <li>Puppeteer</li>
</ul>

>## Installation

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prerequisites:
<ul>
  <li>node installed</li>
  <li>npm installed</li>
</ul>

1. Run  ```npm install```. This will install all required node dependencies. 

2. Insert an excel file with columns "ticker" (e.g. "AMZN" for Amazon.com Inc) and "DateTime" (format: YYYY-MM-DD) into ```./tables``` directory.

3. Run ```node scraper``` and follow the prompts.