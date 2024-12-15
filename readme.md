Here's a sample `README.md` for your WiFi password retrieval script.

---

# WiFi Password Retriever

This Node.js script retrieves saved WiFi passwords from a Windows machine and saves them to a text file. It uses the `netsh` command to fetch WiFi profile details, including the network name and corresponding password.

## Requirements

- **Node.js**: This script is written in Node.js. You can download and install it from [nodejs.org](https://nodejs.org/).
- **Windows**: The script uses the `netsh` command, which is only available on Windows operating systems.
  
## Dependencies

The following Node.js modules are used in this script:
- `child_process`: To execute system commands.
- `util`: To promisify the `exec` function.
- `fs`: To perform file operations such as writing the output to a text file.

To install the necessary dependencies, run:

```bash
npm install
```

## Usage

### Running the Script

1. Clone or download this repository to your local machine.
2. Open the terminal or command prompt in the project directory.
3. Run the script with the following command:

```bash
node index.js
```

This will:
- List all WiFi profiles saved on the Windows machine.
- Retrieve each WiFi profile's name and password.
- Save the WiFi names and passwords to a file called `wifi-passwords.txt` in the project directory.

### Output

The script will generate a `wifi-passwords.txt` file with the following format:

```
WiFi: Network1, Password: mypassword1
WiFi: Network2, Password: mypassword2
...
```

If the password for a WiFi network cannot be retrieved, the password will be marked as `N/A`.

### Example

```bash
node index.js
```

Output:

```
WiFi: HomeNetwork, Password: myHomePassword
WiFi: OfficeWiFi, Password: office123
...
All WiFi passwords have been saved to wifi-passwords.txt
```

## Troubleshooting

- **Permissions**: Make sure you have the necessary permissions to run the `netsh` command and access WiFi profiles on your Windows machine.
- **No Password**: If a WiFi profile doesn't have a saved password, it will show as `N/A` in the output file.
- **Command not recognized**: If the `netsh` command is not working, ensure you are running the script on a Windows machine and have the proper administrator permissions.
