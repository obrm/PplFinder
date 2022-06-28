# Ppl Finder

Welcome to the Ppl Finder application.
This app is a simple application which displays randomly generated user information in a list, using the `randomuser.me` API.

Deployed site: [https://obrm-ppl-finder.netlify.app/](https://obrm-ppl-finder.netlify.app/)

## Getting Started

To get this app running locally all you need to do is:

1. Make sure you have a [Github](https://github.com) account
2. [Fork this repository](https://github.com/powerlink/PplFinder) to your GitHub account.
3. Clone your newly created repository
4. In the created folder install the node modules `npm install`
5. Run the app `npm start`
6. Your local app should be available at `http://localhost:3000`

## Your Tasks

This project includes 2 main tasks, all of which are mandatory.\
You can and should learn new skills during the process, you may consult with Google and friends but you will need to explain why you implemented what you implemented, so be responsible for your code.

### Task 1 - Filters

Above the list, there are several disfunctional checkboxes, which should add country filters to the user request, you need to make them work as follows:

1. Leaving them all unchecked should display all countries.
2. Checking one of the checkboxes should only fetch users from that specific country.
3. Checking several checkboxes should fetch users from all of the selected countries.

#### Bonus:

1. Add another country filter.

### Task 2 - Favorites

Each user displays a heart icon while hovered, you need to implement the following functionality:

1. Add functionality which enables the user to select their favorite users.
   - Should be persistent - refreshing or closing the site will not reset the favorites.
2. Once a user is Favorited, the heart icon should stay visible even if the user is not currently being hovered over.
3. Clicking on a favorite user's heart icon should unfavorite the user.
4. Favorite Page\
   4.1. The Navbar has a Favorites tab, which should navigate to a new Favorite Page once clicked.\
   4.2. The Favorite Page should display all of the Favorited users.\
   4.3. Clicking on a heart icon inside the favorite page should unfavorite the user, and remove it from the page.

### Task 3 - Infinity Scroll

Implement an Infinity Scroll functionality, which would fetch additional users and add them to the list once scrolling all the way down.

### Bonus - Your Personal Touch

- This is your chance to get creative. Add a new, **cool and innovative** feature to the app.
- Feel free to delete, add, and refactor components as you see fit.
  **Make sure** that the previous tasks still work.

## Tips / Notes

- All the code you'll change / add will be in the `/src` folder.
- If you want to use `npm` modules for other parts, go for it - just make sure you know how they work under the hood.

#### Remember: this test is designed to see how you complete tasks that require self learning, not to test your existing knowledge.

## Submitting your project

After you've completed your tasks, and you are ready to submit it, do the following:

1. Make sure all the code is committed and pushed
2. Deploy your app using Github Pages.
3. Send us an email with your repo link & deployed app url.

## Good Luck!
