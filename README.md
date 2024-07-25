# GETChat-Server
This is a small server application that runs [Eel](https://github.com/samuelhwilliams/Eel) to display messages received via HTTP GET requests. This allows anyone on the local network to display a message on the screen by adding parameters to an HTTP link.

## Features

- **Real-time Message Display:** Instantly display messages on the screen received through HTTP GET requests.
- **Simple Setup:** Easy to set up and run on your local network.
- **User-friendly Interface:** Built with Eel to provide a clean and simple UI for displaying messages.

## Requirements

- Python 3.x
- Eel
- Flask

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/utigernils/GETChat-Server.git
   cd GETChat-Server
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Run the Server:**
   ```bash
   python main.py
   ```

2. **Display a Message:**
   Open a web browser and enter the following URL, replacing `YOUR_MESSAGE` with your desired message:
   ```
   http://localhost:8000/create_message?title=YOUR_MESSAGE
   ```

   Example:
   ```
   http://localhost:8000/display?message=Hello%20World
   ```

   This will display "Hello World" on the screen.

## Configuration

- **Port Configuration:**
  By default, the server runs on port 5000. You can change this by modifying the `main.py` file:
  ```python
  app.run(host='0.0.0.0', port=5000)
  ```

- **HTML Template:**
  You can customize the appearance of the displayed message by editing the `web` folder.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Acknowledgements

- [Eel](https://github.com/samuelhwilliams/Eel)
- [Flask](https://github.com/pallets/flask)
