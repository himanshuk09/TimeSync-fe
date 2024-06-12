# Timesync Frontend

![Timesync](https://i.ibb.co/qswXNMb/timesync.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Limitations](#limitations)
- [Future Scope](#future-scope)
- [Author](#author)

## Introduction

The frontend of the Timesync project is built using React, TypeScript, and MUI with a minimal theme. It provides a user-friendly interface for managing classes, subjects, students, teachers, timetables, attendance, attendance reports, and event schedules.

## Features

- **User Management:** Register and authenticate users (students, teachers, administrators).
- **Class Management:** Create, read, update, and delete operations for classes.
- **Subject Management:** Create, read, update, and delete operations for subjects.
- **Student Management:** Create, read, update, and delete operations for students.
- **Teacher Management:** Create, read, update, and delete operations for teachers.
- **Timetable Management:** Generate and manage timetables.
- **Attendance Management:** Record and manage attendance.
- **Attendance Reports:** Generate and fetch attendance reports.
- **Event Scheduling:** Manage event schedules and calendars.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **MUI (Material-UI):** A popular React UI framework that implements Google's Material Design.

- **Axios:** A promise-based HTTP client for the browser and Node.js.
- **React Router:** A collection of navigational components that compose declaratively with your application.
- **FullCalendar:** A JavaScript event calendar.
- **ApexCharts:** A modern charting library that helps developers create beautiful interactive visualizations for web pages.

## Screenshots

- Login Page
  <br/>
  ![Login Page](https://i.ibb.co/YTc1yLs/Screenshot-2024-05-29-133038.png)
  <br/>
- DashBoard
  <br/>
  ![DashBoard](https://i.ibb.co/k1DmSPn/Screenshot-2024-05-29-133113.png)
  <br/>
- TimeTable
  <br/>
  ![TimeTable](https://i.ibb.co/7vPDwHB/Screenshot-2024-05-29-133344.png)
  <br/>
- Attendance
  <br/>
  ![Attendance](https://i.ibb.co/WtBSF7h/Screenshot-2024-05-29-133500.png)
  <br/>
- Update Attendance
  <br/>
  ![Update Attendance](https://i.ibb.co/2nKs65v/Screenshot-2024-06-01-120530.png)
  <br/>
- Attendance Report
  <br/>
  ![Attendance Report](https://i.ibb.co/KVMrh7W/Screenshot-2024-06-01-120607.png)
  <br/>
- Calender (Event Scheduler)
  <br/>
  ![Calender](https://i.ibb.co/rfMT0Jp/Screenshot-2024-05-29-133333.png)
  <br/>

## System Requirements

- **Node.js:** v14.x or later
- **npm:** v6.x or later

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/himanshuk09/TimeSync.git
   cd timesync-frontend

   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

## Configuration

- Create a .env file in the root directory and add your necessary environment variables.
  ```bash
   REACT_APP_API_URL=http://localhost:3000/api
  ```

## Running the Application

1. **Start MongoDB:**
   Ensure MongoDB is running on your local machine or a remote server.

2. **Start the Application:**

   ```bash
   npm run start

   ```

## Limitations

- Limited offline capabilities.
- Basic user interface in initial implementation.
- Scalability issues with very large datasets.
- Real-time data updates not fully supported.

## Future Scope

- Enhance scalability and performance.
- Implement real-time data synchronization and notifications.
- Develop offline capabilities and native mobile apps.
- Improve UI/UX design for a better user experience.
- Offer extensive customization options for different schools.
- Integrate with third-party educational tools and platforms.

## Author

- Name: Himanshu Khade
- Email: 20013himanshu@gmail.com
- Portfolio : https://himanshu-khade-portfolio.vercel.app/
- LinkedIn: https://www.linkedin.com/in/himanshu-khade-3a64a2197/
