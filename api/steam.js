export default async function handler(req, res) {
  const name = req.query.name;

  const search = await fetch(
    `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(name)}&l=english&cc=us`
  );
  const data = await search.json();

  if (!data.items || data.items.length === 0) {
    return res.status(404).json({ error: "Not found" });
  }

  const app = data.items[0];

  res.status(200).json({
    name: app.name,
    img: app.tiny_image,
    appid: app.id,
  });
}
