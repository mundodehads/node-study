# Non-duplicated Tables Project

## About

This project was required to create non-duplicated tables from tables that have the same data duplicated, but with the timestamp of insertion. The project goal was to build a non-duplicated table with the most recent timestamp data.

Our google function add a new table to insert the data, remove all older tables in the dataset, if we get an error on insert, we delete the created table and keep older tables.

To execute multiples functions we create a app engine with a cron, that get all the cron executed urls and pass it to a python function that calls the same url on google function. That was implemented because cron jobs on google cloud can call url from google function directly.
