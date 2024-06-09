# ICQ Contact List Backup

Don't want to lose your memory? You can back up your contact list by using this.

ICQ will shut down on June 26, 2024. This script will not work after that date.

- Semi automatic ICQ contact list backup script
- Output as JSON files
- Backup:
  - UID
  - Name
  - Phone
  - About me
- ⚠️ No chat history (I guess no one have?)

## How to Backup

1. Launch Chrome or Firefox on Windows.
1. Install Tampermonkey.
   - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)  
   - [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
1. Go to Tampermonkey's dashboard

    ![image](https://github.com/louislam/icq-contact-list-backup/assets/1336778/96cff7a1-b2de-4fee-b00d-f943a685c958)

1. Install my userscript. Go to `Utilities`,
1. Import from URL: Input the url: `https://github.com/louislam/icq-contact-list-backup/raw/master/userscript.js` and click `Install`

   ![image](https://github.com/louislam/icq-contact-list-backup/assets/1336778/cbbaecab-340f-4e30-97b7-37aec4a9a27c)

1. Go to https://web.icq.com/ and log in.
1. Click `Contacts`
 
    ![image](https://github.com/louislam/icq-contact-list-backup/assets/1336778/0c94ef2b-174e-45f1-b542-942ce0006246)

1. Right click on a name and click `Profile`

    ![image](https://github.com/louislam/icq-contact-list-backup/assets/1336778/aeae83b9-67c6-442d-a67e-348863985d5c)

1. You should now see the `Download JSON` button, click it to download.

    <img src="https://github.com/louislam/icq-contact-list-backup/assets/1336778/a1729a3a-2a0b-4012-81fc-660fdc90c099" width=200>

1. Do this one by one 

## How to View

1. Download the viewer (Windows only): https://github.com/louislam/icq-contact-list-backup/releases/download/1.0.0/icq-contact-list-viewer.zip
2. Unzip it
3. Put all .json files into the `json` folder.
4. Launch `icq-contact-list-viewer.exe`
5. Go to http://localhost:3500

![image](https://github.com/louislam/icq-contact-list-backup/assets/1336778/81beb0d6-8e54-4ffd-957b-b20bad90f7ad)


## Others

- My ICQ is 335127191, feel free to chat with me. ^_^
- If you know how to make it fully automatic, pull requests are welcome.
- The viewer is created with Node SEA which allows me to create a single executable by using Node.js.
