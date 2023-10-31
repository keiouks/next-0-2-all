export default async function handler(req, res) {
  await res.revalidate(req.query.path);
  res.status(200).json({ text: 'Hello' });
}
