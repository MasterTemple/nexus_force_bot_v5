# Nexus Force Bot v5

# Use

## Search

To not have to know an item's exact name or ID.

![](https://media.discordapp.net/attachments/725055794755665930/975968560985813032/unknown.png)

## Button

To interact with the data: go to the next page, show fractions/percents, navigate to a different aspect of an item.

![](https://media.discordapp.net/attachments/725055794755665930/975970070499037264/unknown.png)

## Select Menu

Select an item/vendor/mission/npc/etc. from a list.

![](https://media.discordapp.net/attachments/725055794755665930/975969805318385774/unknown.png)

### /activity

Show what an activity drops.

![](https://media.discordapp.net/attachments/725055794755665930/975973331977257000/unknown.png)

### /bricks

View what drops a brick or where you can buy it and other relevant information.

![](https://media.discordapp.net/attachments/725055794755665930/975968308614561792/unknown.png)

### /buy

Shows the vendors that sell an item.

![](https://media.discordapp.net/attachments/725055794755665930/975971153422196776/unknown.png)

### /cooldowngroup

Show all skills that have overlapping cooldowns.

![](https://media.discordapp.net/attachments/725055794755665930/975971639294574662/unknown.png)

### /drop

Show what drops an object and its chances to be dropped

![](https://media.discordapp.net/attachments/725055794755665930/975971801639305266/unknown.png)

### /earn

Show the missions or achievements to complete to earn an item.

![](https://media.discordapp.net/attachments/725055794755665930/975972387826839572/unknown.png)

### /enemy

View stats on an enemy.

![](https://media.discordapp.net/attachments/725055794755665930/975972593364525076/unknown.png)

### /enemydrop

View what an enemy drops and its chances to drop each rarity of each item in each loot table.
![](https://media.discordapp.net/attachments/725055794755665930/975972801980821554/unknown.png)

### /factions

View the member count of each faction in a server.

![](https://media.discordapp.net/attachments/725055794755665930/975972924450304010/unknown.png)

### /help

View all commands available for use.

![](https://media.discordapp.net/attachments/725055794755665930/975973100590104596/unknown.png)

### /item

View major stats on an item.

![](https://media.discordapp.net/attachments/725055794755665930/975973477888688168/unknown.png)

### /kit

View the passive abilities and stats of a kit.

![](https://media.discordapp.net/attachments/725055794755665930/975973637825921024/unknown.png)

### /level

View the XP requirements for a level.

![](https://media.discordapp.net/attachments/725055794755665930/975973776506359848/unknown.png)

### /loottable

View all items by rarity in a loot table.

![](https://media.discordapp.net/attachments/725055794755665930/975973996677963776/unknown.png)

### /meme

View a LEGO Universe meme from r/nexusforcememes

![](https://media.discordapp.net/attachments/725055794755665930/975974229319237702/unknown.png)

### /mission

View the objective, rewards, and type of mission/achievement.

![](https://media.discordapp.net/attachments/725055794755665930/975974990463787040/unknown.png)

### /npc

View the missions given by an NPC.

![](https://media.discordapp.net/attachments/725055794755665930/975975365480710214/unknown.png)

### /package

View the contents of a package.

![](https://media.discordapp.net/attachments/725055794755665930/975975608045666315/unknown.png)

### /preconditions

View the prerequisites to use an item.

![](https://media.discordapp.net/attachments/725055794755665930/975975964926423097/unknown.png)

### /search

Search all objects within LEGO Universe.

![](https://media.discordapp.net/attachments/725055794755665930/975976125492781056/unknown.png)

### /simulate

Simulate the drop of an item from an enemy.

![](https://media.discordapp.net/attachments/725055794755665930/975976508474662952/unknown.png)

### /skill

View the stats on a skill.

![](https://media.discordapp.net/attachments/725055794755665930/975976905541054564/unknown.png)

### /skillitems

View the items that have a particular skill.

![](https://media.discordapp.net/attachments/725055794755665930/975977164350574592/unknown.png)

### /tictactoe

Play tic-tac-toe with LEGO Universe factions.

![](https://media.discordapp.net/attachments/725055794755665930/975977861951397928/unknown.png)

### /vendor

View what items a vendor sells.

![](https://media.discordapp.net/attachments/725055794755665930/975977273847087154/unknown.png)

# Setup

1. Download and Install [Node.js](https://nodejs.org/en/download/)
2. Download this project
3. Open a terminal in the `/nexus_force_bot_v5` directory, run `npm install`
4. Add a `config.json` to the `/nexus_force_bot_v5` directory. The file should look mostly like this, except put in your own token.

```json
{
  "prefix": "!",
  "name": "Nexus Force",
  "bot_icon_url": "https://cdn.discordapp.com/attachments/814459321282592769/849487058451169300/circle-cropped_1.png",
  "github_link": "https://github.com/MasterTemple/discord_bot_template",
  "output_path": "./../../output/",
  "color": "#39A8CC",
  "token": "your_token_goes_here!",
  "version": 5,
  "footer": "Nexus Force Bot 5.0",
  "image_link_domain": "https://lu.lcdruniverse.org/lu-res/",
  "explorer_link_domain": "https://lu.lcdruniverse.org/explorer/",
  "universe_icon": "https://media.discordapp.net/attachments/641133444746838016/855979091983335514/communityIcon_mpbaes4n8n231.png",
  "invis_char": "឵឵",
  "time_out_ms": 300000,
  "administrators": ["789705048035688458", "703120460023463986"],
  "developers": ["703120460023463986", "789705048035688458"],
  "embed_sizes": {
    "search": 24,
    "loot": 6,
    "missions": 6
  },
  "emojis": {
    "armor": "820200969861857280",
    "heart": "820200969803268096",
    "imagination": "820200969789767690",
    "mythran": "834921599764398110",
    "assembly": "850419548611280986",
    "paradox": "850419548271149097",
    "sentinels": "850419548653092905",
    "venture": "850419548733440031",
    "nexus_force": "847950505816227871"
  },
  "startup_status": "LEGO Universe"
}
```

5. You will also have to add different emoji IDs in `config.emojis` [(feel free to contact me if you have any trouble) ](https://github.com/MasterTemple/nexus_force_bot_v5/#Contact)
6. Install Nodemon by running `npm i nodemon -g` in your terminal
7. Run `index.js` by running `nodemon index.js` in your terminal

# Contact

If you have any questions regarding use or any suggestions for features, feel free to contact me on Discord at `MasterTemple#0233` (my ID is `789705048035688458` just in case my name is changed). Find me in the [LEGO Universe Community Hub](https://discord.gg/Yz8yEmZ)!
