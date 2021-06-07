# Feedback for alabaster armadillo

( ) tagged commit on main for sprint3
(-) working deployment on Heroku
(X) travis reports build passing
( ) handoff instructions

## Checklist notes

There is no tag for sprint 3.

The deployment on Heroku doesn't seem to be working. I get a database error when I attempt to create a profile.

There are also no handoff instructions with the environment variables that need to be configured or any other information that someone would need to further develop your application.

## Discussion

### Functionality

I like the concept and the styling is nice, but functionality-wise, the app is a bit disappointing. When I tried to use the deployed version, there was a database error and I couldn't finish logging in. When I deployed it locally, I could get in, but then I couldn't post anything (I could make posts, they would get stored in the database, but then they wouldn't show up). I know that some of this functionality was working at some point, because I have seen posts being displayed. After a little tweak to the code, I got the posts to show up under some conditions.

Even if everything was working, the functionality is definitely on the minimal side of what was promised. This is really a simpler version of simplepedia, with some missing features that are implied by the interface (search, likes, reporting,...). I'll also admit that I don't agree with some of your design choices, such as the counting up on posts, and the fact that posting something new just changes the existing post in place.

### User stories

I do see some user stories that are tagged sprint 3 in the Done column. The user stories I looked at all have some form of acceptance criteria, which is good. The actual content of the user stories feels a bit contrived, however. They read like you had some feature in mind and you were trying to write a user story that would encompass the feature you wanted to build. Some examples:

- Users don't care about databases. If we were to really write this from the user's perspective, it would be "As a user, I don't want my password and email to be exposed, because someone might pretend to be me on the site". How to implement that is on you. In our case, we are using Auth0, but that is not something a user will ever request. In truth, we are explicitly _not_ storing information in a database so that it is more secure.

- Starting a user story off with "As a developer..." is always a bad sign. You would get at the particular feature by looking at what users really (at least conceptually) want: a social media platform that supports short, immediately relevant posts, without inflammatory rhetoric. They don't know how to get that. You are supporting that feature by implementing 60 character messages.

- You have a story about wanting "time relevant posts", but you don't say why. What is the motivation here? Short term coordination maybe? or maybe your user doesn't like how the "fear of missing out" means that they spend hours trying to reach the end of Facebook.

The common thing here is really thinking about the user and what _they_ want. The feature itself comes later.

I'll also note that you have relatively few closed user stories, and quite a number waiting in the backlog.

### Agility/scrum

I suspect that your adherence to some of our agile practices was a little haphazard, and it cost you. Your commits are bursty, and fairly sparse across the week. It seems like there was a lot of sharing of especially Gretchen's replit for doing work, rather than using git to share code and work independently.

I also see a fair number of open branches. At the conclusion of the project, we should have nothing but `main`, and maybe `deployment`.

### Integration

I see a good number of pull requests, but I see some broken commits being merged, and very few comments indicated that there was any real review happening.

### Implementation

I see a lot of Simplepedia in the way that this app was structured. That isn't, on its face, a bad thing -- I walked you through that project for a reason. However, I feel like you adhered to it a little too closely, without really thinking about the ends of your application. An example of this is the `mode` state, `complete` function, and comments about "editing".

One of the issues with getting the posts to show up, is the `useEffect` that fetches the posts is fired off by a change in `posts`. This suggests to me that someone is confused about what that actually means. The `posts` variable is a local value -- it doesn't know if posts have changed on the server or not. The only thing that _changes_ `posts` is this `useEffect`. If there isn't a `session` when the page loads initially -- no posts will show up. After that, it will go into an infinite loop, fetching posts, re-rendering, which triggers a new fetch, etc...

Using the timer to delete posts is not really the best approach. I would say that you would want a periodic process that updates the view, and then if the timeout field of the post is exceeded, delete it.

The search bar isn't hooked up to any functionality (which we knew from the demo).

The tests are pretty minimal. I don't see any integration tests, and only some fairly basic unit tests for a couple of components. The most comprehensive tests were for the database interaction.

## Final Thoughts

This is a hard one. I liked the idea that you settled on, and there is some solid work in there. The database seems to largely be working (other than the odd issue with the Heroku deployment), and the styling looks nice. As I said to a number of you, it didn't seem like your team was dysfunctional, but you definitely didn't completely gel, which I think was unfortunate. It seems like the team was plagued by having so many members who were a little behind, so the focus wasn't always on the project itself. It also seemed like you adopted some practices (like sharing repls) that were detrimental to your forward progress at points.

I see learning here, which is the goal, but it would have been nice if the project had gotten closer to the promised functionality.
