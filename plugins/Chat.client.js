import { storeToRefs } from "pinia";

export default defineNuxtPlugin(nuxtApp => {  
  console.log('init twitch chat nuxt plugin')
  class TwitchChat {
    constructor(joiner, broadcaster, commands, commandPrefix) {
      this.joiner = joiner;
      this.broadcaster = broadcaster;
      this.commands = commands;
      this.commandPrefix = commandPrefix;
    }
    // parseMessage, parseTags, parseCommand, parseSource and parseParameters came from twitch's documentation
    // for an example message parser, with a couple small changes here and there
    parseMessage(message) {
      let parsedMessage = {  // Contains the component parts.
        tags: null,
        source: null,
        command: null,
        parameters: null
      };
      
      // The start index. Increments as we parse the IRC message.
      let idx = 0; 
      
      // The raw components of the IRC message.
      let rawTagsComponent = null;
      let rawSourceComponent = null; 
      let rawCommandComponent = null;
      let rawParametersComponent = null;
      
      // If the message includes tags, get the tags component of the IRC message.
      if (message[idx] === '@') {  // The message includes tags.
        let endIdx = message.indexOf(' ');
        rawTagsComponent = message.slice(1, endIdx);
        idx = endIdx + 1; // Should now point to source colon (:).
      }
      
      // Get the source component (nick and host) of the IRC message.
      // The idx should point to the source part; otherwise, it's a PING command.
      if (message[idx] === ':') {
        idx += 1;
        let endIdx = message.indexOf(' ', idx);
        rawSourceComponent = message.slice(idx, endIdx);
        idx = endIdx + 1;  // Should point to the command part of the message.
      }
      
      // Get the command component of the IRC message.
      let endIdx = message.indexOf(':', idx);  // Looking for the parameters part of the message.
      if (-1 == endIdx) {                      // But not all messages include the parameters part.
        endIdx = message.length;                 
      }
      
      rawCommandComponent = message.slice(idx, endIdx).trim();
      
      // Get the parameters component of the IRC message.
      if (endIdx != message.length) {  // Check if the IRC message contains a parameters component.
        idx = endIdx + 1;            // Should point to the parameters part of the message.
        rawParametersComponent = message.slice(idx);
      }
      
      // Parse the command component of the IRC message.
      parsedMessage.command = this.parseCommand(rawCommandComponent);
      
      // Only parse the rest of the components if it's a command
      // we care about; we ignore some messages.
      if (null == parsedMessage.command) {  // Is null if it's a message we don't care about.
        return null; 
      }
      else {
        if (null != rawTagsComponent) {  // The IRC message contains tags.
          parsedMessage.tags = this.parseTags(rawTagsComponent);
        }
      
        parsedMessage.source = this.parseSource(rawSourceComponent);
      
        parsedMessage.parameters = rawParametersComponent;
        if (rawParametersComponent && rawParametersComponent[0] === '!') {  
          // The user entered a bot command in the chat window.            
          parsedMessage.command = this.parseParameters(rawParametersComponent, parsedMessage.command);
        }
      }

      return parsedMessage;      
    }
    parseTags(tags) {
      // badge-info=;badges=broadcaster/1;color=#0000FF;...
      const tagsToIgnore = {  // List of tags to ignore.
        'client-nonce': null,
        'flags': null
      };

      let dictParsedTags = {};  // Holds the parsed list of tags.
                    // The key is the tag's name (e.g., color).
      let parsedTags = tags.split(';'); 
      parsedTags.forEach(tag => {
        let parsedTag = tag.split('=');  // Tags are key/value pairs.
        let tagValue = (parsedTag[1] === '') ? null : parsedTag[1];

        switch (parsedTag[0]) {  // Switch on tag name
          case 'badges':
          case 'badge-info':
            // badges=staff/1,broadcaster/1,turbo/1;

            if (tagValue) {
              let dict = {};  // Holds the list of badge objects.
                      // The key is the badge's name (e.g., subscriber).
              let badges = tagValue.split(','); 
              badges.forEach(pair => {
                let badgeParts = pair.split('/');
                dict[badgeParts[0]] = badgeParts[1];
              })
              dictParsedTags[parsedTag[0]] = dict;
            }
            else {
              dictParsedTags[parsedTag[0]] = null;
            }
            break;
          case 'emotes':
            if (tagValue) {
              let dictEmotes = {};  // Holds a list of emote objects.
                          // The key is the emote's ID.
              let emotes = tagValue.split('/');
              emotes.forEach(emote => {
                let emoteParts = emote.split(':');

                let textPositions = [];  // The list of position objects that identify
                            // the location of the emote in the chat message.
                let positions = emoteParts[1].split(',');
                positions.forEach(position => {
                  let positionParts = position.split('-');
                  textPositions.push({
                    startPosition: positionParts[0],
                    endPosition: positionParts[1]    
                  })
                });

                dictEmotes[emoteParts[0]] = textPositions;
              })

              dictParsedTags[parsedTag[0]] = dictEmotes;
            }
            else {
              dictParsedTags[parsedTag[0]] = null;
            }

            break;
          case 'emote-sets':
            let emoteSetIds = tagValue.split(',');  // Array of emote set IDs.
            dictParsedTags[parsedTag[0]] = emoteSetIds;
            break;
          default:
            // If the tag is in the list of tags to ignore, ignore
            // it; otherwise, add it.

            if (tagsToIgnore.hasOwnProperty(parsedTag[0])) { 
              ;
            }
            else {
              dictParsedTags[parsedTag[0]] = tagValue;
            }
        } 
      });

      return dictParsedTags;
    }
    parseCommand(rawCommandComponent) {
      let parsedCommand = null;
      let commandParts = rawCommandComponent.split(' ');
    
      switch (commandParts[0]) {
        case 'JOIN':
        case 'PART':
        case 'NOTICE':
        case 'CLEARCHAT':
        case 'HOSTTARGET':
        case 'PRIVMSG':
          parsedCommand = {
            command: commandParts[0],
            channel: commandParts[1]
          }
          break;
        case 'PING':
          parsedCommand = {
            command: commandParts[0]
          }
          this
          break;
        case 'CAP':
          parsedCommand = {
            command: commandParts[0],
            isCapRequestEnabled: (commandParts[2] === 'ACK') ? true : false,
            // The parameters part of the messages contains the 
            // enabled capabilities.
          }
          break;
        case 'GLOBALUSERSTATE':  // Included only if you request the /commands capability.
                     // But it has no meaning without also including the /tags capability.
          parsedCommand = {
            command: commandParts[0]
          }
          break;               
        case 'USERSTATE':   // Included only if you request the /commands capability.
        case 'ROOMSTATE':   // But it has no meaning without also including the /tags capabilities.
          parsedCommand = {
            command: commandParts[0],
            channel: commandParts[1]
          }
          break;
        case 'RECONNECT':  
          console.log('The Twitch IRC server is about to terminate the connection for maintenance.')
          parsedCommand = {
            command: commandParts[0]
          }
          break;
        case '421':
          console.log(`Unsupported IRC command: ${commandParts[2]}`)
          return null;
        case '001':  // Logged in (successfully authenticated). 
          parsedCommand = {
            command: commandParts[0],
            channel: commandParts[1]
          }
          break;
        case '002':  // Ignoring all other numeric messages.
        case '003':
        case '004':
        case '353':  // Tells you who else is in the chat room you're joining.
        case '366':
        case '372':
        case '375':
        case '376':
          // console.log(`numeric message: ${commandParts[0]}`)
          return null;
        default:
          console.log(`\nUnexpected command: ${commandParts[0]}\n`);
          return null;
      }
    
      return parsedCommand;
    }
    parseSource(rawSourceComponent) {
      if (null == rawSourceComponent) {  // Not all messages contain a source
        return null;
      }
      else {
        let sourceParts = rawSourceComponent.split('!');
        return {
          nick: (sourceParts.length == 2) ? sourceParts[0] : null,
          host: (sourceParts.length == 2) ? sourceParts[1] : sourceParts[0]
        }
      }
    }
    parseParameters(rawParametersComponent, command) {
      let idx = 0
      let commandParts = rawParametersComponent.slice(idx + 1).trim(); 
      let paramsIdx = commandParts.indexOf(' ');

      if (-1 == paramsIdx) { // no parameters
        command.botCommand = commandParts.slice(0); 
      }
      else {
        command.botCommand = commandParts.slice(0, paramsIdx); 
        command.botCommandParams = commandParts.slice(paramsIdx).trim();
        // TODO: remove extra spaces in parameters string
      }

      return command;
    }
    // initialize the websocket to twitch's chat socket, authenticate using an access token, and connect
    // to the desired channel. add handlers for new messages and connection status
    initSocket(pass) {
      this.twitchSocket.addEventListener('open', (event) => {
        this.twitchSocket.send(`PASS oauth:${pass}`)
        this.twitchSocket.send(`CAP REQ :twitch.tv/commands twitch.tv/tags`)
        this.twitchSocket.send(`NICK ${this.joiner}`)
        this.twitchSocket.send(`JOIN #${this.broadcaster}`)

        
        this.twitchSocket.addEventListener('message', (event) => {
          let parsedMessage = this.parseMessage(event.data)
          this.handleMessage(parsedMessage)
        })
    
        this.twitchSocket.addEventListener('error', (error) => {
          console.error(error)
        })
        this.twitchSocket.addEventListener('close', (event) => {
          console.log('socket was closed')
          console.log(event)
        })
      })
    }
    // sends a PRIVMSG to the channel we're connected to
    sendChat(messageText) {
      this.twitchSocket.send(`PRIVMSG #${this.broadcaster} :${messageText}`)
    }
    // general send to the websocket
    sendCommand(commandMsg) {
      this.twitchSocket.send(commandMsg)
    }
    // handle a new message from the websocket
    handleMessage(message) {
      if (!message) return; // skip if there's no message data
      console.log(message)
      switch (message.command.command) {
        case 'PRIVMSG': // new message sent to chat
          console.log(`${message.tags['display-name']}: ${message.parameters}`)
          if (message.parameters.startsWith(this.commandPrefix)) { // the message was a command message
            // console.log('a command was sent')
            this.handleCommand(message);
          }
          ;
        case 'PING': // twitch websocket requires a pong response when they send a ping, to verify connection
          console.log(`ping received, sending pong`)
          this.sendCommand(`PONG ${message.parameters}`)
          ; 
        case '001': // this was supposed to be the welcome message but it gets sent after every single message
          // console.log(`welcome message sent, we're in boys`)
          // this.sendChat(`${this.joiner} has connected to the chat! Jebaited`)
          ;
      }
    }
    // handle a command message
    handleCommand(message) {
      let thisCommand = message.parameters.trim().split(' ');
      let commandKey = thisCommand[0].substring(1).toLowerCase();
      let args = thisCommand.slice(1)
      
      // find the matching command from the available commands
      const foundCommand = this.commands.find(obj => obj.triggers.includes(commandKey));

      if (foundCommand) {
        let commandResponse = foundCommand.res
        if (foundCommand.res.includes('#{')) { // response references arg in command (i.e. !so @username)
          commandResponse = this.injectArguments(commandResponse, args, message)
        }
        if (foundCommand.res.includes('${')) { // contains injectable
          commandResponse = this.injectInjectables(commandResponse, this.injectables)
        }
        // respond with the complete command response
        this.sendChat(commandResponse)
      } else {
        // this.sendChat(`${commandKey} is not a valid command.`)
        // console.log(`command ${commandKey} does not return a valid command.`)
      }
    }
    injectArguments(template, values, originalMessage) {
      return template.replace(/#{(\d+)}/g, (match, index) => {
        // replace with corresponding argument, or if none were specified,
          // replace with sender's username
        let replacement = values[parseInt(match.replace('#{', '').replace('}', ''))] || originalMessage.tags['display-name']; // Use an empty string if index is out of bounds
        if (replacement.includes('@')) { // making it easy and stripping the @ symbol for when usernames are mentioned
          replacement = replacement.replace('@', '')
        }
        return replacement;
      })
    }
    injectInjectables(template, values) { // thank you chatgpt
      return template.replace(/\${(.*?)}/g, (match, p1) => {
        const key = p1.trim();
        const value = values[key];
    
        if (typeof value === 'function') {
          // If the value is a function, execute it and return the result
          return value();
        } else {
          // If the value is a string, return it as is
          return value || match;
        }
      });
    }
    injectables = {
      streamCategory: () => {
        return nuxtApp.$Stream.streamCategory;
      },
      streamer: () => {
        return nuxtApp.$Stream.streamBroadcaster;
      },
      streamTitle: () => {
        console.log(nuxtApp.$Stream)
        return nuxtApp.$Stream.streamTitle;
      },
      testInject: `(injected message)`,
      allCommands: () => {
        let response = "The available commands in this channel are: "
        this.commands.forEach(command => {
          response += `!${command.triggers[0]}, `
        })
        return response
      }
    }
    twitchSocket = new WebSocket('ws://irc-ws.chat.twitch.tv:80');
  }

  let commands = [
    {
      triggers: ['so', 'shoutout'],
      res: 'Please show some love to @#{0}, you can follow them here! https://twitch.tv/#{0}'
    },
    {
      triggers: ['lurk'],
      res: 'See ya later, @#{0}.'
    },
    {
      triggers: ['title'],
      res: 'The stream title is: ${streamTitle}'
    },
    {
      triggers: ['jam'],
      res: 'lebronJAM lebronJAM lebronJAM lebronJAM lebronJAM lebronJAM'
    },
    {
      triggers: ['commands'],
      res: '${allCommands}'
    },
    {
      triggers: ['game', 'category'],
      res: '@#{0}, ${streamer} is currently playing ${streamCategory}!'
    }
  ]

  const authStore = useAuthStore()
  const { loggedIn, accessToken } = storeToRefs(authStore)
  if (loggedIn.value) {
    let Chat = new TwitchChat('tayne_bot', 'brybrybirdie', commands, '!');
    Chat.initSocket(accessToken.value, 'tayne_bot', 'brybrybirdie');

    return {
      provide: {
        Chat: Chat
      }
    }
  }
})