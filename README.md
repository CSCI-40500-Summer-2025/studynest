# Project 5

## Product Vision

**FOR** college students overwhelmed by packed schedules of classes, work, assignments, and exams **WHO** want to stay organized and easily coordinate with peers to make the most of their study time. **THE** StudyNest app is an academic task and schedule manager **THAT** lets students make personalized academic schedules, organize tasks by course, and find common free session times to form study groups. **UNLIKE** generic task managers or calendar apps, **OUR PRODUCT** is designed specifically for student life, with course based task tracking, a built-in class calendar, and smart suggestions for solo or group study sessions based on your availability and your friends'

---

## How to Use

### Managing Tasks
1. Click on the "Tasks" tab
2. Click "Create Task" to add a new task
3. Fill in the task details:
   - Task name
   - Description
   - Due date and time
4. Click "Create Task" and Track progress using the +/- buttons
5. View overdue tasks highlighted in red

### Managing Classes
1. Click on the "Classes" tab
2. Click "Add Class" to create a new class entry
3. Enter class details:
   - Class name
   - Day and time
   - Location
   - Instructor name
4. View your classes in the schedule (calendar) tab

### Creating Study Sessions
1. Click on the "Study Groups" tab
2. Click "Create Session" to start a new study group
3. Set the session details:
   - Session name
   - Day and time
   - Duration
4. Click "Create Session"

### Joining Study Groups
1. Go to the "Study Groups" tab
2. Browse available study sessions
3. Click "Join" on any session you want to participate in
4. View your joined sessions in the schedule tab (and also in the "Study Groups" tab itself)

### Using the Schedule
1. Click on the "Schedule" tab
2. Use the navigation arrows to move between weeks
3. View all your academic commitments in one place:
   - Classes (blue)
   - Tasks (yellow)
   - Study sessions (green)

### Deployment Link
https://team5-studynest.netlify.app/

---

## Important Qualities
- **Usability:** Intuitive and easy for students and instructors to use.
- **Reliability:** System is readily available at all times and data is never lost.
- **Security:** Protects user data and privacy with authentication and authorization.
- **Scalability:** Can handle many users and large schedules across many classes.
- **Maintainability:** Easy to send updates, monitor, and scale.

---

## Layered Architecture

The StudyNest System Architecture is organized into the following layers, each building on the services of the layer below:

1. **User Interface**
   - Web browser and mobile app UI built with React (Native), Electron and Tailwind CSS
2. **User Interface Management**
   - Modal management, tab navigation, form handling, notification popups, authentication flows
3. **Configuration Services**
   - User, group, class, task, and session configuration. Security and setup with persistent storage of settings (doesn't reset with a new session)
4. **Application Services**
   - Attendance tracking, scheduling/calendar, notifications, virtual study room, task/class/session management, user linked 3rd party applications
5. **Integrated Services**
   - Analytics, third-party integrations (LMS, calendar), advanced notifications, resource discovery, virtual learning environment
6. **Infrastructure Services**
   - Authentication and authorization, persistent storage, logging and monitoring, application interfacing, search, cloud hosting

Each layer obviously depends on the services provided by the layer beneath it, forming a clear separation of concerns and responsibilities, therefore improving redundancy, atleast somewhat.

---

## Architecture Layers and Technologies Table

| Layer                      | Main Responsibilities                                                                 | Example Components/Features                                  | Technologies/Tools                       |
|----------------------------|--------------------------------------------------------------------------------------|--------------------------------------------------------------|------------------------------------------|
| User Interface             | Present information, collect user input, display schedules and notifications          | Web browser UI, mobile app, calendar view, notifications, modals, tabs | React.js, Electron, Tailwind CSS, HTML, CSS, React Native |
| User Interface Management  | Manage UI logic, forms, modal state, tab navigation, notification popups, auth flows   | Modal logic, tab switching, form handling, notification popups, login/logout | React state, React Context, React Router |
| Configuration Services     | Manage user, session, class, task, and session data. security and setup with persistent config | User/session config, security config, UI config, setup wizard   | Node.js, Express.js, MongoDB   |
| Application Services       | Core app logic: scheduling, attendance, notifications, study room, task management    | AttendanceTracking, Schedule, NotificationCenter, VirtualStudyRoom, CreateTaskModal, CreateClassModal, CreateSessionModal | Node.js, Express.js, REST API, custom native modules |
| Integrated Services        | Analytics, third-party integrations, virtual learning, smart notifications         | Analytics dashboard, LMS integration, resource discovery, calendar sync, OAuth | Google Analytics, LMS APIs, Google Calendar API, OAuth |
| Infrastructure Services    | Authentication, storage, logging, monitoring, search, application interface, hosting | Auth, user/app storage, logging, monitoring, search, cloud deployment | OAuth, MongoDB, AWS S3 (buckets), Winston (logging), ElasticSearch (search), AWS |

---
