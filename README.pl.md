[![eng](https://img.shields.io/badge/lang-eng-blue.svg)](https://github.com/ukashu/scraper/blob/e13b14a647078b818bb848fceace4d39a441d230/README.md)
# Barchart web scraper

>## Opis

&nbsp;&nbsp;&nbsp;&nbsp;Aplikacja służąca do zapisywania wykresów cen akcji ze strony barchart.com. Wczytuje plik excel z danymi spółki oraz datą, wyszukuje wykresy na stronie i zapisuje screenshot'y wykresów w folderze ```./screenshots```.

>## Stack technologiczny

<ul>
    <li>Node.js</li>
    <li>Puppeteer</li>
</ul>

>## Instalacja

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wymagane:
<ul>
  <li>node</li>
  <li>npm</li>
</ul>

1. Uruchom skrypt  ```npm install```. Zainstaluje on wszystkie zależności projektu. 

2. Przenieś plik excel z kolumnami "ticker" (np. "AMZN" czyli Amazon.com Inc) i "DateTime" (format: RRRR-MM-DD) do folderu ```./tables```.

3. Uruchom skrypt ```node scraper``` i postępuj zgodnie z poleceniami.