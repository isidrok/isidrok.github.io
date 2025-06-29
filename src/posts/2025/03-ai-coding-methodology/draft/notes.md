

## A sensible approach to work

I approach work following a logical approach based on three phases:
1. Requirements: what are we building? whats the starting point?
2. Planning: how are we going to build this thing? This involves technical design and breaking it down into a sensible implementation plan divided in phases.
3. Implementation: once we know what we are doing and how, we can start working on it in an iterative way.

Im also a big fan of _talking_. I usually spend lots of hours in a week talking about requirements and how to approach them from a technical perspective, constraints, drawbacks, alternatives... The time not spent here is usually dedicated to pair programming.
I love working with peers, specially having honest discussions with excellence driven people.

It doesn't matter if I'm working with human peers or by myself, this far from revolutionary approach will consistently leave the best results.

We don't want a yes-man or a never ending flow of instructions. We want honest feedback and real communication. We want our AI coding agent to
1. Be our excellence driven, honest, pair programming peer.
2. Encourage interaction: ask questions, propose different alternatives, ask for feedback. 

For the implementation phase, I really enjoyed (this post by Kent Beck)[https://substack.com/home/post/p-166781850] showcasing a prompt focused on TDD and Tidy First, so we will add some instructions about using those and properly documenting our code. This will help our AI buddy go the extra mile.


## Use case: KB Sport app
Starting from the previous post in which we studied how to run computer vision models in the browser, we will now explore how to use this methodology to complete our KB sports app.

We will start with a base project with the following structure:
    
```bash
kb-sports-app/src/
├── application/
├── domain/
├── infrastructure/
├── presentation/
└── main.tsx
```

The `application` layer will contain the use cases:
1. Start workout
2. Stop workout
3. Get workout history
4. Get workout statistics
and so on.

The `domain` layer will contain the business logic types and entities.
The `infrastructure` layer will contain the data access code
and the `presentation` layer will contain the UI code.

### Init

Create high level project documentation for claude to understand:
- project goal
- Common commands
- Source structure
- Tech stack

### ask

```md
 What feature or functionality are you looking to build or improve in your kettlebell workout tracking 
  application?
```

```
 Lets start with a basic workout feature. We want a button to start / stop the workout.\
  It must appear floating at the center bottom of the screen. Must have a glass like effect.\
  When clicking Start its label will change to Stop, we will request camera access and once the video is 
  flowing we will start analyzing poses and rendering them to the canvas. When clicking Stop, we will stop
   the camera and clear the canvas.
   ```

   10 followup questions, nothings goes under the radar, 6 additional follow up questions after that, all of them relevant.
  ```
  The requirements cover 4 main user stories:
  1. Model Loading - Preloading with status feedback
  2. Start Workout - Camera access and session initiation
  3. Stop Workout - Clean session termination
  4. UI Display - Responsive frosted glass button

  Key highlights:
  - Clear error states: Different messages for model vs camera failures
  - Loading feedback: Status popup for all async operations
  - Button state management: Proper enabling/disabling based on system state
  - Error recovery: Camera errors allow retry, model errors require page reload
  - Responsive design: Center bottom positioning across all screen sizes
  ```

  ### plan
  ```
  Based on the requirements and existing architecture, I can see we need to build a comprehensive workout
  control system. Let me discuss the implementation approach with you.
  ```


  ```
  The ML model must preload on the App component and is independent from the button.
We want the logic to reside in the /application layer and will be following ddd, so create use cases and application services to expose the functionality to the UI.

We will have:
StartWorkoutUseCase
StopWorkoutUseCase
LoadModelUseCase
(extra use cases)
and
WorkoutService


Then on the ui we will probably need two hooks and a WorkoutControlsComponent (we will be adding more at some point)
The StatusPopup is good.
All services and use cases must be exported as a singleton.
For camera errors lets tell users to fix permissions.
Por processing the poses we need to use requestAnimationFrame, ideally the ui would do that and call workoutService.processFrame, that would call the process frame use case.
```

### Learn
I'll analyze the conversation to extract and document the architectural decisions and patterns for this
  kettlebell workout tracking application.

  Spent 40 minutes, well worth it.

### Notes

- Slow to start but great architecutre, 100% coverage
- If you forget a test, its not going to be done, for example the UI
- Boring as hell
- Slow is Smooth and smooth is fast
- commit often. Component done? commit. Refactor? commit

## Preview

USE THE BEST MODEL YOU CAN FOR REQUIREMENTS AND PLANNING

9:50 /ask lets implement preview-mode
9:58 commit 5 user stories
9:58 /clear and /plan lets work on preview-mode
Separate preview service, extend workout service with flag, shared camera servie. Also presents some options for the UI.
> I like option C. Lets just create a singleHook, usePreview but lets have three components, one for each 
  button and a controls component that renders them all
How do we handle camera and pose. how do we arrange hooks, important architectural decisions.

> It didnt occur to him that 
Workout service is the one setting canvas and video dimensions and exposing the process frame method. We need to extract that to a service, lets call it PoseService, that takes care of camera, detection and pose rendering, then we can use it in our PreviewService and our WorkoutService.
This will work much better
- You need to be vigilant

10:14 /clear and /act lets work on preview-mode

Auto mode until first component completed

I've completed the PoseService component. All tests are passing. Should I proceed to the next component
  (refactoring WorkoutService to use PoseService)?

Review diff in vscode
Working? Commit
Refactor needed? Commit then ask to refactor

│ > Commit and then refactor: when clearing the canvas use the renderer adapter. Dont do it manually          │

After refactor > Commit and next
Repeat until done

Finished around 11:06

QA and bugs until 11:20

## Rep tracking 
12:00

We want to automatically count repetitions of overhead lifts such as jerk or snatch. This will be used by people training at home on their own. Normally people record themselves and count reps after a ten minutes set.
We will use the existing pose detection system to detect when the wrist has gone over the nose. We need to be very careful to not count double reps so we need a state machine:
down for 300ms + up for 300ms = rep, then back down.
Also reps can be made with left, right or both arms (always count as one) It is CRITICAL, that we first check for both arms and then for individual, to avoid double counting, and it will probably be good to have some kind of debounce. We need 100% accuracy.
We will be detecting them in real time.
For now we will just count them and display them in the ui, in a floating card with the same glass effect as the rest of the UI. System should NOT MISS or count incorrectly.

12:09 plan

We will have a RepDetectionService in the domain, with a RepDetectionState machine that encapsulates that logic.
Process frame use case will return the result and workout service will call DetectRepUseCase that will make use of the repdetectionservice.

For ui lets create a workout-stats component, with a workout-stats-card and do it that way.
We will store the reps in the workoutEntity as an array, each rep will have hand (left, right, both) and timestamp.
The stats use case needs to return the number of reps.
Lets focus on the domain first.

12:25 act

13:41