# Feedback for alabaster-armadillo

( ) tagged commit on main for sprint2
(-) set of closed user stories
(X) working deployment on Heroku
(X) travis reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes

- No sprint2 tag (or sprint0 or sprint1 now)
- The user stories are not really "closed" though some are in the "Done" column
- Missing reflection from Alex

## Discussion

### Functionality

I like where this project has headed. I think the simplicity of the idea was a good choice. The styling look nice (though I'd like to see a little more contrast on the 60 in the logo), however, you have left an awful lot for the last sprint. Your functionality is perhaps less than what we implemented for Simplepedia at this point. I think you need to hit the server and database portion of this first thing in the next sprint and make this functional. I might even suggest making the friend functionality a secondary priority after you have posting and persistence solid.

I'll also admit that I am less enthused about the tags. I think they are a bit too limiting. From a UI perspective they also have a couple of issues. The select menus are not really meant to be a tool for making multiple selections -- the expectation would be that you set them to the values you want and that is what goes in the post. It is also not obvious that clicking on tags would make them go away. My vote would be to lose them, or at the very least use checkboxes if you want to constrain your users to a couple of pre-defined tags.

I would consider taking a lesson from Google's book. When you go to Google's page, there is just a search bar, you don't have a lot of other junk there, nor do you have to go to another page to enter your search term. Why not just have a field for entering your current status right in the main page? I would think this site would live or die on how quickly someone can update their status and how much of a pain it is to do -- going to a second view and typing and clicking buttons a lot seems like a pain. As a user, I would also like to see my current status because I'm forgetful and I may not remember that I already "dished" (is that the right verb?) or how long ago I did it. _See what I did there? I wrote a user story describing a feature and why I thought it was a good idea_

Another choice that I might suggest would be to enforce the character limit by not allowing the user to add more characters after 60. I would also make the text entry box smaller so it doesn't look like they can type in an essay. An error message might also be helpful as many users may have no clue why they suddenly can't post anything (or could no longer type anything).

### User stories

It is not a great sign that the first two user stories I saw started "as a developer". These are not real user stories. _Your_ desires are not what is important here. You need to figure out how to couch things in terms of actual users.

The challenge is that you are adding some artificial limitations that no one is clamouring for (like the 60/60 or the one post post at a time). But you need to dig a little deeper. Why did _you_ think those were reasonable? From what I have gathered you are shooting for:

- timely, users want to be able to see what their friends are up to _now_ not 12 hours ago
- ephemeral, user don't want to leave a record of their activities behind
- quick, users don't want to spend an age trying to enter their status in, also they would like their friends to enter in their statuses

There may be some more reasons, but then the 1/60/60 is how you have decided to satisfy those perceived needs. Of course, some of these will have acceptance criteria that are a little harder for us to test, but if we were doing this at scale, we would do user testing to determine things like time to enter a status, or the number of interactions required to enter a status.

Probably one of the better user stories is the one about showing the length of time before the post disappears. But even that I would flip around. The user doesn't care how much time is left -- they care how stale the post is. The countdown is how you are indicating that, but it is not the only way, and it may not even be the best way. I would think counting forward may give a better sense of how old a post is. I could even imagine doing something like having the post fade away as it ages out, which would be more visually salient than a countdown timer.

### Agility/scrum

Your user stories are a little haphazard. Some are issues, others are not. Some are tagged, but there doesn't seem to be a consistent tagging scheme. Some have scores, others do not. Some have acceptance criteria, others do not. None of them seem to be assigned to anyone. I also see that a number have been moved to the "Done" column, but none of them have been closed.

I don't see big bursts of activity, which is good, but I'm also not seeing a lot of regular commits either.

### Integration

Your group is using the PR system, and I don't see any self commits or commits that break the build. However, it looks a little bit like you are just avoiding self-commits by having someone else do it without an real review of the code. I would expect a few more eyes on each PR and some evidence that there was a critical eye in there. I don't want you to purposefully shoot down PRs to make me happy, but it seems unlikely that everyone is totally on board with everything every one has produced and has no suggestions for improvements.

It looks like you have not always followed through with deleting the feature branches either.

### Implementation

- I spoke with Yaqi about the database migrations. The two main points were (1) you don't have ARRAYS in sqlite - this is a moment for a second table that keeps track of friends and (2) there were missing drops in the nextauth migration that made the tess fail.

- `index.js`: I see a lot of dead code in here. Make sure to clean out code you are no longer using. Git will hang on to it if you commit it. Even if you want to comment out blocks of code temporarily, don't commit those into `main`. I'll also note that some of that seem to be DB code which absolutely won't work -- this is client side code and it can't see your database.

- `backend-utils.test.js`: There is a huge amount of commented out code in here. The only test you left standing was a smoke test, which isn't even a smoke test because it doesn't load any components of your project. In truth, there shouldn't be any testing-library references in here at all. This is backend code and doesn't do any rendering.

- `EnterStatus.js`: Your PropTypes don't agree with your props. In addition, while I have advocated for getting rid of the tags, if you do keep them, I would suggest making an array of the valid values and using map to generate the `option` or however you create the control for the user so you aren't hard coding those values into the application. If they were stored in an array, changing the interface would require one change. In its current form you have to change each tag individually.

- `Post.js`: More dead code in here as well.

- `Post.test.js`: It would be good to include a test about the countdown and going away. This may be better as an end-to-end test, which your project seems to lack at the moment.

- You should add \*.sqlite3 to the gitignore file so you don't store the database in the repo.

- For the next sprint please make sure that the README is fully fleshed out with everything someone needs to know in order to deploy and run your project.
