module.exports = {
    name: ['play'],
    description: 'View what a vendor sells',
    use: 'npc [args]',
    example: ['npc samurai 3'],
    notes: 'This is a command used to view what a vendor sells.',
    search_type: 'npcs',
    embed_length: 18,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let form = "https://docs.google.com/forms/d/e/1FAIpQLSdNSfD-9HTQmFtORShBVLqk_srQ759G3VEPYOkpv1XrsjD61g/viewform"
        embed.setTitle("How to Play on Mick's Uchu Test Server")
        embed.setURL("https://uchu.mickv.me/")
        embed.addField("Gaining access", `Access to the test server is on a whitelist basis to ensure that all new testers are reviewed and understand the rules. Gaining access is quite simple and works by filling in this [Google form](${form}).\n\nWhitelist requests are handled on an ad-hoc basis, essentially whenever the development team feels like there are new features that need testing. Credentials are sent to you over Discord. Note that only a username can be picked, you will get a random password for security reasons.`, false)
        embed.addField("Playing", "So you got whitelisted, now what? You now have to setup your client such that you can connect to the public test server, the steps are described in the following section. You can either use the Nexus LU installer to install everything for you or do a manual installation. The Nexus LU installation method is recommended for non-technical users.", false)
        embed.addField("Play using the Nexus LU Launcher (recommended)",
            `**1.**Download and unzip the latest Nexus LU launcher GUI (Graphical User Interface) [here](https://github.com/TheNexusAvenger/Nexus-LU-Launcher/releases) for your platform (probably Windows).
**2.** Run the \`NLUL.GUI\` executable
**3.** Press "Play!" to install the game, this can take a while as there's a lot to install
**4.** Press "Add" to add a server, enter a "Mick's Uchu Test Server" as name and \`uchu.mickv.me\` as address
**5.** Select the test server and press "Play" to start playing!`, false)
        embed.addField("Play using a manual installation",
            `**1.** Download lcdr's packed client [here](https://docs.google.com/document/d/1XmHXWuUQqzUIOcv6SVVjaNBm4bFg9lnW4Pk1pllimEg). You can choose to use the unpacked client but this is not required if you don't wish to develop for Uchu.
**2.** Download and install lcdr's TcpUdp mod from [here](https://github.com/lcdr/raknet_shim_dll/releases/tag/2020-12-09). Follow the instructions on this website before asking questions about installing the mod, they are clear and correct.
**3.** Look for the boot.cfg file in your LU client folder, open it with your favorite text editor and change \`AUTHSERVERIP\` and \`UGCSERVERIP\` to \`AUTHSERVERIP=0:uchu.mickv.me\`, and \`UGCSERVERIP=0:uchu.mickv.me\`, respectively.
**4.** Start up LU and login using the credentials you got from the response to your whitelist request.
**5.** Play!`, false)
        // embed.setFooter("Mick's Test Server is a hosted LEGO Universe server based on Uchu, an open source LEGO Universe server emulator, written in C#.\n" +
        //     "Uchu is not affiliated with this test server and carries no liability for harm done while playing on it, join at your own risk.\n" +
        //     "Mick's Test Server and Uchu are not affiliated with or endorsed by the LEGO Group.")
        let components = [
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Google Form",
                        "style": 5,
                        "url": form,
                    },
                    {
                        "type": 2,
                        "label": "Nexus LU Launcher",
                        "style": 5,
                        "url": "https://github.com/TheNexusAvenger/Nexus-LU-Launcher/releases",
                    },
                    {
                        "type": 2,
                        "label": "lcdr's Packed Client",
                        "style": 5,
                        "url": "https://docs.google.com/document/d/1XmHXWuUQqzUIOcv6SVVjaNBm4bFg9lnW4Pk1pllimEg",
                    },
                    {
                        "type": 2,
                        "label": " lcdr's TcpUdp Mod",
                        "style": 5,
                        "url": "https://github.com/lcdr/raknet_shim_dll/releases/tag/2020-12-09",
                    },
                ]
            }
        ]
        return [, embed, components, message_data]

    }
}