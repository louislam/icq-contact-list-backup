// ==UserScript==
// @name         ICQ Contact List Backup (Semi-Automated)
// @namespace    http://tampermonkey.net/
// @version      2024-06-09
// @description
// @author       louislam
// @match        https://web.icq.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=icq.com
// @grant        none
// ==/UserScript==

async function main() {
    // Delay start as the profile pic may not be loaded yet
    await sleep(5000);

    while (true) {
        try {
            let uid = await uidLoaded();
            let phone = document.querySelector("[data-key=phone] .im-sidebar-topinfo__item-value")?.innerText || "";
            let name = document.querySelector("[data-key=name] .im-sidebar-topinfo__name")?.innerText || "";

            // Profile pic .im-avatarbox, if style starts with background-image: url, extract the image data from it.
            let element = document.querySelector("#imSidebarReactDialogInfo .im-avatarbox");
            let profilePic = "";
            if (element?.style.backgroundImage.startsWith("url")) {
                profilePic = element.style.backgroundImage.replace("url(\"", "").replace("\")", "");
            }

            // Fine the aboutMe section and get the text
            let aboutMe = "";
            let itemList = document.querySelectorAll(".im-sidebar__topinfo-item");
            for (let item of itemList) {
                if (item.querySelector(".im-sidebar__topinfo-title")?.innerText === "About me") {
                    aboutMe = item.querySelector(".im-sidebar-topinfo__item-value").innerText;
                }
            }

            let obj = {
                uid,
                name,
                phone,
                aboutMe,
                profilePic,
            }

            // Create a textarea, output the obj as JSON and append to #imSidebarReactDialogInfo
            let textarea = document.createElement("textarea");
            textarea.value = JSON.stringify(obj, null, 4);
            textarea.style.width = "100%";
            textarea.style.height = "170px";

            // Create a button to download the JSON as a file
            let button = document.createElement("button");
            button.innerText = "Download JSON";
            button.onclick = () => {
                let blob = new Blob([textarea.value], {type: "application/json"});
                let url = URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = `${uid}.json`;
                a.click();
            }

            document.querySelector("#imSidebarReactDialogInfo").appendChild(textarea);
            document.querySelector("#imSidebarReactDialogInfo").appendChild(button);

        } catch (e) {
            console.error(e);
        }
    }
}

async function uidLoaded() {
    while (true) {
        let element = await waitForSelector(".im-sidebar-topinfo__item-value[data-key=uNick]:not(.done)");
        if (element.innerText) {
            element.classList.add("done");
            return element.innerText;
        }
    }
}

function waitForSelector(selector) {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element);
            }
        }, 500);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();

