##  Web-app (React/Python with FastAPI):

### Pros ###
1. **Rich UI**: Dynamic, interactive user interface.
2. **Cross-Platform**: Runs on any device with a browser.
3. **Separation of Concerns**: Better code organization and scalability.
4. **Community Support**: Abundant resources and libraries.

### Cons ###
1. **Complexity**: More involved development process.
2. **Performance Overhead**: Possible network latency issues.

## Desktop Version (GTK/Glade) ##

**Pros**:
1. **Ease of Use**: Simple drag-and-drop GUI design.
2. **Python Integration**: Seamless backend/frontend integration.
4. **Native Feel**: Applications blend well with desktop environments.

**Cons**:
1. **Limited Flexibility**: Less UI customization compared to React.
2. **Desktop Dependency**: Not easily portable to web environments.
3. **Learning Curve**: Some learning required, especially for newcomers.



**Additional Note**:
- **Familiarity**: More expertise with React and Python compared to GTK/Glade.


## Solution Evaluation:
I opted for the **web version**. Utilizing React, I discovered React Player, a powerful solution for video handling. The web approach felt more comfortable and flexible overall.
I discovered also the Canva Draw Library, that permit to draw on an overlay layer. It could be useful to draw something on the video player.

For the backend, I selected Python with FastAPI. Leveraging my proficiency in Python, FastAPI facilitated a smooth development process with its intuitive design and efficient performance.

Reasons for dismissing the desktop app approach:

1. **Steep learning curve**: GTK, Glade, and GStreamer required more time to master.
2. **Limited UI customization**: Compared to web frameworks like React, GTK/Glade offered less flexibility.
3. **Desktop dependency**: Deployment challenges may arise due to the need for desktop environments.
4. **Preference for web-based solutions**: Web technologies provided familiarity and flexibility, aligning better with project requirements and skill set.
