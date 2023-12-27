# hackai_stocker
# Stocker - Stalk the stocks

Stocker-Stalk is your go-to destination for comprehensive stock market analysis, future predictions, and real-time updates on your favorite companies. Whether you're a seasoned investor or just getting started in the world of stocks, Stocker-Stalk has you covered.

## Table of Contents
- [About](#about)
  - [What is Stocker](#what-is-stocker)
  - [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [TECH STACK used](#techstack---built-with)
- [Screenshots](#screenshots)
- [Team](#the-team)

## About
### What is Wheel-E?
 The website we developed was envisioned as an innovative solution in the realm of sustainable urban transportation. Dubbed "Wheel-E," it represented our dedication to addressing pressing global challenges outlined in Sustainable Development Goals 7 and 11, focusing on Affordable and Clean Energy and Sustainable Cities and Communities. Wheel-E was an exclusively electric vehicle taxi service designed to offer a more environmentally friendly and cost-effective mode of transportation. The platform was meticulously crafted to align with these goals, providing a user-friendly interface for passengers to book rides and experience the convenience of electric vehicle travel. Our intent was not only to offer a service but to contribute to a larger movement towards sustainability in urban mobility.

In building the website, our team prioritized both functionality and user experience. The front end was meticulously designed with an emphasis on intuitive UI/UX. Leveraging HTML, TailwindCSS, and JavaScript, we aimed to create a visually appealing and user-friendly interface that facilitated seamless navigation and booking processes. Simultaneously, the backend development using Django provided the necessary robustness to support the system's operations. This approach ensured the website's reliability and responsiveness, guaranteeing a smooth and efficient experience for users as they booked their electric vehicle rides.

Our project was executed within a specific timeframe, primarily during a hackathon, which drove our team's determination to not only meet the basic objectives but also to exceed expectations. As a result, we successfully developed a fully functional website that accommodated both passengers and drivers. The incorporation of Leaflet API for route optimization further enhanced the service's efficiency, reflecting our commitment to continuous improvement and innovation.

 

### Features

- **Stock Prediction**
  - Unleash the power of our cutting-edge prediction algorithms that forecast the future performance of stocks.
    - Stay ahead of the market trends and make informed investment decisions with our accurate predictions.

- **In-Depth Analysis**
   - Gain valuable insights into the financial health of companies through our detailed analyses.
   - From financial ratios to market trends, we provide comprehensive information to help you understand the dynamics of the stock market.

- **Company Search**
   -Easily search and explore the stock exchange of any company.
  - Access detailed information about a company's performance, financials, and market standing.

- **Follow Companies**
   -  Stay connected with your favorite companies by following them on Stocker-Stalk.
   -   Receive timely notifications and updates about the stocks you follow, ensuring you never miss a crucial market development.

- **Personalized Notifications**
   - Customize your notification preferences to receive updates tailored to your interests.
   - Get real-time alerts about stock movements, market news, and updates on the companies you follow.


## Getting Started
## Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your development environment:

1. **Python**: You'll need Python installed to run backend scripts microagents. You can download Python from the official website [here](https://www.python.org/downloads/).

Make sure all the required paths are added to PATH in the environment variables of your PC.


## Installation

Set up the server and compile the app yourself with the instructions provided.

Feel free to reach out to us if you have trouble following the guide. Contact details can be found [here](#the-team)

## Running the Server:

1. **Clone the Repository**: Begin by cloning the cli-Mate repository from GitHub to your local machine. This step ensures you have the server's source code.
    ```bash
    git clone https://github.com/PranavRao18/Wheel-E.git
    ```

2. **Change Directory**: Switch to the folder in which we have our app.
   ```bash
      cd wheele
    ```
    
3. **Create a Virtual Environment**: It's a good practice to work in a virtual environment to manage dependencies cleanly. Create a virtual environment using your preferred method. For example, you can use Python's `virtualenv` or `venv`.
    While in the cloned directory, run
    ```bash
    python -m venv .venv
    ```
4. **Activate the Virtual Environment**: Activate the virtual environment to isolate your project's dependencies. This step ensures that you work within a controlled environment for your server.
    - On Windows
      ```bash
      .venv\Scripts\activate
      ```
    - On macOs and Linux
      ```bash
      source .venv/bin/activate
      ```
      
5. **Install Requirements**: Install dependencies if prompted.
    ```bash
    pip install -r requirements.txt
    ```
    
6. **Database Migration**: Apply the database migrations. This step ensures that your database schema is up to date.
    ```bash
    python manage.py migrate
    ```
   
7. **Start the Server**: Launch the server with the given command. This action starts the server locally, and it will be accessible at the specified address (usually `http://localhost:8000/`).

    ```bash
    python manage.py runserver
    ```


These steps will help you set up and run the server smoothly. You're now ready to go!




## TECHSTACK - Built with

[![Tech](https://skillicons.dev/icons?i=html,css,tailwind,js,python,django)](https://skillicons.dev)

HTML, CSS, TailwindCSS, JavaScript, Python, Django

APIs: Leaflet, OpenStreetMap
