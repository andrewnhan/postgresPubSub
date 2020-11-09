# postgresPubSub

This repo is a demo of two nodejs apps: postgresPublisher and postgresListener. The former connects to a database client specified within the config object in the script. It'll go through and add 10 rows into the specified table. The table schema has to match that of the one in the script.

The latter is a listener that listens on the channel of the database specified by the pg_notify trigger. It will print a JSON representation of the row inserted.

The notify_generic_row psql file sets up the trigger and the respective pg_notify function as part of the trigger.
