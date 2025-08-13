import sql from "../configs/db.js";

export const getuserCreation= async (req, res) => {
  try {
    const { userId } = req.auth();
    

    const creations = await sql`
      SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    return res.json({ success: true, creations });
  } catch (err) {
    console.error("Error fetching user creations:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getPublishCreation= async (req, res) => {
  try {

    

    const creations = await sql`
      SELECT * FROM creations WHERE publish =true ORDER BY created_at DESC`;

    return res.json({ success: true, creations });
  } catch (err) {
    console.error("Error fetching user creations:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const togglelike = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    // Get creation
    const [creation] = await sql`
      SELECT * FROM creations WHERE id = ${id}
    `;

    if (!creation) {
      return res.status(404).json({ error: "Creation not found" });
    }

    const currentLikes = creation.likes || []; // likes is text[]
    const userIdString = userId.toString();

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdString)) {
      updatedLikes = currentLikes.filter(user => user !== userIdString);
      message = "Creation unliked";
    } else {
      updatedLikes = [...currentLikes, userIdString];
      message = "Creation liked";
    }

    // Directly pass array to PostgreSQL
    await sql`
      UPDATE creations
      SET likes = ${sql.array(updatedLikes, 'text')}
      WHERE id = ${id}
    `;

    return res.json({ success: true, message });
  } catch (err) {
    console.error("Error toggling like:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
