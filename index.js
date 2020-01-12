const { prefix, token, giphytoken } = require('./config.json');

const discord = require('discord.js');
client = new discord.Client()

var GphApiClient = require('giphy-js-sdk-core')
gifclient = GphApiClient(giphytoken)



client.once('ready', ()=> {
  console.log('Ready!')
})

/*  TODO:
*     Randomize search space
*     Catching errors
*     Split into two ideas: gif player and moderator bot
*     Parse youtube channels and take a collection of something: kind of like a subscription?
*/  

client.on('message', message=>{
  // Works for most things// if result not found->Try something else
  // How do i make tests more rigorous?
  if (message.content.startsWith(`${prefix}gif`)) {
    let args = message.content.split(" ");
    console.log(args);
    var string = "";
    for(i = 1; i < args.length; i++) {
      string = string + " " + args[i];
    }
    console.log (string);
    gifclient.search('gifs', {"q": string})
      .then((response) => {
        var query = Math.floor((Math.random() * 10 + 1));
        var response1 = response.data[query];
        message.channel.send({
          files: [response1.images.fixed_height.url]
        })
      }).catch(() => {
        message.channel.send('Try something else!');
      })

  }
  //ADMIN ONLY
  //
  //
  if(message.member.hasPermission('ADMINISTRATOR')) {
   // KICK && BAN IMPLEMENTATION
   // CLEAN UP
    if(message.content.startsWith(`${prefix}kick`)){
       
        let member = message.mentions.members.first();
        console.log('here')
        member.kick().then((member) => {
         
          gifclient.search('gifs', {"q": "ice"})
            .then((response) => {
              //console.log(response);
              var responseFinal = response.data[0];
              message.channel.send(":wave: " + member.displayName + " has been kicked!", {
                files: [responseFinal.images.fixed_height.url]
              })
            }).catch(() => {
              message.channel.send('Error');
            })
        }) 
      }

    if(message.content.startsWith(`${prefix}ban`)){
      let member = message.mentions.members.first();
      member.ban().then((member)=> {
        message.channel.send(":wave: " + member.displayName + " has been banned!")
      })
    }

   }
})

client.login(token); 