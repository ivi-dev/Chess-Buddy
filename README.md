# chess-buddy
A program that parses a set of notations to provide an interactive timeline of a certain chess game.

# How do I run it
## Run for development
Download or clone the repo on a Node/npm equipped machine, `cd` into it and do `npm start`. Then if it doesn't do it by itself, navigate to `http://localhost:3000/`. That's it.

If you want to quickly see the app in action copy the content of the `example-session.txt` file, paste it into the textarea to the right (where it says 'Paste notations here...') and hit 'Parse'.

## Run for production
Execute `npm run-script build` in the project's root and serve with a local server like or deploy to a remote one.
