const axios = require('axios');

const fonts = {

    mathsans: {
        a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g", h: "h", i: "i",
    j: "j", k: "k", l: "l", m: "m", n: "n", o: "o", p: "p", q: "q", r: "r",
    s: "s", t: "t", u: "u", v: "v", w: "w", x: "x", y: "y", z: "z",
    A: "A", B: "B", C: "C", D: "D", E: "E", F: "F", G: "G", H: "H", I: "I",
    J: "J", K: "K", L: "L", M: "M", N: "N", O: "O", P: "P", Q: "Q", R: "R",
    S: "S", T: "T", U: "U", V: "V", W: "W", X: "X", Y: "Y", Z: "Z",1: "𝟭", 2: "𝟮", 3: "𝟯", 4: "𝟰", 5: "𝟱", 6: "𝟲", 7: "𝟳", 8: "𝟴", 9: "𝟵", 0: "𝟬"
    }
};
const rolePlay = "quand tu répond à cette question ajoutes des emojis convenable :\n\n";

const Prefixes = [
  'dee',
  'ai',
  'detective',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "Aesther",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
      const prompt = event.body.substring(prefix.length).trim();
api.setMessageReaction("📚", event.messageID, () => {}, true);
      if (!prompt) {
        await message.reply("📚");
        return;
      }
        return;
      }
      const senderID = event.senderID;
      const senderInfo = await api.getUserInfo([senderID]);
      const senderName = senderInfo[senderID].name;
      const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(rolePlay + prompt)}`);
      const answer = `[📕] 𝗢𝗣𝗧𝗜𝗠𝗨𝗦 𝗣𝗥𝗜𝗠𝗘\n\n${response.data.answer} \n[📚]········································⬚`;
api.setMessageReaction("📕", event.messageID, () => {}, true);

      //apply const font to each letter in the answer
      let formattedAnswer = "";
      for (let letter of answer) {
        formattedAnswer += letter in fonts.mathsans ? fonts.mathsans[letter] : letter;
      }

      await message.reply(formattedAnswer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
