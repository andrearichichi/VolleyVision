## Video Player Application README

### Overview

This React application serves as a video player with several features. It is intended to be integrated with a Python backend using FastAPI for further functionalities like reading video files from different formats, extracting clips, and enabling free draw.

### Features Implemented

1. **Basic Video Player Functionality**: Implemented a basic video player using ReactPlayer.
2. **Define Clip (Start/End Time)**: Users can input start and end times to define a clip.
3. **Extract Clip as Single Video**: Upon defining a clip, users can extract it as a single video.
4. **Stop Video and Free Draw**: Currently, there is no implementation for stopping the video and enabling free draw functionalities.

### Technologies Used

- React: Frontend framework for building the user interface.
- ReactPlayer: Used to embed video playback functionality.
- HTML/CSS: For styling and structuring the components.
- JavaScript: For frontend logic and event handling.
- Canva-Draw: Used to draw on the react player.
- Axios: Need it for using API (FastApi).

### Next Steps

1. **Integrate Backend (FastAPI)**: Connect the frontend with the backend to enable functionalities like reading videos from different formats and implementing free draw.
2. **Implement Stop Video and Free Draw**: Add functionality to stop the video playback and enable free draw feature.
3. **Enhance User Interface**: Improve styling and layout for better user experience.
4. **Testing and Debugging**: Perform thorough testing and debugging to ensure smooth operation across different environments.

### Deployment

The application can be deployed as a local web server using tools like Python's `http.server`. However, it requires integration with the Python backend for full functionality.

### Interface

You can see all the interface development at [Figma link](https://www.figma.com/file/3b4rOpEf6ClHRMLyJFOcXQ/Untitled?type=design&node-id=0-1&mode=design&t=9K75G7rjntXBUeur-0)