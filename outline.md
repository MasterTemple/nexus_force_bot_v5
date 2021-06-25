# make sure the format supports all of these
1. help
2. normal
3. search
4. tic tac toe

# what does it do on button and on message?
1. it should perform the same function
2. command name is right after the prefix: `!command_name` or  the buttons `custom_id`
3. except on button edits the message and on message sends the message

# getting id and pages

```js
let id = button.message.embeds[0].title.match(/(?<=\[)\d+/g)?.[0]
```
gets id from “some name [123]”
```js
let page = button.message.embeds[0].title.match(/(?<=\()\d+/g)?.[0]
```
gets page from “some name [123] (1)”

# how will it work?
- if the buttons and commands work the same, they can use the same command file
- i will have 2 handlers, button and message
- they will both send the following parameters to the command file
    1. `message`
    2. `id`
    3. `page`
    4. `embed`
    5. `message_data`
- the command file should return `[text, embed, components]`
- each handler will be doing the sending or editing
- message handler will create a blank embed, with no fields
- button handler will send the previous embed, but remove all fields


## command handler parameters:
### receive from `index.js`
1. `message`
2. `command_name`
3. `args`
### send to `command_file`
1. `message`: `message`
2. `id`: `search(command_name, return_one, args)`
3. `page`: `0`
4. `embed`: `create_embed(STUFF GOES HERE)`
5. `message_data`: `{}`

## button handler parameters:
### receive from `index.js`
1. `button.message`
2. `button.custom_id`
3. `args`
### send to `command_file`
```js
let embed = message.embeds[0]
embed.fields = []
```
1. `message`: `message`
2. `id`: `embed.title.match(/(?<=\[)\d+/g)?.[0]`
3. `page`: `embed.title.match(/(?<=\()\d+/g)?.[0]`
4. `embed`: `embed`
5. `message_data`: `message_data[message.id]`

# extra functions
## field manager
takes all fields and divides them into groups based on given number of fields allowed in a group, this group size is determined in `config.json`
## button manager
takes a 2D array of buttons and turn its it to a component by adding each initial index as a new action row
# extra notes
- if i create button data/message data for tic tac toe, delete button data after someone wins or ties
- message data would be created in message handler
- except i have to send the message first, i could create an empty object `{}` and pass it as message data
- then after i send message, do `message_data['sent_message'] = {...temp_message_data}`
- this would mean
- message data would be modified in each command handler
- what do i do if i want a command file that only exists on a button being pressed
- check `is_command_file` to see where the command is from (a command or a button function file)
- get `is_command_file` value from a map
- maybe i could try a try catch
k
# how will this support each one?
### help
- um
### normal
- um
### search
- um
### tic tac toe
- um

# search types
1. `activities`
2. `bricks`
3. `bricks_or_items`
4. `enemies`
5. `items`
6. `kits`
7. `lti_names`
8. `mission_locations`
9. `missions`
10. `npcs`
11. `objects`
12. `preconditions`
13. `skills`
14. `packages`