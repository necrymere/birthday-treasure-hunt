# Birthday Treasure Hunt 

Welcome to the **Birthday Treasure Hunt**! This is a web-based, real-world interactive game designed for a birthday event. The player logs into a cyberpunk terminal, recives riddles, travels to real-world locations, takes photos as proof and submits them.

Human reviewers(me and my friends) get instant notifications on Discord when a picture is submitted. Reviewers can approve or reject the submission in real time through a live database. Once all levels are completed, the player unlocks a special victory page with a Polaroid photot gallery.

---

## Quick Links for Reviwers

* **Firebase Database Console:** `https://console.firebase.google.com/project/stardance-testing/database/stardance-testing-default-rtdb/data?fb_gclid=CjwKCAjwqonVBhA4EiwA9wYJ3YKT0ECp-gpu5e9WUbkSy0dFUXl5Pjp-zevqSWvUV6KPHse-JN7LURoConsQAvD_BwE&fb_utm_campaign=Cloud-SS-DR-Firebase-FY26-global-gsem-1713590&fb_utm_content=text-ad&fb_utm_medium=cpc&fb_utm_source=google&fb_utm_term=KW_console%20firebase`

* **Discord Channel:** `https://discord.gg/rDJBWRzBu`
 
 * **Website:** `https://necrymere.github.io/birthday-treasure-hunt/`

 ---

 ## How the system works plainly

 1. **The Game Website(`game.html`):** The web page the player sees on their phone. It shows the current riddle and has a button to upload a photo.

 2. **Discord Webhooks:** A tool that automatically sends a message from the website directly into the Discord channel. As soon as the player submits a photo, it pops up in Discord so you can inspect it.

 3. **Firebase Realtime Database:** An online cloud database. When a photo is uploaded, the website writes a message saying `"PENDING"` in Firebase. The website checks every 3 seconds to see if you have changed it to `"APPROVED"` or `"DENIDED"`.

 4. **Browser `localStorage`: Built-in web browser storage. It remembers which level the player is on(so refreshing the page does not erase their progress) and saves their uploaded photos.

 5. **Polaroid Victory Gallery(`birthday.html`):** The final page unlocked after the last riddle. It takes all photos saved in the browser and displays them as floating Polaroid pictures with the riddle answers written on them.The "About AI" section is not about actual AI it is a joke that the AI verifying the pictures is me(placeholder will be replaced with my photo).
Also design was not a big part of the site because my focus was it working and looking somewhat like a terminal. Perhaps the container was a bit AI-ish so I deleated it. 

 ---

 ## Step-by-Step Instructions

 ## Step 1:How the player plays the game:
  
  1. Open the link.
  2. Read the riddle under > Curent Objective
  3. Click Choose File, pick a photo taken at the location, and click SUBMIT PHOTO
  4. The text on screen will change to: MISSION DATA TRANSMITTED. AWAITING APPROVAL.\
  5. The player must now wait for appoval.

  ## Step 2: How Reviewers Approve or Reject Submissions

  As a reviewer, here is what you would do when a photo is submmited:

1. Check Discord: Open your discord channel. You will see a new message with the uploaded photo and an alert saying LEVEL X SUBMISSION.
2. Open Firebase: Go to your Firebase Database Console link.
3. Find the Level Node: Click mission to expand it. You will see level_0(which is Level 1), level_1(which is Level 2) and so on.
4. Change the Status:
       * Click on the word "PENDING" under status.
       * To Aprove: Type APPROVED(MUST BE ALL CAPS) and press Enter on your keyboard. Within 3 seconds, the palyer side will move on to the next riddle.
       * To Reject: Type DENIED(MUST BE ALL CAPS) and press Enter. The player side will show an error message asking to re-upload.

       ### Step 4: Reaching the Victory Gallery
         * Once you mark the last level as APPROVED, the game automatically takes the player to birthday.html.
         * The player will see a terminal victory screen with glowing text and a gallery containing all the images gathered during the game along with the question and answer.

### File Directory Explained

* game.html - The main screen where players view riddles and submit photos.
* birthday.html - The final victory screen that displays the Polaroid photo gallery.
* info.html - An extra fun "About the AI" lore page accesible from the terminal.
* style.css - The design file controlling all of the style basically.
*script,js - The engine that talks to all of the outside sources and manages the game process.
* README.md - This manual!

## How to reset the game for testing\

* In case you would like to reset the game you can just click the button in birthday.html.

  ### WARNING!! THE DISCORD SERVER IS PUBLIC SO DO NOT SHARE PERSONAL INFO/PHOTOS. EITHER FIND PHOTOS ON THE WEB, TAKE PHOTOS OF A PET JUST DO NOT SUBMIT PICTURES OF YOUR FACE.
