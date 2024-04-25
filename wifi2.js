const { exec } = require("child_process");
const util = require("util");
const fs = require("fs").promises; // Import fs module for file operations
const execProm = util.promisify(exec);

async function getWiFiPasswords() {
  let resultData = ""; // String to store WiFi details

  try {
    // Mencari semua profil WiFi
    const { stdout: profiles } = await execProm("netsh wlan show profiles");
    const wifiNames = profiles
      .match(/(?:Profile\s*:\s)(.*)/g)
      .map((line) => line.split(":")[1].trim());

    // Menyimpan password setiap WiFi
    for (let wifiName of wifiNames) {
      try {
        // Menampilkan keyContent (password) dari setiap profil WiFi
        const { stdout: wifiDetails } = await execProm(
          `netsh wlan show profile name="${wifiName}" key=clear`
        );
        const passwordMatch = wifiDetails.match(/Key Content\s*:\s*(.*)/);
        const password = passwordMatch ? passwordMatch[1] : "N/A";
        resultData += `WiFi: ${wifiName}, Password: ${password}\n`; // Add details to result string
      } catch (err) {
        console.error(`Gagal mendapatkan detail dari WiFi: ${wifiName}`, err);
      }
    }

    // Write results to a file
    await fs.writeFile("wifi-passwords.txt", resultData);
    console.log("All WiFi passwords have been saved to wifi-passwords.txt");
  } catch (error) {
    console.error("Error in fetching WiFi profiles", error);
  }
}

getWiFiPasswords();
