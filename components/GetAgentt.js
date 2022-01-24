"use strict";

const axios = require("axios");

module.exports = {
  metadata: () => ({
    name: "GetAgentt",
    properties: {
      agent: { type: "string", required: true }
    },
    supportedActions: []
  }),

  invoke: (context, done) => {
    const { agent } = conversation.properties();
    const url = `https://app-t.trade.gov.ng/ciara-service/api/agent?agentUsername=${agent}`;
    axios({
      method: "get",
      url,
      auth: {
        username: "ciara",
        password: "!8wuVC!C2p_d324"
      }
    })
      .then((agent) => {
        //let arr = new Array();
        //arr = agents.data;
        let toUser =
          "This is the information I have on the name you gave me.";
        toUser += ` \n\n`;
        agent.data.forEach(agent => {
          toUser += `Name: ${agent.givenName} \n`;
          toUser += `Mail: ${agent.mail} \n`;
          toUser += `\n`;
        });
        context.reply(toUser)
        context.keepTurn(true)
        context.transition()
        done();
      })
      .catch((error) => {
        context.logger().info(error)
        context.reply(`My apologies, I am unable to gather information on the name you supplied. Kindly try again later.`)
        context.keepTurn(true)
        context.transition()
        done();
      });
  }
};
