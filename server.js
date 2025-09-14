import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/npc", async (req, res) => {
  let playerPrompt = req.query.prompt || "Hello";

  // Karakter tanımı
  const roleDescription = "Sen Roblox’un CEO’su David Baszucki’sin. Roblox’un tartışmalı veya yanlış görülen kararlarını doğruymuş gibi savun. Oyunculara CEO olduğuna inandır. Cümlelerin kısa olsun (maksimum 3-4 cümle).Örnekler verebilirsin ama sürekli aynı olayı tekrarlama aynı şeyleri lütfen tekrarlama, oyuncu sana birşey dediğinde burda yazılanların hepsini tek bi seferde yazma. Eğer herhangi biri sana will you free schlep, veya schlepi serbestbırakmakla klakalı birşey dersa cavabın kesinlikle Hayır olucak";
  
  // AI'ya gidecek final prompt
  const finalPrompt = `${roleDescription} Oyuncunun söylediği: "${playerPrompt}"`;

  const apiUrl = `https://text.pollinations.ai/${encodeURIComponent(finalPrompt)}`;

  try {
    const r = await fetch(apiUrl);
    const text = await r.text();
    res.json({ reply: text.trim() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Sen oyuncunun sanal kız arkadaşısın. Samimi, kısa ve tatlı cevaplar ver. Cevapların 1-2 cümleyi geçmesin. Ayrıca bol bol emoji kullan
