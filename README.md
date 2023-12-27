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
### What is Stocker?
 In the turbulent waters of the stock market, staying ahead of the curve is everything. Traditional analysis methods often leave investors adrift, lost in a sea of data and uncertainty. That's where Stocker comes in, your intelligent navigation system for informed financial decisions.
Powered by cutting-edge algorithms and machine learning, Stocker empowers you with precise stock forecasts and insightful analyses. Get the clarity you need to navigate today's volatile market and chart a course towards financial success.

Here's what sets Stocker apart:

Accurate Predictions: Our advanced algorithms, honed on vast datasets and market trends, deliver precise short-term and long-term forecasts, helping you make informed buy and sell decisions.
Comprehensive Analysis: Dive deep with detailed company profiles, sector insights, and risk assessments. Get a holistic picture of your potential investments and identify optimal opportunities.
Personalized Alerts: Set custom price and trend alerts to stay ahead of the market. Stocker will notify you instantly when key thresholds are crossed, ensuring you never miss a crucial moment.
Intuitive Interface: Our user-friendly platform makes accessing critical market information seamless. Explore data visualizations, track your portfolio, and manage alerts with ease.
Under the hood, Stocker seamlessly integrates advanced technologies:

Robust Python Libraries: Leverage the power of libraries like NumPy, Pandas, and scikit-learn for data analysis and model training.
Real-time Market Data: Get instant access to live market data through secure APIs and JSON format, ensuring your insights are always up-to-date.
Scalable Cloud Infrastructure: Our cloud-based architecture guarantees reliable performance and continuous learning, constantly refining our models for maximum accuracy.
Stocker's mission is to democratize financial intelligence and empower every investor, beginner or pro, to navigate the market with confidence. We believe everyone deserves access to the tools they need to make informed decisions and achieve their financial goals.

 

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

1. **Clone the Repository**: Begin by cloning the Stocker repository from GitHub to your local machine. This step ensures you have the server's source code.
    ```bash
    git clone https://github.com/me-sanath/hackai_stocker
    ```

2. **Change Directory**: Switch to the folder in which we have our app.
   ```bash
      cd stocker
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
8. **Change Directory**: Open a new terminal and switch to the client directory

     ```bash
     cd client
     ```
9. **Install Dependencies**: Install all the dependencies required for the client part of the website

    ```bash
    npm i
    ```
10. **Run the client side**: Start the website with the given command. This action starts the server locally, and it will be accessible at the specified address (usually `http://localhost:5173/`).

    ```bash
    npm run dev
    ```
    


These steps will help you set up and run the server smoothly. You're now ready to go!




## TECHSTACK - Built with

[![Tech](https://skillicons.dev/icons?i=html,css,tailwind,js,python,django)](https://skillicons.dev)

ReactJS, TailwindCSS, Python, Django

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/b785980b-34df-4ea8-ae7c-5e4f3cd2e213)
![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/fc644773-c4a8-40ff-8635-98e3262b6ebc)



## Screenshots

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/bc280d47-894f-47be-a174-356ac32f85dc)

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/579c1b3d-b940-4ae1-807d-b2dd1c4146d7)

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/a1481845-9fa5-485a-add9-38488aee1c25)

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/08279711-b00b-4703-befa-932a72220dbc)

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/c3b5f1c7-5a6d-465d-b0e8-f6747aad04ea)

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/18dfdd96-bb41-459f-85ce-f527e0832d7e)

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/c9daeb73-0987-46cc-8671-12bcafbfdfe5)

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/beb8928d-a137-4c90-8232-90bffdb3f58d)

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/55bc0b71-96e8-4f7b-b13d-2bc15579010e)

![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/bfae6a3d-f2c7-42ac-ace9-f7282530763f)



![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/6ac41386-9527-4050-8866-243363449ad6)
![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/ca7955bf-f2a4-465a-b118-bafd26a5fee0)
![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/d5c51b0d-4d5e-46fd-beca-3e2bbda43b79)
![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/b08a7355-8912-4a20-99d1-e2491d1549ca)
![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/a1db05b4-65de-439e-a18d-cee6683a572d)
![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/53f2879d-bf38-4806-9ad6-a3e2676333b4)
![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/d7a7d5c5-731e-44e2-b9dc-717ac8f142fd)
![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/2e2dae44-4b35-43d6-baa8-3e686a706a45)
![image](https://github.com/me-sanath/hackai_stocker/assets/119714743/2c4b7a0d-4e0f-412f-85c3-e126cd004094)
