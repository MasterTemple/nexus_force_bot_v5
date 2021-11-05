module.exports = async(client) => {
    await client.application.commands.set(
        [
            {
                "name":"activity",
                "description":" View what an activity drops",
                "default_permission":true,
                "options":[
                    {
                        "name":"activity",
                        "description":"Enter the name of an activity.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"bricks",
                "description":" View brick information",
                "default_permission":true,
                "options":[
                    {
                        "name":"brick",
                        "description":"Enter the name of a LEGO brick.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"buy",
                "description":" View how to buy an item or brick",
                "default_permission":true,
                "options":[
                    {
                        "name":"loot",
                        "description":"Enter the name of an item or brick.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"cooldowngroup",
                "description":" View skills in a cooldowngroup",
                "default_permission":true,
                "options":[
                    {
                        "name":"cooldowngroup",
                        "description":"Enter the name of a cooldown group.",
                        "type":"INTEGER",
                        "required":true
                    }
                ]
            },
            {
                "name":"drop",
                "description":" View what drops an item",
                "default_permission":true,
                "options":[
                    {
                        "name":"loot",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"earn",
                "description":" View how to earn an item",
                "default_permission":true,
                "options":[
                    {
                        "name":"item",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"enemy",
                "description":" View enemy stats",
                "default_permission":true,
                "options":[
                    {
                        "name":"enemy",
                        "description":"Enter the name of an enemy.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"enemydrop",
                "description":" View what an enemy drops",
                "default_permission":true,
                "options":[
                    {
                        "name":"enemy",
                        "description":"Enter the name of an enemy.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"help",
                "description":" Displays help command",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of a command.",
                        "type":3,
                        "required":false,
                        "choices": [
                            {name:"Activity", value: "activity"},
                            {name:"Bricks", value: "bricks"},
                            {name:"Buy", value: "buy"},
                            {name:"Cooldowngroup", value: "cooldowngroup"},
                            {name:"Drop", value: "drop"},
                            {name:"Earn", value: "earn"},
                            {name:"Enemy", value: "enemy"},
                            {name:"Enemydrop", value: "enemydrop"},
                            {name:"Help", value: "help"},
                            {name:"Item", value: "item"},
                            {name:"Kit", value: "kit"},
                            {name:"Level", value: "level"},
                            {name:"Loottable", value: "loottable"},
                            {name:"Meme", value: "meme"},
                            {name:"Mission", value: "mission"},
                            {name:"Npc", value: "npc"},
                            {name:"Package", value: "package"},
                            {name:"Preconditions", value: "preconditions"},
                            {name:"Search", value: "search"},
                            {name:"Simulate", value: "simulate"},
                            {name:"Skill", value: "skill"},
                            {name:"Skillitems", value: "skillitems"},
                            {name:"Tic", value: "tictactoe"},
                            {name:"Vendor", value: "vendor"},
                        ],
                    }
                ]
            },
            {
                "name":"item",
                "description":" View item stats",
                "default_permission":true,
                "options":[
                    {
                        "name":"item",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"kit",
                "description":" View an item Set",
                "default_permission":true,
                "options":[
                    {
                        "name":"kit",
                        "description":"Enter the name of an item set.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"level",
                "description":" Level information",
                "default_permission":true,
                "options":[
                    {
                        "name":"level",
                        "description":"Enter a level.",
                        "type":"INTEGER",
                        "required":true
                    }
                ]
            },
            {
                "name":"loottable",
                "description":" View items in a loot table",
                "default_permission":true,
                "options":[
                    {
                        "name":"loottable",
                        "description":"Enter the name of a loot table.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"meme",
                "description":" Send a LEGO Universe Meme",
                "default_permission":true,
            },
            {
                "name":"mission",
                "description":" View a mission's information",
                "default_permission":true,
                "options":[
                    {
                        "name":"mission",
                        "description":"Enter the name of a mission.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"npc",
                "description":" View an npc's missions",
                "default_permission":true,
                "options":[
                    {
                        "name":"npc",
                        "description":"Enter the name of an NPC.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"package",
                "description":" View what a package drops",
                "default_permission":true,
                "options":[
                    {
                        "name":"package",
                        "description":"Enter the name of a package.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"preconditions",
                "description":" View the preconditions of an item",
                "default_permission":true,
                "options":[
                    {
                        "name":"item",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"search",
                "description":" Search for Objects",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an object.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"simulate",
                "description":" Simulate a drop from an enemy, package, or activity",
                "default_permission":true,
                "options":[
                    {
                        "name":"object",
                        "description":"Enter the name of an object.",
                        "type":"STRING",
                        "required":true
                    },
                    {
                        "name":"type",
                        "description":"Select what type of drop this item is.",
                        "type":3,
                        "choices": [
                            {
                                "name": "Activity",
                                "value": "activity"
                            },
                            {
                                "name": "Enemy",
                                "value": "enemy"
                            },
                            {
                                "name": "Package",
                                "value": "package"
                            }
                        ],
                        "required":true
                    },
                    {
                        "name":"enemy",
                        "description":"Enter the name of the enemy.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"skill",
                "description":" View skill stats",
                "default_permission":true,
                "options":[
                    {
                        "name":"skill",
                        "description":"Enter the name of a skill.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"skillitems",
                "description":" View skill items",
                "default_permission":true,
                "options":[
                    {
                        "name":"skill",
                        "description":"Enter the name of a skill.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            },
            {
                "name":"tictactoe",
                "description":" Play tic tac toe",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter a user.",
                        "type":6,
                        "required":true
                    }
                ]
            },
            {
                "name":"vendor",
                "description":" View what a vendor sells",
                "default_permission":true,
                "options":[
                    {
                        "name":"npc",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        autocomplete: true,
                        "required":true
                    }
                ]
            }
        ]
    )
}