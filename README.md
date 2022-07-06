# Betting-app
Simple betting is to simulate an online betting app in which registered users can place bets
on sports events. It is created using React.js on frontend, with Node.js, express and postgresql on backend. Some Unit testing on backend is done using chai and mocha.
For desing is use MUI

## The application should consist of:
* A register page where users can sign up
* A login page where registered users can sign in
* A dashboard page which shows current sports events on which the user can place bets
on, including their odds and the current ticket the user has created
* A page where events can be added and resolved - on this page new events can be
created along with the odds. The page also contains a button which resolves all events
by picking a random outcome for each of them. The “Resolve Events” button completes all unresolved matches by randomly choosing an
outcome. It also checks all open tickets. The players who have winning tickets get their balance
updated.
* A ticket page - shows all tickets the user has placed along with their status:
won/lost/unresolved

## Requirements:
* The users log in with a valid email and password. Two users can not use the same
email.
* On the dashboard the users who are not logged in can only see available events they
can bet on and their odds, while logged in users can also see their current balance and
their current ticket if they placed one.
* Sport events include football and tennis matches. In football matches the user can bet
on the home team, the guest team and a tie. In tennis matches the user can only bet on
one side winning.

## How to start ?
* cd backend & npm i, after that npm start
* cd ui & npm i, after that npm start
