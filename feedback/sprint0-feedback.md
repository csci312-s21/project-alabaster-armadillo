# Feedback for alabaster-armadillo

(X) project repository with all team members
( ) package.json updated
( ) `npm test` and `npm run lint` run without errors
( ) travis reports build passing
( ) project deployed to heroku
( ) README.md is updated
( ) one pull request
( ) commit tagged sprint0
(X) backlog populated with epic user stories
(X) lo-fi storyboards created
(X) CRC cards created

## Checklist notes

- Only two names made it into package.json
- There are a number of lint errors
- travis is not reporting a passing build (because of the lint errors)
- The README has not been updated with project description, travis badge or Heroku link
- There are no pull requests
- There is not a commit tagged with sprint0

## Design notes

I appreciate that you explored some alternate designs. I wish, however, that you had spent a little more time on the user stories. You have three big epic user stories that cover a lot of ground. However, there is very little in the way of details. You are going to need to produce a lot of user stories to flesh out the actual functionality of the site. I already see details creeping into your designs that aren't present in the user stories at all (like groups and messages). This is okay as part of your brainstorming about what the app is, but don't get so hung up on the details that you end up implementing things with no user value...

My inclination is to suggest that you focus on the user story in issue #5, since that is the core functionality (though keeping #4 in mind). I'd be inclined to suggest putting #3 on the back burner -- that is a whole website of its own.

The CRC cards don't quite capture what you need, but I'm not sure your concept is well enough advanced for them yet either. The goal of the CRC cards is to capture that data you will be storing and moving around in your application (like `article` and `film`). The `Map` is a user interface view. The Session Manager is probably a piece of control logic and User and Friend sound like they are actual people. You will certainly have a piece of data representing the User, but remember that it is the internal representation, not the person clicking buttons and interacting with the site. So, for example, a User might know username, location, status, and possible friend list.

Big picture, you have a lot to do to get to the point where you are ready to make forward progress. During the sprint planning session focus on generating a collection of user stories that flesh out epic #5. Make sure that they are INVESTable and that you include acceptance criteria for them. Remember that features _must_ be supported by user stories. You also don't want to waste half the sprint trying to figure out what to do.
