const { exec } = require('child_process');
const util = require('util');
const execProm = util.promisify(exec);

async function getWiFiPasswords() {
    try {
        // Mencari semua profil WiFi
        const { stdout: profiles } = await execProm('netsh wlan show profiles');
        const wifiNames = profiles.match(/(?:Profile\s*:\s)(.*)/g).map(line => line.split(":")[1].trim());

        // Menyimpan password setiap WiFi
        for (let wifiName of wifiNames) {
            try {
                // Menampilkan keyContent (password) dari setiap profil WiFi
                const { stdout: wifiDetails } = await execProm(`netsh wlan show profile name="${wifiName}" key=clear`);
                const passwordMatch = wifiDetails.match(/Key Content\s*:\s*(.*)/);
                const password = passwordMatch ? passwordMatch[1] : "N/A";
                console.log(`WiFi: ${wifiName}, Password: ${password}`);
            } catch (err) {
                console.error(`Gagal mendapatkan detail dari WiFi: ${wifiName}`, err);
            }
        }
    } catch (error) {
        console.error('Error in fetching WiFi profiles', error);
    }
}
getWiFiPasswords();
