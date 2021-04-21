# Feedback for alabaster-armadillo

(X) tagged commit on main for sprint1
(X) set of closed user stories
(X) working deployment on Heroku
(?) travis reports build passing
( ) team members have completed reflection
(X) demo

## Checklist notes

Both of these are holdovers from sprint 0 that have not yet been resolved

- The README has not been updated with project description, travis badge or Heroku link
- There is not a commit tagged with sprint0 (or sprint1)

## Discussion

### User stories

I think there is some room for improvement in your user stories. As we discussed during the retrospective, having acceptance tests on the user stories is fairly critical. One of your "completed" user stories is the addition of unique user accounts. This is clearly not accomplished.

The other "completed" user story is somewhat marginal in that the rationale phrase is pretty weak. it basically says that you want to share your status to share your status. I actually think that you included some of the rationale in the first clause. Why do you want to share your status? So your friends know when to leave you alone, join you for a meal, or come to hang out. Right? This is all about communication. This isn't twitter when you are recording the ups and downs of your life for posterity. These are ephemeral and if they aren't read they are pointless. I'll note that while you said this during the demo and we've talked about it earlier, I don't see any mention of this (really important!) aspect of the interface in any of the user stories.

The user story attached to issue #26 is better in that it has some clear language about what the expectations are for that particular feature. On the flip side, that one has no score attached to it.

My advice: Convert all of the user stories to issues to give you more flexibility. Make sure that all of your user stories have clear acceptance criteria. Make sure that the ones in the sprint backlog are scored. Link to reference material with respect to lo-fi prototypes, CRC cards, or other design documents you may have come up with to capture the low level implementation details. Break up your existing user stories into smaller chunks, and include those in the backlog to make your todo list. I would also suggest you start tagging things (like sprint1) so you can get a better idea of when you completed backlog items).

### Agility/scrum

It looks like almost all of the commits were done in the last two days. I would like to see a more consistent pattern of commits happening going forward. Since only two user stories made it to the "Done" column, it is is difficult to assess the success of your scoring. I've already suggested some ways to improve your use of the project board above.

### Integration

I see a lot of feature branches "in flight" as it were. You should really be aiming to close out a sprint with no dangling feature branches, since that indicates unfinished work. There will inevitably be something that doesn't get done in time, but there shouldn't be four open branches for a team of six. This suggests almost everyone didn't finish, or you aren't closing out branches as you merge them (and that seems like it is at least part of the story).

The tale from your PRs is similar to the one I see from your commits. All of your PRs were less than a day ago. This clearly led poor pull request practices. I only see Hannah and Gretchen touching the pull requests at all, and there are some self merges in there. I would like to see more eyes on the code ahead of time, more feedback from the group, and no more self merges. All of this requires you to be issuing the pull requests far enough in advance for others to see them and have time to respond.

### Implementation

I am pleased to see an attempt to test the code, and relatively clean look components with about the right level of commenting.

There are some issues to watch out for going forward and some better practices you could follow in some cases. All of these come from the `Home` component in `index.js`.

I am not a huge fan of hard coding your test data directly into the JavaScript. This makes it hard to find and bakes it into the code a little too closely. A better solution is the use of JSON files like we used in the assignments. Even better would be library files that abstract out the access so the code code doesn't even need to change when you have real data access.

We talked about this in class, but I will make it more concrete -- you should stick to one variable naming convention.

You should not store React components inside of state variables (line 20). For something like this, store the message and then deal with how it is displayed later.

Your checks for the email and the password could both be done a lot cleaner. While we spent time talking about constructs like `forEach`, for testing if something is in an array, you should be using `find` or a similar function. This would (a) convey to a reader what yuo are actually trying to accomplish, and (b) be more efficient as they will stop looking when they find a match. The email example is particularly inefficient, because you are also checking if the input email ends in "middlebury.edu" _on every iteration of the loop_. These should really be two separate steps for validation. From a design perspective, it would be better for these checks not to be in the root component at all. They really should be in a login component or in a library file. of course, as I indicated in class, you will have something of a different flow for authentication, but these basic principles will be relevant for other things as well.

### Functionality

The functionality is fairly minor at this point in the project. I think you have left yourselves a lot of work, while spending time on an element that will unfortunately be less useful. This is evidenced by the fact that only two user stories were marked as "done" and there are three left over in the backlog.

Also, as stated above, you didn't _really_ satisfy the user story about providing unique user accounts. You sketched in an interface, but you haven't actually provided much in the way of real functionality. This should be supported by a real authentication method, profile storage on the back end, and some facility in the code to distinguish a particular user.

As a side note, I note that when the user enters in something that results in an error message, the error message doesn't go away when they successfully log in.

On a more positive note, I appreciate the use of material-ui, and I'm glad to see you are starting to learn how to incorporate it. I hope that you learn a little bit about responsive design so your app can be used on mobile.

I think you are headed in the right direction and you seem to be leaning on Simplepedia for implementation ideas, which is not a bad thing. I think a little more thought about the design and a bigger push on the next sprint will make a big difference.
