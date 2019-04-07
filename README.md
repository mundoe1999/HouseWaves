![HouseWaves](/img/HouseWaves_Logo.svg)  
###### (Derived from housing and soundwaves.)

[Click here to start](https://mundoe1999.github.io/HouseWaves/)

***
Many of us like to wake up to the sound of birds chirping and the winds blowing. We all need the night to be tranquil and calm, for what follows a soundless night is a song-filled day.

Well, if you're from New York, you probably fall asleep to the sound of people screaming and wake up to the cars honking. But if you're looking for a more peaceful setting for your comfort dwelling, then *HouseWaves* is for you.
***

HouseWaves is essentially an address lookup for noise complaints.  
The ideal target audience (end user) is:  
- someone who's looking to move out
- someone who has found a listing on StreetEasy or Apartment Finder, but is unsure of the area
- someone who appreciates peace and quiet, and wants to see if the place of interest has a history of noise complaints

#### Technology used
HouseWaves is a *web application.* (HTML, CSS, JavaScript, some Bootstrap, .json database implementation)  
This is done because the web app will work for both desktop and mobile, without needing to download or install anything.  
OpenStreetMaps is used for the map, and NYC's Open Data database is used for the noise-complaint information.  
#### How it works
**Simple:** The user inputs an address and zip code and the web app will notify if the place is noisy or not. It also shows the area on the map, with highlighted spots where noise complaints were filed.  
**Technical:** The user inputs an address and zip code, and the information gets parsed through a javascript function which checks for a match in NYC's open database, for 311 calls, specifically residential noise complaints. There's millions of these complaints, but HouseWaves only checks for noise complaints in the past 6 months. Purely developer choice, but the application is extensible and this can be changed.  
If the address is recognized (a match with the input and noise complaint is made), the map will zoom in on the location and will notify if the area is known to be noisy. If unrecognized or unnoisy, the map will zoom out.

